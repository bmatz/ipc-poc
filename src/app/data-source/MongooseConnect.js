import mongoose from 'mongoose';
import bb from 'bluebird';
import Grid from 'gridfs-stream';

mongoose.Promise = Promise;
mongoose.set('useCreateIndex', true);

const MAX_RETRIES = parseInt(process.env.MONGOOSE_RECONNECT_TRIES, 10) || 30;
const RETRY_DELAY = 1000;

class MongooseConnect {
    constructor(config, logger) {
        this.log = logger || console;
        this.config = config;
        this.hasSuccessfullyConnected = false;
    }

    async start() {
        return this.connect();
    }

    getConnectionString() {
        return (this.config.connectionString.startsWith('mongodb') ? '' : 'mongodb://') + this.config.connectionString;
    }

    async connect() {
        this.log.info(`Connect to MongoDB: "${this.getConnectionString()}" ...`);
        const connection = await this.connectPromise(this.getConnectionString()); // eslint-disable-line
        const noop = () => {};
        console.log(this.config.modelFactory);
        const modelFactory = this.config.modelFactory || noop; // eslint-disable-line
        const schema = await modelFactory(mongoose, connection);

        return {
            mongoose,
            connection,
            schema,
            gridfs: new Grid(connection.db, mongoose.mongo),
        };
    }

    async connectPromise(connectionString) {
        return new Promise((resolve) => {
            this.initialConnectionTimeout = setTimeout(() => {
                if (!this.hasSuccessfullyConnected) {
                    this.log.error('could not connect to mongo db');
                    process.exit(1);
                }
            }, MAX_RETRIES * RETRY_DELAY + 2e3);

            const options = {
                keepAlive: true,
                useNewUrlParser: true,
                useUnifiedTopology: true,
            };

            this.log.info(`Connecting to db: ${connectionString}`);
            const connection = mongoose.createConnection(connectionString, options);
            connection.on('error', async (err) => {
                if (
                    err.message &&
                    (err.message.match(/failed to connect to server .* on first connect/) ||
                        err.message === 'read ECONNRESET')
                ) {
                    this.log.info('Retrying first connect...');
                    await bb.delay(RETRY_DELAY);
                    connection.close();
                    connection.openUri(connectionString).catch(() => {});
                } else if (err.message && err.message.match(/Ran out of retries trying to reconnect to/)) {
                    this.log.error(err);
                    process.exit(2);
                } else if (err.message && err.message.match(/connection [0-9]+ to .* closed/)) {
                    // when MongoDB finally starts the last connection gets closed so we have to make a new one
                    await bb.delay(2e3);
                    connection.openUri(connectionString).catch(() => {});
                } else {
                    this.log.error(
                        {
                            err,
                        },
                        'Connection error to MongoDB.'
                    );
                }
            });

            connection.on('open', () => {
                this.log.info(`Connection to MongoDB: "${connectionString} established.`);
                this.hasSuccessfullyConnected = true;

                resolve(connection);
            });

            connection.on('reconnect', () => {
                clearTimeout(this.disconnectedTimeout);
                this.log.warn('Mongodb reconnect');
            });
            // connection.on('timeout', () => this.log.warn('Mongodb timeout'));
            // connection.on('close', () => this.log.info('Mongodb close'));
            connection.on('disconnected', () => {
                if (this.shutdown) {
                    clearTimeout(this.initialConnectionTimeout);
                    clearTimeout(this.disconnectedTimeout);
                    return;
                }
                this.log.info('Mongodb disconnected');
                if (this.hasSuccessfullyConnected) {
                    this.disconnectedTimeout = setTimeout(() => {
                        this.log.error('disconnection timeout expired');
                        process.exit(3);
                    }, MAX_RETRIES * RETRY_DELAY + 2e3);
                }
            });
        });
    }
}

export default MongooseConnect;

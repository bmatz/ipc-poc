import pino from 'pino';

const logger = pino({name: 'Captain', level: 'debug'});

export default logger;

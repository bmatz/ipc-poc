const nasDomain = 'tassadar';
const rootNasFolder = 'store';

const windowsDrive = 's';

const pathToCaptain = 'AppData\\Captain\\';

const sanitizeWithPrefix = (prefix) => (path) =>
    `${prefix}\\${path
        .split('\\')
        .filter((i) => !!i && !['tassadar', 'store'].includes(i.toLowerCase()))
        .join('\\')}`;

const sanitizeWithPrefixIgnoringPath = (prefix) => (path) => {
    const fileName = path.split('\\').pop();
    // console.log(fileName);
    const folder = path.toLowerCase().indexOf('thumbs') >= 0 ? 'thumbs' : 'assets';
    const result = `${prefix}${pathToCaptain}${folder}\\${fileName}`;
    // console.log(result);
    return result;
};

export const toDrive = sanitizeWithPrefixIgnoringPath(`\\\\${nasDomain}\\${rootNasFolder}\\`);
export const toNas = sanitizeWithPrefix(`\\\\${nasDomain}\\${rootNasFolder}\\`);

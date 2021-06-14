/* eslint-disable import/no-namespace */

import * as ReactIconsFA from 'react-icons/fa';
import * as ReactIconsMD from 'react-icons/md';

const faMap = {};
const mdMap = {};

Object.keys(ReactIconsFA).forEach((key) => {
    faMap[key.toLowerCase()] = ReactIconsFA[key];
});
Object.keys(ReactIconsMD).forEach((key) => {
    mdMap[key.toLowerCase()] = ReactIconsMD[key];
});

const resolveIcon = (name, regular) => {
    // return ({ ReactIconsFA.FaAlignJustify });
    if (!name) {
        // TODO: return default missing icon
        // return name;
        return faMap.faregquestioncircle;
    }
    if (typeof name === 'function') return name;
    if (name.startsWith('Fa') && ReactIconsFA[name]) {
        return ReactIconsFA[name];
    }
    if (name.startsWith('Md') && ReactIconsMD[name]) {
        return ReactIconsMD[name];
    }
    const lowerName = name.toLowerCase();
    const faName = `fa${regular ? 'reg' : ''}${lowerName.replace(/-/g, '')}`;
    const mdName = `md${lowerName.replace(/-/g, '')}`;
    const icon = faMap[faName] || mdMap[mdName] || faMap.faregquestioncircle;
    console.info(icon);
    // return { icon };
    return icon;
};

export default resolveIcon;

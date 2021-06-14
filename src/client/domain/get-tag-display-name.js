const toUpperCase = (tag) => {
    const parts = tag.replace(/series/g, 'Serie').split('_');
    return parts
        .map((part) => {
            const firstCharacter = part.slice(0, 1).toUpperCase();
            return `${firstCharacter}${part.slice(1)}`;
        })
        .join(' ');
};
const getDisplayName = ({name, displayName}) => {
    if (name !== displayName) return displayName;
    return toUpperCase(displayName);
};

export {getDisplayName, toUpperCase};

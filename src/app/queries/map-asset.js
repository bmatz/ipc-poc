import tagToUpperCase from '../events/tagToUpperCase';

export default function mapAsset(asset) {
    return {
        ...asset,
        thumbSource: `${asset.path}\\thumbs\\${asset.itemId}.jpg`,
        altTags: asset.tags ? asset.tags.map(tagToUpperCase).join(', ') : '',
    };
}

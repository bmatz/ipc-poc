import whereSessionAsset from '../queries/where-session-asset';
import {
    favoriteAsset,
    unfavoriteAsset,
    assetPlayed,
    deleteAsset,
    restoreAsset,
    markAssetAsDuplicate,
    unmarkAssetAsDuplicate,
    hideAsset,
    revealAsset,
    setNoAudio,
    setHasAudio,
} from './asset-events';

const sessionAssetEvents = {
    whereSessionAsset: async (arg, {db}) => whereSessionAsset(db, {...(arg || {}), status: 'finished'}),
    getSessionAsset: async (arg, {schema: {SessionAsset}}) => {
        const result = await SessionAsset.findOne({resId: arg});
        if (!result) {
            throw new Error(`SessionAsset with resId ${arg} not found`);
        }
        return result;
    },

    favoriteSessionAsset: favoriteAsset,
    unfavoriteSessionAsset: unfavoriteAsset,

    deleteSessionAsset: deleteAsset,
    restoreSessionAsset: restoreAsset,

    markSessionAssetAsDuplicate: markAssetAsDuplicate,
    unmarkSessionAssetAsDuplicate: unmarkAssetAsDuplicate,

    hideSessionAsset: hideAsset,
    revealSessionAsset: revealAsset,

    setNoAudio,
    setHasAudio,

    sessionAssetPlayed: assetPlayed,
};

export default sessionAssetEvents;

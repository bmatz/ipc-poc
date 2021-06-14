import createIPCEventHandler from './create-ipc-event-handler.js';

// Asset
export const whereAsset = createIPCEventHandler('whereAsset');
export const getAsset = createIPCEventHandler('getAsset');
export const assetPlayed = createIPCEventHandler('assetPlayed');

export const favoriteAsset = createIPCEventHandler('favoriteAsset');
export const unfavoriteAsset = createIPCEventHandler('unfavoriteAsset');
export const deleteAsset = createIPCEventHandler('deleteAsset');
export const restoreAsset = createIPCEventHandler('restoreAsset');
export const markAssetAsDuplicate = createIPCEventHandler('markAssetAsDuplicate');
export const unmarkAssetAsDuplicate = createIPCEventHandler('unmarkAssetAsDuplicate');
export const hideAsset = createIPCEventHandler('hideAsset');
export const revealAsset = createIPCEventHandler('revealAsset');
export const setNoAudio = createIPCEventHandler('setNoAudio');
export const setHasAudio = createIPCEventHandler('setHasAudio');

export const playExternal = createIPCEventHandler('playExternal');

export const updateAssetTags = createIPCEventHandler('updateAssetTags');

// SessionAsset
export const whereSessionAsset = createIPCEventHandler('whereSessionAsset');
export const getSessionAsset = createIPCEventHandler('getSessionAsset');
export const favoriteSessionAsset = createIPCEventHandler('favoriteSessionAsset');
export const unfavoriteSessionAsset = createIPCEventHandler('unfavoriteSessionAsset');
export const sessionAssetPlayed = createIPCEventHandler('sessionAssetPlayed');

export const deleteSessionAsset = createIPCEventHandler('deleteSessionAsset');
export const restoreSessionAsset = createIPCEventHandler('restoreSessionAsset');
export const markSessionAssetAsDuplicate = createIPCEventHandler('markSessionAssetAsDuplicate');
export const unmarkSessionAssetAsDuplicate = createIPCEventHandler('unmarkSessionAssetAsDuplicate');
export const hideSessionAsset = createIPCEventHandler('hideSessionAsset');
export const revealSessionAsset = createIPCEventHandler('revealSessionAsset');

// Session
export const getCurrentSession = createIPCEventHandler('getCurrentSession');
export const getSession = createIPCEventHandler('getSession');
export const whereSession = createIPCEventHandler('whereSession');
export const getLatestSessions = createIPCEventHandler('getLatestSessions');

// Topic
export const whereTopic = createIPCEventHandler('whereTopic');
export const getTopic = createIPCEventHandler('getTopic');
export const createTopic = createIPCEventHandler('createTopic');
export const updateTopic = createIPCEventHandler('updateTopic');
export const activateTopic = createIPCEventHandler('activateTopic');
export const deactivateTopic = createIPCEventHandler('deactivateTopic');

export const aggregateTags = createIPCEventHandler('aggregateTags');

// File
export const readFile = createIPCEventHandler('readFile');

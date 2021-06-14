import {spawn} from 'child_process';
import {uniq, sortWith, ascend, identity, pipe, difference, intersection} from 'ramda';
import log from '../logger';
import {toDrive} from './sanitize-path';
import queryWhereAsset from '../queries/where-asset';
import findOne from '../queries/find-one';
import tagToUpperCase from './tagToUpperCase';

const setFlag = (flagName, value) => async (arg, {db, schema: {Asset, SessionAsset}}) => {
    const query = {assetId: arg};
    const asset = await Asset.findOne(query);
    if (!asset) {
        throw new Error(`Asset with assetId ${arg} not found`);
    }
    const update = {[flagName]: value};
    log.debug({updating: update, query});
    await Asset.findOneAndUpdate(query, update);
    await SessionAsset.updateMany(query, update);

    return findOne('asset', {db, query});
};

// ASSETS
export const whereAsset = async (query = {}, {db}) => queryWhereAsset({db, query});

export const getAsset = async (arg, {schema: {Asset}}) => {
    const result = await Asset.findOne({resId: arg});
    if (!result) {
        throw new Error(`Asset with resId ${arg} not found`);
    }
    return result;
};

export const assetPlayed = async (arg, {db, schema: {Asset, SessionAsset}}) => {
    const query = {itemId: arg};
    const asset = await Asset.findOne(query);
    if (!asset) {
        throw new Error(`Asset with itemId ${arg} not found`);
    }
    await Asset.findOneAndUpdate(query, {played: true});
    await SessionAsset.updateMany(query, {played: true});

    return findOne('asset', {db, query});
};

export const favoriteAsset = setFlag('favorite', true);
export const unfavoriteAsset = setFlag('favorite', false);

export const deleteAsset = setFlag('deleted', true);
export const restoreAsset = setFlag('deleted', false);

export const markAssetAsDuplicate = setFlag('duplicate', true);
export const unmarkAssetAsDuplicate = setFlag('duplicate', false);

export const hideAsset = setFlag('hidden', true);
export const revealAsset = setFlag('hidden', false);

export const setNoAudio = setFlag('hasAudio', false);
export const setHasAudio = setFlag('hasAudio', true);

export const updateAssetTags = async (arg, {db, schema: {Asset}}) => {
    const query = {itemId: arg.assetId};
    const asset = await Asset.findOne(query);
    if (!asset) {
        throw new Error(`Asset with id ${arg} not found`);
    }

    let newTags = asset.tags;
    if (intersection(asset.tags, arg.tags).length > 0) {
        newTags = difference(asset.tags, arg.tags);
    } else {
        newTags = [...asset.tags, ...arg.tags];
    }

    let tagsToSave = pipe(uniq, sortWith([ascend(identity)]))(newTags);

    const tagsWithBrackets = tagsToSave.filter((t) => t.startsWith('['));
    const tagsWithoutBrackets = difference(tagsToSave, tagsWithBrackets);
    tagsToSave = [...tagsWithBrackets, ...tagsWithoutBrackets];
    await Asset.findOneAndUpdate(query, {tags: tagsToSave});

    const resultAsset = await findOne('asset', {db, query});
    return {
        ...resultAsset,
        thumbSource: `${asset.path}\\thumbs\\${asset.itemId}.jpg`,
        altTags: asset.tags ? asset.tags.map(tagToUpperCase).join(', ') : '',
    };
};

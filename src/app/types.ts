// const mongoose = require('./types/mongoose');
export type Source = {
    mode: string;
    active: boolean;
    sourceId?: string;
    autoFetchId: boolean;
    sourcename: string;
    tagname: string;
};

// export class SourceModel extends Source { }
// export class SourceSchema extends

export type Topic = {
    resId: string;
    name: string;
    displayName: string;
    update: string;
    created: string;
    favorite: boolean;
    active: boolean;
    readOnly: boolean;
    sources: Array<Source>;
};

export type ErrorDescription = {
    process: string;
    exception: string;
    stacktrace: string;
};

export type TopicError = {
    tag: string;
    exceptions: Array<ErrorDescription>;
};

export type Session = {
    resId: string;
    topicBaseTags: Array<string>;
    topics: Array<Topic>;
    start: string;
    end: string;
    state: string;
    assetsCount: number;
    assetsDone: number;
    uniqueAssetsDone: number;
    failedTopics: Array<TopicError>;
};

export type AssetBase = {
    resId: string;
    assetId: string;
    sortableAssetId: number;
    sourceAssetId: string;
    sortableSourceAssetId: number;
    updated: string;
    created: string;
    uploaded: string;
    tags: [string];
    path: string;
    type: string;
    originalType: string;
    resolution: string;
    bytes: number;
    hasAudio: boolean;
    duration: string;
    seconds: number;
    width: number;
    height: number;
    md5: string;
    originalmd5: string;
    filename: string;
    filesize: string;
    assetOriginURL: string;
    sourceAssetURL: string;
    sourcePreviewURL: string;
    sourceThumbURL: string;
    sourcePreviewVideoURL: string;
    sourcename: string;
};

export type Asset = AssetBase & {
    listed: boolean;
    favorite: boolean;
    hidden: boolean;
    duplicate: boolean;
    deleted: boolean;
    played: boolean;
};

export type SessionAsset = AssetBase & {
    sessionResId: string;
    exceptions: Array<ErrorDescription>;
    tagname: string;
    state: string;
};

export type SessionTopic = {
    resId: string;
    name: string;
    sessionResId: string;
    topicResId: string;
    updated: Date;
    created: Date;
    exceptions: Array<ErrorDescription>;
    sources: Array<Source>;
    state: string;
    failedAssets: Array<string>;
    assetsCount: number;
    assetsDone: number;
    uniqueAssetsDone: number;
};

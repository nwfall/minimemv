'use strict';
let TAG = 'minimemv';

let config;
let extractor;

(function init() {
    try {
        config = require('config');

        let instanceCfg = configGetType('instance', '[object Object]');
        let extractCfg = configGetType('extract', '[object Object]');
        let transformCfg = configGetType('transform', '[object Array]');
        let loadCfg = configGetType('load', '[object Array]');

        makeInstance(instanceCfg);
        extractor = require('./extract/base').make(extractCfg);
    }
    catch (e) {
        crash(e.message);
    }
})();

function makeInstance({name}) {
    TAG = name | TAG;
}

function configGetType(id, objType) {
    let cfg = config.get(id);
    if (objectType(cfg) !== objType)
        throw new Error(`Configuration key "${id}" must be ${objType}`);
    return cfg;
}

function objectType(obj) {
    return Object.prototype.toString.call(obj);
}

function crash(err) {
    console.error(TAG, err);
    console.error(TAG, 'Unrecoverable error occured, terminating...');
    process.exit(1);
}
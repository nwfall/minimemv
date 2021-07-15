'use strict';
let TAG = 'minimemv';

let config;
let instanceCfg, extractCfg, transformCfg, loadCfg;
loadConfig();

if (instanceCfg.name) TAG = instanceCfg.name;
console.log(TAG);
function loadConfig() {
    try {
        config = require('config');

        instanceCfg = configGetType('instance', '[object Object]');
        extractCfg = configGetType('extract', '[object Object]');
        transformCfg = configGetType('transform', '[object Array]');
        loadCfg = configGetType('load', '[object Array]');
    }
    catch (e) {
        crash(e.message);
    }
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
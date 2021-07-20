'use strict';
let TAG = 'minimemv';

let config;
let extractor;
let transformers = new Array();
let loaders = new Array();

(function init() {
    try {
        config = require('config');

        let instanceCfg = configGetType('instance', '[object Object]');
        let extractCfg = configGetType('extract', '[object Object]');
        let transformCfg = configGetType('transform', '[object Array]');
        let loadCfg = configGetType('load', '[object Array]');

        makeInstance(instanceCfg);
        
        extractor = require('./extract/base').make(extractCfg);
        extractor.on('message', onMessage);
        extractor.on('error', crash);

        for (let cfg of transformCfg)
            transformers.push(require('./transform/base').make(cfg));

        for (let cfg of loadCfg)
            loaders.push(require('./load/base').make(cfg));
    }
    catch (error) {
        throw error;
        crash(error.message);
    }
})();

function onMessage(envelope, cb) {
    console.log('wow, emitter emitted a message', envelope);
    
    let p = Promise.resolve(envelope);

    for (let transformer of transformers)
        p.then(transformer.process(envelope));

    for (let loader of loaders)
        p.then(loader.process(envelope));

    p.then(() => cb());
    p.catch((err) => cb(err));
}

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
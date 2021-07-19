'use strict';
const EventEmitter = require('events');
const TAG = __filename;

class ExtractBase extends EventEmitter {

    static make(config) {
        console.info(TAG, 'making new extractor of type', config.type);
        let Class = require(`./${config.type}`);
        return new Class(config.config);
    }

    constructor (config) {
        super ();
        
    }
}

module.exports = ExtractBase;
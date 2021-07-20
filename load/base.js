'use strict';
const TAG = __filename;

class LoadBase {

    static make(config) {
        console.info(TAG, 'making new loader of type', config.type);
        let Class = require(`./${config.type}`);
        return new Class(config.config);
    }

    constructor (config) {
        
        
    }
}

module.exports = LoadBase;
'use strict';
const TAG = __filename;

class TransformBase {

    static make(config) {
        console.info(TAG, 'making new transformer of type', config.type);
        let Class = require(`./${config.type}`);
        return new Class(config.config);
    }

    constructor (config) {
    
        
    }
}

module.exports = TransformBase;
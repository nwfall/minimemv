'use strict';
const LoadBase = require('./base');

class DebugExtract extends LoadBase {

    constructor (config) {
        super();
        this.tag = config.tag;
    }

    process(envelope) {
        console.log(`loader ${this.tag} loads`, envelope.message);
        return Promise.resolve();
    }

}

module.exports = DebugExtract;
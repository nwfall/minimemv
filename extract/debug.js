'use strict';
const ExtractBase = require('./base');

class DebugExtract extends ExtractBase {

    constructor ({envelopes}) {
        super();
        
        for (let envelope of envelopes)
            this.push({message: envelope.message, properties: envelope.properties});

        this.enqueue();
    }

}

module.exports = DebugExtract;
'use strict';
const TransformBase = require('./base');

class DebugTransform extends TransformBase {

    constructor () {
        super();
    }

    process(envelope) {
        let e = this.transform(envelope);
        envelope.message = e.message;
        return Promise.resolve();
    }

    transform(envelope) {
        return {
            message: 'transformed ' + envelope.message,
            properties: envelope.properties
        };
    }


}

module.exports = DebugTransform;
'use strict';
const EventEmitter = require('events');
const TAG = __filename;

class ExtractBase extends EventEmitter {

    static make(config) {
        console.info(TAG, 'making new extractor of type', config.type);
        let Class = require(`./${config.type}`);
        return new Class(config.config);
    }

    #messages = new Array();

    constructor () {
        super ();
    }

    push(envelope) {
        this.#messages.push(envelope);
    }
    
    enqueue() {
        let env = this.#messages.shift();
        if (env) setImmediate(this.emitMessage.bind(this, env));
        else this.emit('end');
    }

    emitMessage(envelope) {
        let that = this;
        this.emit('message', envelope, (err) => {
            if(err) return that.emitError(err);
            that.enqueue();
        })
    }

    emitError(err) {
        this.emit('error', err);
    }
}

module.exports = ExtractBase;
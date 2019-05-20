"use strict";
const encoders_1 = require('./encoders');
class Options {
    constructor(input, args) {
        this.input = input;
        if (typeof args.encoding === 'undefined') {
            throw new Error(`Please pass a valid encoder option: ${Object.keys(encoders_1.encoders).join(', ')}`);
        }
        this.decode = args.decode;
        this.encoding = args.encoding;
        this.encoder = encoders_1.encoders[this.encoding];
    }
}
exports.Options = Options;
//# sourceMappingURL=Options.js.map
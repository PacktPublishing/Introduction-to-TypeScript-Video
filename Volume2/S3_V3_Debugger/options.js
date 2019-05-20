"use strict";
const encoders_1 = require("./encoders");
function throwIfNotIn(values, value) {
    if (values.indexOf(value) === -1) {
        throw new Error(`${value} is not a valid value. Valid: ${values.join(', ')}`);
    }
}
function throwIfUndefined(value, message) {
    if (typeof value === 'undefined') {
        throw new Error(message);
    }
}
const encodingChoices = Object.keys(encoders_1.encoders).join(', ');
class Options {
    constructor(input, args) {
        this.input = input;
        throwIfUndefined(input, `Please pass an input string to encode`);
        throwIfUndefined(args.encoding, `Please pass a valid encoder option: ${encodingChoices}`);
        throwIfUndefined(args.decode, `Please pass a valid decode option: true or false`);
        throwIfNotIn(Object.keys(encoders_1.encoders), args.encoding);
        this.decode = args.decode;
        this.encoding = args.encoding;
        this.encoder = encoders_1.encoders[this.encoding];
    }
}
exports.Options = Options;
//# sourceMappingURL=Options.js.map
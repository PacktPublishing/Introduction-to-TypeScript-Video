"use strict";
const encoders_1 = require("./encoders");
function exitIfNotIn(values, value) {
    if (values.indexOf(value) === -1) {
        console.error(`${value} is not a valid value. Valid: ${values.join(', ')}`);
        process.exit(1);
    }
}
function exitIfUndefined(value, message) {
    if (typeof value === 'undefined') {
        console.error(message);
        process.exit(1);
    }
}
const encodingChoices = Object.keys(encoders_1.encoders).join(', ');
class Options {
    constructor(input, args) {
        this.input = input;
        exitIfUndefined(input, `Please pass an input string to encode`);
        exitIfUndefined(args.encoding, `Please pass a valid encoder option: ${encodingChoices}`);
        exitIfUndefined(args.decode, `Please pass a valid decode option: true or false`);
        exitIfNotIn(Object.keys(encoders_1.encoders), args.encoding);
        this.decode = args.decode;
        this.encoding = args.encoding;
        this.encoder = encoders_1.encoders[this.encoding];
    }
}
exports.Options = Options;
//# sourceMappingURL=Options.js.map
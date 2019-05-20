"use strict";
const minimist = require('minimist');
const encoders_1 = require('./encoders');
const Options_1 = require('./Options');
/**
 * Creates a strongly-typed intersection between a given type
 * and the minimist ParsedArgs type.
 */
function minimistAs(args, opts) {
    return minimist(args, opts);
}
function fromArgv(argv) {
    var parsedArgs = minimistAs(argv, {
        boolean: 'decode',
        alias: { encoding: 'e', decode: 'd' },
        default: { encoding: encoders_1.DEFAULT_ENCODER }
    });
    return new Options_1.Options(parsedArgs._.join(' '), parsedArgs);
}
exports.fromArgv = fromArgv;
//# sourceMappingURL=OptionsParser.js.map
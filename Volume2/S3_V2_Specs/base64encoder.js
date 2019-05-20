"use strict";
exports.base64encoder = {
    encode: (value) => {
        return new Buffer(value).toString('base64');
    },
    decode: (value) => {
        return new Buffer(value, 'base64').toString();
    }
};
//# sourceMappingURL=base64encoder.js.map
"use strict";
exports.urlencoder = {
    encode: (value) => {
        return encodeURI(value);
    },
    decode: (value) => {
        return decodeURI(value);
    }
};
//# sourceMappingURL=urlencoder.js.map
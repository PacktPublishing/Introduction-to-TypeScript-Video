"use strict";
const base64encoder_1 = require("./base64encoder");
const urlencoder_1 = require("./urlencoder");
const ENCODER_B64 = 'base64';
const ENCODER_URL = 'url';
/**
 * Default encoder type
 */
exports.DEFAULT_ENCODER = ENCODER_B64;
/**
 * Available encoders
 */
exports.encoders = {
    [ENCODER_B64]: base64encoder_1.base64encoder,
    [ENCODER_URL]: urlencoder_1.urlencoder
};
//# sourceMappingURL=encoders.js.map
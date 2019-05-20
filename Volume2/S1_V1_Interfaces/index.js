"use strict";
const base64encoder_1 = require('./base64encoder');
// store available encoders
var encoders = {
    base64: base64encoder_1.base64encode
};
// use base64 by default
var encoder = encoders.base64;
var input = "Hello World";
var output = "SGVsbG8gV29ybGQ=";
console.log("INPUT: ", input);
console.log("OUTPUT:", encoder(input));
console.log("EXPECT:", output);
//# sourceMappingURL=index.js.map
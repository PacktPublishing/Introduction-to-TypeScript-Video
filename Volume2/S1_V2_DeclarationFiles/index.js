"use strict";
const base64encoder_1 = require("./base64encoder");
var input = "Hello World 🐶";
var output = "SGVsbG8gV29ybGQg8J+Qtg==";
console.log("INPUT: ", input);
console.log("OUTPUT:", base64encoder_1.base64encode(input));
console.log("EXPECT:", output);
//# sourceMappingURL=index.js.map
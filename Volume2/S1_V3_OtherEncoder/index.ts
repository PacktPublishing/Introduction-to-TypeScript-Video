import { base64encoder } from './base64encoder';
import { urlencoder } from './urlencoder';

// store available encoders
var encoders = {
    base64: base64encoder,
    url: urlencoder
};

var input = "Hello World 🐶";
var b64Output = "SGVsbG8gV29ybGQg8J+Qtg==";
var urlOutput = "Hello%20World%20%F0%9F%90%B6";

console.log("INPUT: ", input);

console.log("base64 OUTPUT:", encoders.base64.encode(input));
console.log("base64 EXPECT:", b64Output);

console.log("url OUTPUT:", encoders.url.encode(input));
console.log("url EXPECT:", urlOutput);
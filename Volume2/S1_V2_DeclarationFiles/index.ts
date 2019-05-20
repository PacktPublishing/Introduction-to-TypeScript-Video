import { base64encode } from './base64encoder';

var input = "Hello World 🐶";
var output = "SGVsbG8gV29ybGQg8J+Qtg==";

console.log("INPUT: ", input);
console.log("OUTPUT:", base64encode(input));
console.log("EXPECT:", output);
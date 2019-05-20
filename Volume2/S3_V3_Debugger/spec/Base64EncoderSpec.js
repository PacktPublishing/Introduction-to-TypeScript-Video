"use strict";
const base64encoder_1 = require("../base64encoder");
describe('Base64 encoder', () => {
    it('is defined', () => expect(base64encoder_1.base64encoder).toBeDefined());
    it('can encode a simple string', () => {
        expect(base64encoder_1.base64encoder.encode('Hello World')).toBe('SGVsbG8gV29ybGQ=');
    });
    it('can encode a Unicode string', () => {
        expect(base64encoder_1.base64encoder.encode('Hello World 🐶')).toBe('SGVsbG8gV29ybGQg8J+Qtg==');
    });
    it('can decode a simple string', () => {
        expect(base64encoder_1.base64encoder.decode('SGVsbG8gV29ybGQ=')).toBe('Hello World');
    });
    it('can decode a Unicode string', () => {
        expect(base64encoder_1.base64encoder.decode('SGVsbG8gV29ybGQg8J+Qtg==')).toBe('Hello World 🐶');
    });
});
//# sourceMappingURL=Base64EncoderSpec.js.map
"use strict";
const urlencoder_1 = require("../urlencoder");
describe('Url Encoder', () => {
    it('is defined', () => expect(urlencoder_1.urlencoder).toBeDefined());
    it('can encode a simple string', () => {
        expect(urlencoder_1.urlencoder.encode('Hello World')).toBe('Hello%20World');
    });
    it('can encode a Unicode string', () => {
        expect(urlencoder_1.urlencoder.encode('Hello World 🐶')).toBe('Hello%20World%20%F0%9F%90%B6');
    });
    it('can decode a simple string', () => {
        expect(urlencoder_1.urlencoder.decode('Hello%20World')).toBe('Hello World');
    });
    it('can decode a Unicode string', () => {
        expect(urlencoder_1.urlencoder.decode('Hello%20World%20%F0%9F%90%B6')).toBe('Hello World 🐶');
    });
});
//# sourceMappingURL=UrlEncoderSpec.js.map
import { urlencoder } from '../urlencoder';

describe('Url Encoder', () => {

    it('is defined', () => expect(urlencoder).toBeDefined());

    it('can encode a simple string', () => {
        expect(urlencoder.encode('Hello World')).toBe('Hello%20World');
    })

    it('can encode a Unicode string', () => {
        expect(urlencoder.encode('Hello World 🐶')).toBe('Hello%20World%20%F0%9F%90%B6');
    })

    it('can decode a simple string', () => {
        expect(urlencoder.decode('Hello%20World')).toBe('Hello World');
    })

    it('can decode a Unicode string', () => {
        expect(urlencoder.decode('Hello%20World%20%F0%9F%90%B6')).toBe('Hello World 🐶');
    })
})
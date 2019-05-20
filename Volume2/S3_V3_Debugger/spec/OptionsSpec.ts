require('source-map-support').install();

import { Options } from '../Options';
import { DEFAULT_ENCODER, encoders } from '../encoders';

const TEST_INPUT = 'input';

describe('Options', () => {

    it('is defined', () => {
        expect(Options).toBeDefined();
    })

    it('should require input', () => {
        expect(() => new Options(undefined, undefined))
            .toThrowError('Please pass an input string to encode')
    })

    it('should require encoding argument', () => {
        expect(() => new Options(TEST_INPUT, { encoding: undefined, decode: undefined }))
            .toThrowError(/Please pass a valid encoder option/);
    })

    it('should require decode argument', () => {
        expect(() => new Options(TEST_INPUT, { encoding: DEFAULT_ENCODER, decode: undefined }))
            .toThrowError('Please pass a valid decode option: true or false');
    })

    it('should require valid encoding', () => {
        expect(() => new Options(TEST_INPUT, { encoding: 'foo', decode: false }))
            .toThrowError(/foo is not a valid value/);
    })

    it('should expose input', () => {
        expect(new Options(TEST_INPUT, { encoding: DEFAULT_ENCODER, decode: false }).input).toBe(TEST_INPUT);
    })

    it('should expose encoding', () => {
        expect(new Options(TEST_INPUT, { encoding: DEFAULT_ENCODER, decode: false }).encoding).toBe(DEFAULT_ENCODER);
    })

    it('should expose decode', () => {
        expect(new Options(TEST_INPUT, { encoding: DEFAULT_ENCODER, decode: false }).decode).toBe(false);
        expect(new Options(TEST_INPUT, { encoding: DEFAULT_ENCODER, decode: true }).decode).toBe(true);
    })

    for (var encoding in encoders) {
        it(`should use appropriate encoder for ${encoding}`, () => {
            var o = new Options(TEST_INPUT, { encoding: encoding, decode: false });
            expect(o.encoding).toBe(encoding);
            expect(o.encoder).toBe(encoders[encoding]);
        })
    }
})
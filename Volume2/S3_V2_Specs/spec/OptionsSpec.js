"use strict";
const Options_1 = require("../Options");
const encoders_1 = require("../encoders");
const TEST_INPUT = 'input';
describe('Options', () => {
    it('is defined', () => {
        expect(Options_1.Options).toBeDefined();
    });
    it('should require input', () => {
        expect(() => new Options_1.Options(undefined, undefined))
            .toThrowError('Please pass an input string to encode');
    });
    it('should require encoding argument', () => {
        expect(() => new Options_1.Options(TEST_INPUT, { encoding: undefined, decode: undefined }))
            .toThrowError(/Please pass a valid encoder option/);
    });
    it('should require decode argument', () => {
        expect(() => new Options_1.Options(TEST_INPUT, { encoding: encoders_1.DEFAULT_ENCODER, decode: undefined }))
            .toThrowError('Please pass a valid decode option: true or false');
    });
    it('should require valid encoding', () => {
        expect(() => new Options_1.Options(TEST_INPUT, { encoding: 'foo', decode: false }))
            .toThrowError(/foo is not a valid value/);
    });
    it('should expose input', () => {
        expect(new Options_1.Options(TEST_INPUT, { encoding: encoders_1.DEFAULT_ENCODER, decode: false }).input).toBe(TEST_INPUT);
    });
    it('should expose encoding', () => {
        expect(new Options_1.Options(TEST_INPUT, { encoding: encoders_1.DEFAULT_ENCODER, decode: false }).encoding).toBe(encoders_1.DEFAULT_ENCODER);
    });
    it('should expose decode', () => {
        expect(new Options_1.Options(TEST_INPUT, { encoding: encoders_1.DEFAULT_ENCODER, decode: false }).decode).toBe(false);
        expect(new Options_1.Options(TEST_INPUT, { encoding: encoders_1.DEFAULT_ENCODER, decode: true }).decode).toBe(true);
    });
    for (var encoding in encoders_1.encoders) {
        it(`should use appropriate encoder for ${encoding}`, () => {
            var o = new Options_1.Options(TEST_INPUT, { encoding: encoding, decode: false });
            expect(o.encoding).toBe(encoding);
            expect(o.encoder).toBe(encoders_1.encoders[encoding]);
        });
    }
});
//# sourceMappingURL=OptionsSpec.js.map
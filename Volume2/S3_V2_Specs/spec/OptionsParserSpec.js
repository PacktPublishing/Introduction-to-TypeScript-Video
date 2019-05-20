"use strict";
const OptionsParser = require("../OptionsParser");
const encoders_1 = require("../encoders");
const TEST_INPUT = 'Sufficiently complicated phrase!';
describe('OptionsParser', () => {
    it('is defined', () => {
        expect(OptionsParser).toBeDefined();
    });
    it('can pass input to Options', () => {
        expect(OptionsParser.fromArgv([TEST_INPUT]).input).toBe(TEST_INPUT);
    });
    it('defaults decode option to false', () => {
        expect(OptionsParser.fromArgv([TEST_INPUT]).decode).toBe(false);
    });
    it('defaults to correct encoding type', () => {
        expect(OptionsParser.fromArgv([TEST_INPUT]).encoding).toBe(encoders_1.DEFAULT_ENCODER);
    });
    it('can pass a decode boolean to Options', () => {
        expect(OptionsParser.fromArgv([TEST_INPUT, '-d']).decode).toBe(true);
        expect(OptionsParser.fromArgv([TEST_INPUT, '--decode']).decode).toBe(true);
    });
    // check setting each encoder type
    for (var encoding in encoders_1.encoders) {
        it(`can set ${encoding} encoding`, () => {
            expect(OptionsParser.fromArgv([TEST_INPUT, '-e', encoding]).encoding).toBe(encoding);
            expect(OptionsParser.fromArgv([TEST_INPUT, '--encoding', encoding]).encoding).toBe(encoding);
        });
    }
});
//# sourceMappingURL=OptionsParserSpec.js.map
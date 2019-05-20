interface PunycodeStatic {

    /**
     * Converts a Punycode string of ASCII symbols to a string of Unicode symbols.
     */
    decode(value: string): string;

    /**
     * Converts a string of Unicode symbols to a Punycode string of ASCII symbols.
     */
    encode(value: string): string;

    /**
     * Converts a Punycode string representing a domain name or an email address to Unicode. 
     * Only the Punycoded parts of the input will be converted, i.e. it doesn’t matter if 
     * you call it on a string that has already been converted to Unicode.
     */
    toUnicode(value: string): string;

    /**
     * Converts a lowercased Unicode string representing a domain name or an email address to 
     * Punycode. Only the non-ASCII parts of the input will be converted, i.e. it doesn’t 
     * matter if you call it with a domain that’s already in ASCII.
     */
    toASCII(value: string): string;   

    /**
     * Punycode Unicode code point values
     */
    ucs2: PunycodeUCS2Static; 

    /**
     * A string representing the current Punycode.js version number.
     */
    version: string;
}

interface PunycodeUCS2Static {

    /**
     * Creates an array containing the numeric code point values of each Unicode symbol in the 
     * string. While JavaScript uses UCS-2 internally, this function will convert a pair 
     * of surrogate halves (each of which UCS-2 exposes as separate characters) into a 
     * single code point, matching UTF-16.
     */
    decode(value: string): number[];

    /**
     * Creates a string based on an array of numeric code point values.
     */
    encode(codePoints: number[]): string;
}

declare module 'punycode' {
    var punycode: PunycodeStatic;
    export = punycode;
}
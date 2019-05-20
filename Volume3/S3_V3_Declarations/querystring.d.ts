
interface QuerystringStatic {
    decode(qs: string, sep: string, eq: string, options: DecodeOptions): QuerystringMap;
    parse(qs: string, sep: string, eq: string, options: DecodeOptions): QuerystringMap;

    encode(obj: QuerystringMap, sep: string, eq: string): string;
    stringify(obj: QuerystringMap, sep: string, eq: string): string;
    encode(obj: string | boolean | number | null, sep: string, eq: string, name: string | boolean | number): string;
    stringify(obj: string | boolean | number | null, sep: string, eq: string, name: string | boolean | number): string;
}

interface DecodeOptions {
    maxKeys: number;
}

interface QuerystringMap {
    [key: string]: string | string[];
}

declare module 'querystring' {
    var querystring: QuerystringStatic;
    export = querystring;
}
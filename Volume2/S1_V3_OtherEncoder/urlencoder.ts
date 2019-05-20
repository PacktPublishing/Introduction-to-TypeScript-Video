import { IEncoder } from './IEncoder';

export var urlencoder: IEncoder = {
    encode: (value: string) => {
        return encodeURI(value);
    },
    decode: (value: string) => {
        return decodeURI(value);
    }
};
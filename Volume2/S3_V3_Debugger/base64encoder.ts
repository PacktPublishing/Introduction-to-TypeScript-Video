import { IEncoder } from './IEncoder';

export var base64encoder: IEncoder = {
    encode: (value: string) => {
        return new Buffer(value).toString('base64');
    },
    decode: (value: string) => {
        return new Buffer(value, 'base64').toString();
    }
};
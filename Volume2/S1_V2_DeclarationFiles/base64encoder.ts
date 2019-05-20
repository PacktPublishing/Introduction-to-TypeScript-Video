import { IEncoder } from './IEncoder';

export var base64encode: IEncoder = function (value: string): string {
    return new Buffer(value).toString('base64');
}
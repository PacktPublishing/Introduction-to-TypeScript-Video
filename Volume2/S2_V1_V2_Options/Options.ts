import { IEncoder } from './IEncoder';
import { encoders } from './encoders';

function exitIfNotIn(values: any[], value: any) {
    if (values.indexOf(value) === -1) {
        console.error(`${value} is not a valid value. Valid: ${values.join(', ')}`);
        process.exit(1);
    }
}

function exitIfUndefined(value: any, message: string) {
    if (typeof value === 'undefined') {
        console.error(message);
        process.exit(1);
    }
}

const encodingChoices = Object.keys(encoders).join(', ');

/**
 * Parsed properties from process args
 */
export interface ProcessArgs {
    readonly encoding: string;
    readonly decode: boolean;
} 

export class Options implements ProcessArgs {
    readonly encoder: IEncoder;
    readonly encoding: string;
    readonly decode: boolean;

    constructor(public readonly input: string, args: ProcessArgs) {
        exitIfUndefined(input, `Please pass an input string to encode`);
        exitIfUndefined(args.encoding, `Please pass a valid encoder option: ${encodingChoices}`);
        exitIfUndefined(args.decode, `Please pass a valid decode option: true or false`);
        exitIfNotIn(Object.keys(encoders), args.encoding);

        this.decode = args.decode;
        this.encoding = args.encoding;
        this.encoder = encoders[this.encoding];
    }
}
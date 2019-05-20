export interface IEncoder {
    encode(value: string): string;
    decode(value: string): string;
}
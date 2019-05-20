import { base64encoder } from './base64encoder';
import { urlencoder } from './urlencoder';

const ENCODER_B64 = 'base64';
const ENCODER_URL = 'url';

/**
 * Default encoder type
 */
export const DEFAULT_ENCODER = ENCODER_B64;

/**
 * Available encoders
 */
export const encoders = {
    [ENCODER_B64]: base64encoder,
    [ENCODER_URL]: urlencoder
};
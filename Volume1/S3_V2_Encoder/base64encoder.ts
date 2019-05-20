const KEY_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const EQUALS = 64;

export function base64encode(value: string): string {
    var output = "";
    var i = 0;
    
    while (i < value.length) {

        // process 3 8-bit numbers at a time
        let chr1 = value.charCodeAt(i++);
        let chr2 = value.charCodeAt(i++);
        let chr3 = value.charCodeAt(i++);

        // create 4 6-bit numbers from 3 8-bit numbers (ASCII)
        
        // retrieve 6 most significant bits of chr1
        let enc1 = chr1 >> 2;
        // get 2 least significant bits from chr1 (AND 00000011)
        // shift left 4 to append 4 most significant bits from chr2
        let enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        // get 4 least significant bits from chr2 (AND 00001111)
        // shift left 2 to append 2 most significant bits from chr3            
        let enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        // get last 6 bits by removing 2 most significant bits from chr3 (AND 00111111)
        let enc4 = chr3 & 63;

        // handle padding

        // if 2nd (and 3rd) octet is empty, zero out last 2 6-bit numbers
        if (isNaN(chr2)) {
            enc3 = enc4 = EQUALS;
        
        // if 3rd octet is empty, zero out last 6-bit number
        } else if (isNaN(chr3)) {
            enc4 = EQUALS;
        }

        // finally, concatenate the character sequence
        output = output 
            + KEY_STRING.charAt(enc1) 
            + KEY_STRING.charAt(enc2) 
            + KEY_STRING.charAt(enc3) 
            + KEY_STRING.charAt(enc4);
    }

    return output;
}
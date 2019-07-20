import aes from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

//  UTF8 string => Word Array
function Key(source) {
    return Utf8.parse(source);
}

//  UTF8 string => Word Array
function IV(source) {
    return Utf8.parse(source);
}

//  AES - The Advanced Encryption Standard
export function AES(key, iv) {
    function encrypt(msg) {
        return aes
            .encrypt(msg, Key(key), {iv: IV(iv)});
    }

    function decrypt(msg) {
        return aes
            .decrypt(msg, Key(key), {iv: IV(iv)})
            .toString(Utf8);
    }

    return {encrypt, decrypt};
}

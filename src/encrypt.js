// noinspection JSUnusedGlobalSymbols

import CryptoES from "crypto-es";

const Crypto = {
    encryptData: function (text, key) {
        return CryptoES.AES.encrypt(text, key).toString();
    },

    decryptData: function (ciphertext, key) {
        let bytes = CryptoES.AES.decrypt(ciphertext, key);
        return bytes.toString(CryptoES.enc.Utf8);
    }
}

export default Crypto
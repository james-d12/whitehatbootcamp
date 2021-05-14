import * as crypto from "crypto-js";

function encryptAES(message: string, password: string) {
    const cipherText = crypto.AES.encrypt(message, password).toString();
    return cipherText;
}

function decryptAES(encryptedMessage, password){
    const bytes = crypto.AES.decrypt(encryptedMessage, password);
    const message = bytes.toString(crypto.enc.Utf8);
    return message;
}
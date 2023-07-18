"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Enigma = void 0;
const crypto_1 = __importDefault(require("crypto"));
class Enigma {
    constructor(algorithm = 'aes-256-ctr', master_pass, init_vec_length = 16) {
        this.algorithm = algorithm;
        this.init_vec = crypto_1.default.randomBytes(init_vec_length);
        this.secretKey = crypto_1.default.createSecretKey(master_pass, 'utf-8');
        console.log(this.secretKey);
    }
    encrypt(text) {
        const cipher = crypto_1.default.createCipheriv(this.algorithm, this.secretKey, this.init_vec);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return {
            init_vec: this.init_vec.toString('hex'),
            content: encrypted.toString('hex')
        };
    }
    decrypt(hash) {
        const decipher = crypto_1.default.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(hash.init_vec, 'hex'));
        const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()]);
        return decrypted.toString();
    }
}
exports.Enigma = Enigma;

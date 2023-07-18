import crypto, { KeyObject } from 'crypto';

interface Encrypted {
    init_vec: string,
    content: string
}

export class Enigma {
    private readonly init_vec: Buffer;
    private readonly algorithm: string;
    private readonly secretKey: KeyObject;

    constructor(
        algorithm: string = 'aes-256-ctr',
        master_pass: string,
        init_vec_length: number = 16,
    ) {
        this.algorithm = algorithm;
        this.init_vec = crypto.randomBytes(init_vec_length);
        this.secretKey = crypto.createSecretKey(master_pass, 'utf-8');
        console.log(this.secretKey);
    }

    encrypt(text: string): Encrypted {
        const cipher = crypto.createCipheriv(this.algorithm, this.secretKey, this.init_vec)
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()])
    
        return {
            init_vec: this.init_vec.toString('hex'),
            content: encrypted.toString('hex')
        }
    }

    decrypt(hash: Encrypted): string {

        const decipher = crypto.createDecipheriv(this.algorithm, this.secretKey, Buffer.from(hash.init_vec, 'hex'))
        const decrypted = Buffer.concat([decipher.update(Buffer.from(hash.content, 'hex')), decipher.final()])

        return decrypted.toString()
    }
}
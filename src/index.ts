import { Enigma } from './Enigma';

const enigma = new Enigma('aes-256-ctr', 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3');

const encrypted_password = enigma.encrypt("password");
console.log(encrypted_password);
console.log(enigma.decrypt(encrypted_password));
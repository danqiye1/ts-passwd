"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Enigma_1 = require("./Enigma");
const enigma = new Enigma_1.Enigma('aes-256-ctr', 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3');
const encrypted_password = enigma.encrypt("password");
console.log(encrypted_password);
console.log(enigma.decrypt(encrypted_password));

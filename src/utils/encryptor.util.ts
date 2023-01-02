import { AES, DES, TripleDES, enc } from 'crypto-js';

//3 LAYER ENCRYPTION
export const encryptPassword = (plainPassword: string) => {
  const passwordKey = process.env.PASSWORD_KEY || '';
  let encLayer1 = AES.encrypt(plainPassword, passwordKey).toString();
  let encLayer2 = DES.encrypt(encLayer1, passwordKey).toString();
  let finalEncPassword = TripleDES.encrypt(encLayer2, passwordKey).toString();
  return finalEncPassword;
}

//3 LAYER DECRYPTION
export const decryptPassword = (encryptedPassword: string) => {
  const passwordKey = process.env.PASSWORD_KEY || '';
  let decLayer1 = TripleDES.decrypt(encryptedPassword, passwordKey);
  let deciphertext1 = decLayer1.toString(enc.Utf8);
  let decLayer2 = DES.decrypt(deciphertext1, passwordKey);
  let deciphertext2 = decLayer2.toString(enc.Utf8);
  let decLayer3 = AES.decrypt(deciphertext2, passwordKey);
  let finalDecPassword = decLayer3.toString(enc.Utf8);
  return finalDecPassword;
}
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  private readonly keyLength = 16;
  private readonly iterations = 10000;

  async encryptPassword(password: string, salt: string): Promise<string> {
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    const saltBuffer = encoder.encode(salt);

    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );

    const derivedKey = await crypto.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: saltBuffer,
        iterations: this.iterations,
        hash: 'SHA-256',
      },
      keyMaterial,
      this.keyLength * 8
    );

    const encryptedPasswordBuffer = await crypto.subtle.digest(
      'SHA-256',
      derivedKey
    );

    const encryptedPasswordArray = Array.from(
      new Uint8Array(encryptedPasswordBuffer)
    );

    return encryptedPasswordArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
  }



}

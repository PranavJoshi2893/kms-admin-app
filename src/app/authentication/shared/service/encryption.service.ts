import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {

  constructor() { }

  private enc = new TextEncoder();


  private getKeyMaterial = async (password: string) => {
    return await crypto.subtle.importKey(
      "raw",
      this.enc.encode(password),
      "PBKDF2",
      false,
      ["deriveBits", "deriveKey"],
    )
  }

  private generateKey = async (password: string) => {
    const keyMaterial = await this.getKeyMaterial(password);
    const salt = crypto.getRandomValues(new Uint8Array(16));
    console.log(salt)
    return await crypto.subtle.deriveKey(
      {
        name: "PBKDF2",
        salt,
        iterations: 100000,
        hash: "SHA-256"
      },
      keyMaterial,
      { name: "AES-GCM", length: 256 },
      true,
      ["encrypt", "decrypt"]
    );
  }

  encryptedPassword = async (password: string) => {
    const key = await this.generateKey(password);
    const iv = crypto.getRandomValues(new Uint8Array(16))

    const cipherPassword = await crypto.subtle.encrypt(
      {
        name: "AES-GCM",
        iv: iv
      },
      key,
      this.enc.encode(password)
    )

    return btoa(String.fromCharCode(...new Uint8Array(cipherPassword)));
  }


}

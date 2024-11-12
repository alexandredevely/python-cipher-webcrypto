// utils/RSA_encryption.ts
// Author  Yin Te Lan benjamin5252
// https://github.com/benjamin5252/web_crypto_api_example/blob/main/src/utils/RSA_encryption.ts

const fs = require('fs');

const encryptAlgorithm = {
  name: "RSA-OAEP",
  modulusLength: 2048,
  publicExponent: new Uint8Array([1, 0, 1]),
  extractable: true,
  hash: {
    name: "SHA-256"
  }
}


function addNewLines(str) {
  let finalString = '';
  while(str.length > 0) {
      finalString += str.substring(0, 64) + '\n';
      str = str.substring(64);
  }

  return finalString;
}

function _arrayBufferToBase64(arrayBuffer) {
  const byteArray = new Uint8Array(arrayBuffer);
  let byteString = '';
  for(let i=0; i < byteArray.byteLength; i++) {
      byteString += String.fromCharCode(byteArray[i]);
  }
  const b64 = btoa(byteString);

  return b64;
}

function _toPrivatePem(privateKey) {
  const b64 = addNewLines(_arrayBufferToBase64(privateKey));
  const pem = "-----BEGIN RSA PRIVATE KEY-----\n" + b64 + "-----END RSA PRIVATE KEY-----";
  return pem;
}

function _toPublicPem(privateKey) {
  const b64 = addNewLines(_arrayBufferToBase64(privateKey));
  const pem = "-----BEGIN PUBLIC KEY-----\n" + b64 + "-----END PUBLIC KEY-----";
  return pem;
}


async function generateRSAKeyPair() {
  const keyPair = await crypto.subtle.generateKey(
      encryptAlgorithm,
      true,
      ["encrypt", "decrypt"]
    )
      
    const keyPairPem = {
      publicKey: '',
      privateKey: '',
    }
    const exportedPrivateKey = await crypto.subtle.exportKey(
      "pkcs8",
      keyPair.privateKey
    )
    keyPairPem.privateKey = _toPrivatePem(exportedPrivateKey);
    const exportedPublicKey = await crypto.subtle.exportKey(
      "spki",
      keyPair.publicKey
    )
    keyPairPem.publicKey = _toPublicPem(exportedPublicKey);   
  return keyPairPem;
}

generateRSAKeyPair().then( (keyPairPem) => { 
  fs.writeFileSync( "private.pkcs8.pem", keyPairPem.privateKey );
  fs.writeFileSync( "public.pem", keyPairPem.publicKey );
  console.log(keyPairPem); 
} );

const fs = require('fs');

/*
 * read a file and return data
 */
function read_file( filename ) {
    const data = fs.readFileSync( filename, { encoding: 'utf8', flag: 'r' });
    return data;
}

/*
 * PEM to Binary
 */
function PEM2Binary(pem) {
    var encoded = '';
    var lines = pem.split('\n');
    for (var i = 0; i < lines.length; i++) {
        if (lines[i].indexOf('-----') < 0) {
            encoded += lines[i];
        }
    }
    // convert base64 to buffer
    const buffer = Buffer.from(encoded, 'base64');
    // convert buffer to ArrayBuffer
    const binaryDer = toArrayBuffer(buffer);
    return binaryDer;    
}

/* 
 * Convert a buffer to ArrayBuffer
 */
function toArrayBuffer(buffer) {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
}

// from https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#examples
async function importPrivateKey(pem_file) {
  const pem = read_file( pem_file );
  const pembinary = PEM2Binary( pem );
  const cryptokey = await crypto.subtle.importKey(
    "pkcs8",
    pembinary,
    { name: "RSA-OAEP", 
      hash: "SHA-256" },
    false,
    ["decrypt"],
  );
  return cryptokey;
}


async function decrypt(r) {
    let pem_file = 'private.pkcs8.pem';
    let private_key = await importPrivateKey( pem_file ); 
    var b64cipher = fs.readFileSync( 'cipher.b64', { encoding: 'utf8', flag: 'r' } ); 
    const buffer = Buffer.from(b64cipher, 'base64');
    // convert to array buffer
    const hash = toArrayBuffer(buffer);
    // decrypt
    var value = await crypto.subtle.decrypt( { name: "RSA-OAEP" }, private_key, hash );
    // convert an ArrayBuffer to a string
    const decoder = new TextDecoder();
    const clearmessage = decoder.decode(value);
    // dump content
    console.log( clearmessage );
}

decrypt();


# python-cipher-webcrypto

sample code to encrypt a clear message using python's crypto module with RSA OAEP and decrypt with crypto.subtle API from njs

```
[clear message] -> python crypto RSA OAEP -> [cipher] -> crypto.subtle -> [clear message]
```



## create RSA public and private keys

``` bash
openssl genrsa -out private.pem 2048
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private.pem -out private.pkcs8.pem
openssl rsa -in private.pem -RSAPublicKey_out -out rsapublic.pem
```

## python rsa encrypt

rsa_oaep_encrypt.py
- Load the rsa public key `rsapublic.pem`
- encrypt a simple string `"hello clear message"`
- print the base64 encode cipher

``` python
import base64
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5, PKCS1_OAEP

clear_message = "hello clear message"
rsa_public_key_file_name = "rsapublic.pem"

# read payload_desktop_publickeyfile
f = open(rsa_public_key_file_name, 'r')        
rsa_public_key_content = f.read()
f.close()

# load the rsa_public_key_content
public_key = PKCS1_OAEP.new( key=rsa_public_key_content, hashAlgo=Crypto.Hash.SHA256 )
# encrypt
cipher = pubobj.encrypt(clear_message)
# convert to b64
b64_cipher = base64.b64encode( cipher )
# print b64 encoded crypto
print(b64_cipher)
```

requirements.txt
``` requirements.txt
cryptography>= 43.0.3
```

```
pip3 install -r requirements.txt 
```

## crypto.subtle rsa decrypt


crypto_decrypt.py

``` js
let pem_file = 'private.pkcs8.pem';
// load private key
let private_key = await importPrivateKey( pem_file );
// load cipher
var b64cipher = fs.readFileSync( 'cipher.b64', { encoding: 'utf8', flag: 'r' } ); 
const buffer = Buffer.from(b64cipher, 'base64'); // base64 decode
const hash = toArrayBuffer(buffer); // convert to array buffer
// decrypt
var value = await crypto.subtle.decrypt( { name: "RSA-OAEP" }, private_key, hash );
// convert an ArrayBuffer to a string
const decoder = new TextDecoder();
const clearmessage = decoder.decode(value);
// dump content
console.log( clearmessage );
```


## example 

- using nodejs
```
./make_key.sh 
writing RSA key
./rsa_oaep_encrypt.py > cipher.b64  
node rsa_oaep_decrypt.js
hello clear message
```


- using njs
```
./make_key.sh 
writing RSA key
./rsa_oaep_encrypt.py > cipher.b64  
njs rsa_oaep_decrypt.js
hello clear message
```



# links

https://diafygi.github.io/webcrypto-examples/



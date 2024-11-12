# python-cipher-webcrypto

sample code to encrypt a clear message using python's crypto module with RSA OAEP and decrypt with crypto.subtle API from njs

```
[clear message] -> python crypto RSA OAEP -> [cipher] -> crypto.subtle -> [clear message]
```


# using SHA-1

## create RSA public and private keys

``` bash
openssl genrsa -out private.pem 2048
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private.pem -out private.pkcs8.pem
openssl rsa -in private.pem -RSAPublicKey_out -out public.pem
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
public_key = PKCS1_OAEP.new( key=rsa_public_key_content )
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

rsa_oaep_decrypt.js

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


## usage

```
git clone https://github.com/alexandredevely/python-cipher-webcrypto.git
cd python-cipher-webcrypto
```

create rsa keys
```
./make_key.sh 
writing RSA key
```

- install pycryptodome python module
```
pip3 install -r requirements.txt
```

- create cipher base64 file
```
./rsa_oaep_encrypt.py > cipher.b64
```

- decrypt with nodejs
```
node rsa_oaep_decrypt.js
hello clear message
```


- or decrypt with njs
```
njs rsa_oaep_decrypt.js
hello clear message
```


# using SHA-256

## create RSA keys RSA-OAEP, modulusLength 2048, hash SHA-256

``` bash
nodejs node make_key.js 
{
  publicKey: '-----BEGIN PUBLIC KEY-----\n' +
    'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAobaZgx3WHRdY/9XO3ZAa\n' +
    'mp8NU+fmJ4YukBspsJ0a95yULH4HvTGBbdk6/Ia5msrOlgvlVVvnUW7PmzC7JMzW\n' +
    'D2Iyf5xCzb5keySFa6R9G/8fLgRWTT2lUX2F927aENvsGjrpknGoOe27uZmOUede\n' +
    'YUBApNMI5CTk6Q9WFz2WhD/CVkfjYvlQBr3lQc4vwaU+kkNIfr8RpWiCe5nDkGJz\n' +
    'JHAa2zj2Qadxg1qOB4SB+pLQrFl257jDFB/RD4h8v+oZyyJNl1Q9/R2cJi8vcklv\n' +
    'aQ5g9AyXI7xNsBCKe5drv4GrTG+UMaYk2WRUuzjRmBqhOarOS8tLD1Qs2tzdTDTO\n' +
    'owIDAQAB\n' +
    '-----END PUBLIC KEY-----',
  privateKey: '-----BEGIN RSA PRIVATE KEY-----\n' +
    'MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQChtpmDHdYdF1j/\n' +
    '1c7dkBqanw1T5+Ynhi6QGymwnRr3nJQsfge9MYFt2Tr8hrmays6WC+VVW+dRbs+b\n' +
    'MLskzNYPYjJ/nELNvmR7JIVrpH0b/x8uBFZNPaVRfYX3btoQ2+waOumScag57bu5\n' +
    'mY5R515hQECk0wjkJOTpD1YXPZaEP8JWR+Ni+VAGveVBzi/BpT6SQ0h+vxGlaIJ7\n' +
    'mcOQYnMkcBrbOPZBp3GDWo4HhIH6ktCsWXbnuMMUH9EPiHy/6hnLIk2XVD39HZwm\n' +
    'Ly9ySW9pDmD0DJcjvE2wEIp7l2u/gatMb5QxpiTZZFS7ONGYGqE5qs5Ly0sPVCza\n' +
    '3N1MNM6jAgMBAAECggEAJHxg7XLVZNHoPCy+1EGXpww8wxIe3QsKxWvDf7wqofRb\n' +
    'gCBdWaPqSmEJTIGPLewVKUh80UH/kmF4iNC5YKewol7q+tzEO8x5ukj2q1889Qye\n' +
    'OdEzsZC3lIfIKpgBrm0YO6DQI0DujkdjpBAPys3zfuiyzR1qM6NZXHYf2/WC2Mp4\n' +
    'A7WodRQmIEJWIgGZ66ZnjUSeJZk94CHJTyr6iu4CiOTHxYjGF4aaxEazhUJoKRRw\n' +
    'zVP5/itkYQLhUwURMh3LdbVcA98kwZlb7tC1wEBHrkFz6c/nbMHNntUh9jtlflwU\n' +
    'aqZD0WOdl+aCAA9J6ymM1r5EL/7YgsI5b57tRYapjQKBgQDU1nxzpHythikcHsKF\n' +
    'aMkR7T4Q49WS7VkPmnleGQAX4M0g9QazAD6ae24hpqXiycmE4hvdKKJpGNs2NLKf\n' +
    'sh3ijkny5pb284ievIzlXRAEid7Yr3Y2tZw+2gn6/NzNWd0aefiiVr2+FtKLlEC8\n' +
    'NV31HOg2xVSlzpEniNvwJ0g31QKBgQDCgfkfc1Zpnyghb7Zoi1tRd3DUBDiMCPG9\n' +
    'kaDmLGZ6RgvdWmaomeSxV6jWKXx+HTiEc3rbfYiFlhGIvQhljA/vQinTZuM79iVj\n' +
    'oEe9o8nTvsgrk+SnWbfB4rqjNVUkj3YZ66brfWjdZdAWsA7KP2s5DZnHCVdX5XLQ\n' +
    'hKEkvvxglwKBgDz4bJJcLnMvGZu6nBLHn8II6lzAR7BdWcQEhnwUQViVx22Hg7HH\n' +
    'gieS8Eunh6HeGGJ+u2ixeUUOH835bqocxj7ecASrVdfMj/iZHuudqzcBn9sG+KBX\n' +
    'ijjfETjbMw2IjrRE+JrYqmZH92yQvbKsvwu2ijcWdFdDQ4XFyOuU9TU5AoGABHqD\n' +
    'pvK76aCtht+QnqWey6hpY6hZOPg3wLqqrsIU9fnI6ibbuEQa3O58x7ma0TiRBZO3\n' +
    'H3irfQ/whWp82AG6mDK4zdJPpyDKyZl2LWqpCgQZjc9Q832AWqmCzKE8vaPD/2LK\n' +
    'rB9uG7LtcKhLHuMI7/5dLRUM+swgsaZsI3F2VC8CgYEAyDdZ6YKTvQTOzpXqvn4q\n' +
    'sNGFIpf+lxmikVUU7zOso7sdk6CX+4q5IGN/o08TXW+Ht+BEZC6fULfT5PbJ8tM/\n' +
    'm+1C2N4E2cEMNHkyTrqyHycaeaGRtKn4715nR81HiaC24JMybgrpbkzNtcTVxXe+\n' +
    'DwJNSaB780XYtifQe6niaZ0=\n' +
    '-----END RSA PRIVATE KEY-----'
}
```

- python rsa encrypt

```
rsa_oaep_encrypt_sha256.py > cipher.b64
```

- node rsa oaep decrypt sha256

```
node rsa_oaep_decrypt_sha256.js 
hello clear message
```

# links

- supported_algorithms
[https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto#supported_algorithms]

- webcrypto-examples
[https://diafygi.github.io/webcrypto-examples]



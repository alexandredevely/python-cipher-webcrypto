# python-cipher-webcrypto

sample code to encrypt a clear message using python's crypto module with RSA OAEP and decrypt with crypto.subtle API

```
[clear message] -> python crypto RSA OAEP -> [cipher] -> crypto.subtle -> [clear message]
```



## create RSA public and private keys

```
openssl genrsa -out private.pem 2048
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private.pem -out private.pkcs8.pem
openssl rsa -in private.pem -RSAPublicKey_out -out rsapublic.pem
```

## python rsa encrypt

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
crypto = pubobj.encrypt(clear_message)
# convert to b64
b64_crypto = base64.b64encode( crypto )
# print b64 encoded crypto
print(b64_crypto)
```

## crypto.subtle rsa decrypt


# links

https://diafygi.github.io/webcrypto-examples/



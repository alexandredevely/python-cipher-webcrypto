# python-cipher-webcrypto

sample code to encrypt a clear message using python's crypto module with RSA OAEP and decrypt with crypto.subtle API

```
[clear message] -> python crypto RSA OAEP -> [cipher] -> crypto.subtle -> [clear message]
```



## create RSA public and private keys

```
openssl genrsa -out private.pem 2048
# openssl rsa    -in  private.pem -outform PEM -pubout -out _public.pem 
openssl rsa    -in  private.pem -RSAPublicKey_out    -out rsapublic.pem
```

## python rsa encrypt

## crypto.subtle rsa decrypt


# links

https://diafygi.github.io/webcrypto-examples/



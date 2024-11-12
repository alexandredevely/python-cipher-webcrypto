openssl genrsa -out private.pem 2048
openssl pkcs8 -topk8 -inform PEM -outform PEM -nocrypt -in private.pem -out private.pkcs8.pem
openssl rsa -in private.pem -RSAPublicKey_out -out public.pem

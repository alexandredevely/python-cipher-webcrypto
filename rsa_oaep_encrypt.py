#!/usr/bin/env python3
#
# Software Name : abcdesktop.io
# Version: 0.2
# SPDX-FileCopyrightText: Copyright (c) 2020-2022 Orange
# SPDX-License-Identifier: GPL-2.0-only
#
# This software is distributed under the GNU General Public License v2.0 only
# see the "license.txt" file for more details.
#
# Author: abcdesktop.io team
# Software description: cloud native desktop service
#
#


import base64
import Crypto.Hash
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5, PKCS1_OAEP

# simple var
clear_message = "hello clear message"
rsa_public_key_file_name = "rsapublic.pem"

# read payload_desktop_publickeyfile
f = open(rsa_public_key_file_name, 'r')        
rsa_public_key_content = f.read()
f.close()

# load the rsa_public_key_content
key = RSA.importKey( rsa_public_key_content )
public_key = PKCS1_OAEP.new( key=key )
# , hashAlgo=Crypto.Hash.SHA256 )
# encrypt
cipher = public_key.encrypt(clear_message.encode('ascii'))
# convert to b64
b64_cipher = base64.b64encode( cipher )
# print b64 encoded crypto
print(b64_cipher.decode('ascii'))

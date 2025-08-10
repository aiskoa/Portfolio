---
title: "Cybersecurity Fundamentals 3"
excerpt: "We will explore Cryptography 🔑!"
date: "Nov 15 2024"
cover_image: "/blog/cibersec.webp"
alt: "Cybersec 3"
tags1: "Helpdesk"
tags2: "Hacking"
---

# Cybersecurity Fundamentals (Part 3)

&nbsp;

> 🚨 WARNING 🚨: This will be one of the longest and somewhat advanced entries, I recommend reading carefully and if you put anything seen here into practice, you should do so at your own risk.
> *Difficulty Level: ⭐⭐⭐*

I recommend you go to the CheatSheet for a more dynamic and fun version of learning these terms.
[Click to find the Complete CheatSheet](https://aiskoa.gitbook.io/glosario-de-hacking-ciberseguridad-y-redes/)

&nbsp;

## What is Cryptography? 🔑

**CRYPTOGRAPHY**: It is the art of representing information through symbols and coding systems to transmit information securely and reliably.
What is its use?: To encrypt confidential or private information to keep it safe from any type of attack and to comply with information security regulations (although this is not always infallible).

## Examples in your daily life

- 🏠 When you log into your favorite social network with your password.
- 🏠 When you unlock your cell phone.
- 🏠 When you send a WhatsApp message to your partner.
- 🏠 When you hear a taxi driver talking to another in code, for example: 10-4, 7-40, etc.

&nbsp;

## 1. Symmetric Cryptography

- 💫 **Features**: In symmetric cryptography, the same key is used to encrypt and decrypt a message. This requires both parties to share the key securely before use. It is faster compared to asymmetric cryptography and is used to encrypt large volumes of data.
- 💫 **Applications**: It is commonly used for file encryption (for example, in cloud storage systems), in databases to protect sensitive data, and in virtual private networks (VPNs) to ensure data transmission, in short, large volumes of data.

### Examples of Symmetric Cryptography

| Name | Description |
| --|--|
| 🐦 **AES** | (Advanced Encryption Standard) It is a widely used standard for its efficiency and security. Some software that uses it are [Encrypto](https://macpaw.com/encrypto), [GIE](https://github.com/aiskoa/GIE-UI), [PassPai](https://aiskoa.github.io/PassPai/) |
| 🐦 **DES** | (Data Encryption Standard) It is an older algorithm that has been largely replaced by AES. |
| 🐦 **Blowfish** | It is a block cipher algorithm that is fast and efficient for variable-sized data, widely used in WooCommerce. |

&nbsp;

### Symmetric Cryptography Code Example

```jsx
import * as crypto from 'crypto';
import { createReadStream, createWriteStream, PathLike } from 'fs';
import { pipeline } from 'stream';

const cipher = (
  password: string,
  salt: string,
  size: 128|192|256,
  input: PathLike,
  output: PathLike,
) => {
  const cipher = crypto.createCipheriv(
    `aes-${size}-cbc`,
    crypto.scryptSync(password, salt, size / 8),
    new Uint8Array(16)
  );

  pipeline(createReadStream(input), cipher, createWriteStream(output), (error)=> {
    if(error) throw error;
  });
};
```

This TypeScript code snippet defines a function called `cipher` that performs encryption using the Advanced Encryption Standard (AES) algorithm.

The function receives the following parameters:

- `password`: A string representing the password used to encrypt the data.
- `salt`: A string representing the salt used in the encryption process.
- `size`: A number representing the key size (128, 192, or 256).
- `input`: A `PathLike` object representing the path to the file to be encrypted.
- `output`: A `PathLike` object representing the path to the encrypted output file.

Inside the function, it creates a cipher using the `createCipheriv` method of the `crypto` module. It specifies the encryption algorithm as `aes-{size}-cbc`, where `{size}` is the value of the `size` parameter. It also generates a key using the `scryptSync` method, passing the `password`, `salt`, and `size / 8` as arguments.

Next, the function uses the `pipeline` method to read the contents of the input file, encrypt it using the cipher, and write the encrypted result to the output file. If an error occurs during the encryption process, it throws the error.

```jsx
import * as crypto from 'crypto';s
import { createReadStream, createWriteStream, PathLike } from 'fs';
import { pipeline } from 'stream';

const decipher = (
  password: string,
  salt: string,
  size: 128|192|256,
  input: PathLike,
  output: PathLike,
) => {
  const decipher = crypto.createDecipheriv(
    `aes-${size}-cbc`,
    crypto.scryptSync(password, salt, size / 8),
    new Uint8Array(16)
  );

  pipeline(createReadStream(input), decipher, createWriteStream(output), (error) => {
    if(error) throw error;
  });
};

export default decipher;
```

This decrypts the content of the previous code.

&nbsp;

## 2. Asymmetric or Public Key Cryptography

- 💫 **Features**: Also known as public key cryptography, it uses a pair of keys: a public one and a private one. The public key can be shared openly, while the private key is kept secret. This technique allows both encryption and digital signing of messages.
- 💫 **Applications**: It is essential for creating digital signatures, establishing secure sessions on the Internet (as in SSL/TLS for secure websites), and in encrypted email systems. This method is essential for establishing secure connections on the internet, such as in the HTTPS protocol.

### Examples of Asymmetric Cryptography

| Name | Description |
| --|--|
| 🐦 **RSA** | (Rivest-Shamir-Adleman) It is one of the first asymmetric cryptography systems, used for encryption and digital signatures. |
| 🐦 **DSA** | (Digital Signature Algorithm) Used mainly for creating digital signatures. |
| 🐦 **ECC** | (Elliptic Curve Cryptography) It offers the same security as RSA but with shorter keys, which makes it more efficient. Some software that uses it are [GIE](https://github.com/aiskoa/GIE-UI). |

&nbsp;

### Asymmetric Cryptography Code Example

```jsx
// Import necessary modules
import * as crypto from "crypto";
import { PathLike, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

// Function to generate an RSA or RSA-PSS key pair
const keygen = (
  // Type of key to generate ("rsa" or "rsa-pss")
  type: "rsa" | "rsa-pss",
  // Encryption size for the private key (128, 192, or 256 bits)
  size: 128 | 192 | 256,
  // Passphrase to protect the private key
  passphrase: string,
  // Output format of the keys ("pem" or "der")
  format: "pem" | "der",
  // Modulus length for the key (2048, 3072, or 4096 bits)
  modulusLength: 2048 | 3072 | 4096
  // Define key generation options according to the type
) => {
  switch (type) {
    case "rsa": {
      // Options for RSA keys
      const options: crypto.RSAKeyPairOptions<
        crypto.KeyFormat,
        crypto.KeyFormat
      > = {
        modulusLength, // Modulus length
        publicKeyEncoding: {
          type: "spki", // Standard format for public key
          format, // Output format
        },
        privateKeyEncoding: {
          type: "pkcs8", // Standard format for private key
          format, // Output format
          cipher: `aes-${size}-cbc`, // Encryption algorithm for the private key
          passphrase, // Passphrase
        },
      };
      return crypto.generateKeyPairSync("rsa", options); // Generate the key pair
    }
    case "rsa-pss": {
      // Options for RSA-PSS keys (similar to RSA but with PSS signature)
      const options: crypto.RSAPSSKeyPairOptions<
        crypto.KeyFormat,
        crypto.KeyFormat
      > = {
        modulusLength, // Modulus length
        publicKeyEncoding: {
          type: "spki", // Standard format for public key
          format, // Output format
        },
        privateKeyEncoding: {
          type: "pkcs8", // Standard format for private key
          format, // Output format
          cipher: `aes-${size}-cbc`, // Encryption algorithm for the private key
          passphrase, // Passphrase
        },
      };
      return crypto.generateKeyPairSync("rsa-pss", options);  // Generate the key pair
    }
  }
};

// Function to create a key pair and save them to files
const keypair = (
  type: "rsa" | "rsa-pss",
  size: 128 | 192 | 256,
  passphrase: string,
  outDir: string,
  outFormat: "pem" | "der",
  modulusLength: 2048 | 3072 | 4096
) => {
  // Generate the key pair using the keygen function
  const { publicKey, privateKey } = keygen(
    type,
    size,
    passphrase,
    outFormat,
    modulusLength
  );
  // Create the output folder if it does not exist
  mkdirSync(outDir, { recursive: true });
  // Save the public key to a file
  writeFileSync(join(outDir, `public.${outFormat}`), publicKey.toString());
  // Save the private key to a file (encrypted with the passphrase)
  writeFileSync(join(outDir, `private.${outFormat}`), privateKey.toString());
};

// Export the keypair function to use it in other modules
export default keypair;

```

The above code is a TypeScript function called `keygen` that generates an RSA or RSA-PSS key pair. It takes five parameters:

- `type`: the type of key to generate, either "rsa" or "rsa-pss".
- `size`: the encryption size of the private key (128, 192, or 256 bits)
- Passphrase: password to protect the private key.
- `format`: the output format of the keys ("pem" or "der")
- `modulusLength`: the modulus length of the key (2048, 3072, or 4096 bits)

The function uses a `switch` statement to determine which type of key to generate, and then creates an options object with the specified parameters. It then calls the `crypto.generateKeyPairSync` function to generate the key pair, passing the options object.

In summary, this function generates an RSA or RSA-PSS key pair with customizable encryption size, password protection, output format, and modulus length.

&nbsp;

## 3. Cryptographic Hash

- 💫 **Features**: Cryptographic hashes are algorithms that take an input of any size and produce a fixed-size output, known as a hash. These are one-way, which means that the original message cannot be obtained from the hash. In addition, a small modification in the input produces a completely different hash.
- 💫 **Applications**: They are used to verify data integrity, in password authentication (storing the hash of the password instead of the password itself), and in blockchain technology to ensure the integrity of the blockchain.

### Examples of Cryptographic Hash

| Name | Description |
| --|--|
| 🐦 **SHA-256** | (Secure Hash Algorithm 256 bits) Part of the SHA-2 family, widely used in applications such as Bitcoin. |
| 🐦 **MD5** | (Message-Digest Algorithm 5) Although it is fast, it is no longer recommended due to vulnerabilities found. |
| 🐦 **Whirlpool** | A hash algorithm that produces a 512-bit hash. |

&nbsp;

### Cryptographic Hash Code Example

```jsx
import * as crypto from 'crypto';
import { PathLike, readFileSync } from 'fs';

const hash = (algorithm: string, encoding: crypto.BinaryToTextEncoding, input: PathLike) => {
  return crypto.createHash(algorithm).update(readFileSync(input)).digest(encoding); 
};

export default hash;

```

This is a TypeScript function called `hash` that generates a hash value for a given file. It takes three parameters:

- `algorithm`: the hash algorithm to use (e.g. "sha256", "md5", etc.)
- `encoding`: the encoding to use for the resulting hash value (e.g. "hex", "base64", etc.)
- `input`: the file for which the hash will be generated

The function uses the `crypto` module to create a hash object, updates it with the contents of the input file, and returns the hash value in the specified encoding.

&nbsp;

## 4. Elliptic Curve Cryptography

- 💫 **Features**: Based on the arithmetic of elliptic curves over finite fields, it offers a high level of security with shorter keys compared to traditional asymmetric cryptography. This translates into faster operations and lower resource usage.
- 💫 **Applications**: It is widely used in mobile applications and devices with limited resources. It is also essential in the creation of cryptocurrencies, such as Bitcoin and Ethereum, to secure transactions and manage private keys.

### Examples of Elliptic Curve

| Name | Description |
| --|--|
| 🐦 **ECDSA** | (Elliptic Curve Digital Signature Algorithm) Used to create digital signatures. |
| 🐦 **ECDH** | (Elliptic Curve Diffie-Hellman) A method for exchanging secret keys. |

&nbsp;

### Elliptic Curve Code Example

```python
from cryptography.hazmat.primitives.asymmetric import x25519
from cryptography.hazmat.primitives.asymmetric.x25519 import X25519PrivateKey, X25519PublicKey
from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import padding
from cryptography.hazmat.primitives.ciphers import Cipher, algorithms, modes
from cryptography.hazmat.backends import default_backend
import os
import math


def generate_key_pair():
    # Generates an ECDH key pair.
    private_key = X25519PrivateKey.generate()
    public_key = private_key.public_key()
    return private_key, public_key


def derive_key(private_key, public_key):
    # Obtaining a shared key through ECDH
    shared_key = private_key.exchange(public_key)
    return shared_key


def fibonacci_sequence(n):
    # Generate a Fibonacci sequence up to the nth term.
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence


def xor_encrypt(data, key):
    # XOR the data with the key.
    return bytes([b ^ key[i % len(key)] for i, b in enumerate(data)])


def encrypt(plaintext, public_key):
    # Encrypt the plaintext using the public key and a Fibonacci sequence.
    # Generates an asymmetric key randomly
    symmetric_key = os.urandom(32)

    # The shared key is obtained through ECDH
    private_key, _ = generate_key_pair()  # Generates a temporary private key
    shared_key = derive_key(private_key, public_key)

    # Generates a fibonacci key based on the length of the plaintext
    fib_sequence = fibonacci_sequence(len(plaintext))

    # Adjusts the length of the combined key to match the plaintext
    combined_key = bytes(
        [shared_key[i % len(shared_key)] ^ fib_sequence[i % len(fib_sequence)] for i in range(len(plaintext))])

    # Encrypts the plaintext with the combined key
    encrypted_text = xor_encrypt(plaintext.encode(), combined_key)

    return encrypted_text, private_key  # Temporarily returns the private key


def decrypt(encrypted_text, private_key, public_key):
    """Decrypts the ciphertext using the private key and the public key."""
    # The shared key is obtained through ECDH
    shared_key = derive_key(private_key, public_key)

    # Generate a Fibonacci sequence based on the length of the ciphertext
    fib_sequence = fibonacci_sequence(len(encrypted_text))

    # Adjusts the length of the combined key to match the ciphertext
    combined_key = bytes(
        [shared_key[i % len(shared_key)] ^ fib_sequence[i % len(fib_sequence)] for i in range(len(encrypted_text))])

    # Decrypts the ciphertext with the combined key
    decrypted_text = xor_encrypt(encrypted_text, combined_key)

    return decrypted_text.decode(errors='ignore')  # Ignores errors during decoding


print("Enter a password to encrypt")

passwd = input(": ")

# Example of use
# Phrase: --
plaintext = passwd
private_key, public_key = generate_key_pair()
encrypted_text, temp_private_key = encrypt(plaintext, public_key)
print(f"Encrypted: {encrypted_text}")

decrypted_text = decrypt(encrypted_text, temp_private_key, public_key)
print(f"Decrypted: {decrypted_text}")

```

The above code was written in Python using calculation techniques using elliptic curve cryptography (specifically, the X25519 curve).

Install the dependencies and make sure to install the cryptography library correctly.

Example: **We enter the word**: **Hello**

### Key generation process

1. **Private key**: It is a randomly generated value that is kept secret. It is generated using the `X25519PrivateKey.generate()` method.
2. **Public key**: It is derived from the private key and can be shared openly. It is calculated as part of the key pair generation process.

### Key generation example

1. **Run the `generate_key_pair()` function** to create a private key and a public key.
2. The private key is a binary value that is not intended to be shared.
3. The public key is derived from the private key and can be shared with others.

### Example of output

If you were to run the program, you might see a result similar to this *(the actual values will be different each time due to randomness)*:

- **Private Key**: `b'\x1a\x2b\x3c\x4d\x5e\x6f\...'`
- **Public Key**: `b'\x9a\x8b\x7c\x6d\x5e\x4f\...'`

### Important note

The public and private keys are not derived from the "Hello" input, but are generated independently. The input is only used for the encryption and decryption processes after the keys have been generated.

&nbsp;

## 5. Quantum Cryptography

- 💫 **Features**: It takes advantage of the principles of quantum mechanics, such as quantum entanglement and uncertainty, to create communication systems that cannot be intercepted without being detected. It offers theoretically unconditional security.
- 💫 **Applications**: Although it is still in the early stages of development and implementation, it has the potential to revolutionize security in sensitive communications and in protection against the threats of quantum computing to traditional cryptography.

### Examples of Quantum Cryptography

| Name | Description |
| --|--|
| 🐦 **QKD** | (Quantum Key Distribution) It allows two parties to generate a shared secret key using quantum particles. If a third party tries to intercept the key, this will alter the quantum state and will be detectable. |

This is still under development, but the main idea of quantum cryptography promises to revolutionize computer security by offering methods that are theoretically invulnerable to future attacks based on quantum computers

### Quantum Cryptography Code Example

```python
import numpy as np
import random

class QKD:
    def __init__(self, n_bits):
        self.n_bits = n_bits
        self.alice_bits = []
        self.bob_bits = []
        self.bases_alice = []
        self.bases_bob = []
        self.shared_key = []

    def generate_bits_and_bases(self):
        # Alice generates random bits and bases
        for _ in range(self.n_bits):
            self.alice_bits.append(random.randint(0, 1))  # Random bit (0 or 1)
            self.bases_alice.append(random.choice(['H', 'V']))  # Random basis (horizontal or vertical)

    def simulate_bob_measurement(self):
        # Bob randomly chooses bases to measure Alice's bits
        for _ in range(self.n_bits):
            self.bases_bob.append(random.choice(['H', 'V']))
            # Simulate the measurement (if the bases match, he gets the bit)
            if self.bases_alice[_] == self.bases_bob[_]:
                self.bob_bits.append(self.alice_bits[_])
            else:
                self.bob_bits.append(None)  # No bit if the bases do not match

    def sift_key(self):
        # Sift the key based on the matching bases
        for i in range(self.n_bits):
            if self.bases_alice[i] == self.bases_bob[i]:
                self.shared_key.append(self.alice_bits[i])

    def run_qkd_protocol(self):
        self.generate_bits_and_bases()
        self.simulate_bob_measurement()
        self.sift_key()
        
        return self.shared_key

# Example of use
n_bits = 10  # Number of bits to exchange
qkd_protocol = QKD(n_bits)
secure_key = qkd_protocol.run_qkd_protocol()

print("Shared secure key:", secure_key)
```

> This classification reflects the diversity and depth of the field of cryptography, showing how its different techniques are applied to protect information in various contexts. From message encryption to the security of online transactions and user authentication, cryptography is essential for security in the digital world.

---

&nbsp;

> Later I will show how these encryptions are broken and why md5 is very bad to use.
> In another entry we will review how AES encryption works.

&nbsp;

- 💜 Access to the [--> Blog](https://aiskoa.vercel.app/es/blog/)

### Thanks for reading

&nbsp;

### Sources

- 🔖 [Ko±cielny, C. (2005). AES with the increased confidentiality. Quasigroups and Related Systems, 13, 265-268.](http://www.quasigroups.eu/contents/download/2005/13_20.pdf)
- 🔖 [Escobar Benet, M. (2015). Public and private key cryptography. RSA.](https://core.ac.uk/download/pdf/61462589.pdf)
- 🔖 [Dasso, A. (2017). RSA key length vs. computational power. In XIX Workshop of Researchers in Computer Science WICC 2017, ITBA, Buenos Aires](https://sedici.unlp.edu.ar/handle/10915/62720)
---
title: "[🇪🇸] Fundamentos Ciberseguridad 3"
excerpt: "Exploraremos la Criptografia 🔑!"
date: "Nov 15 2024"
cover_image: "/blog/cibersec.webp"
alt: "Cibersec 3"
tags1: "Helpdesk"
tags2: "Hacking"
---

# Fundamentos Ciberseguridad (Parte 3)

&nbsp;

> 🚨 ADVERTENCIA 🚨: Esta será una de las entradas más largas y un tanto avanzadas, recomiendo leer detenidamente y si pondrá en practica algo aqui visto deberá hacerlo bajo su propio riesgo.
> *Difficulty Level: ⭐⭐⭐*

Te recomiendo ir al CheatSheet para una versión mas dinamica y divertida de aprender estos terminos.
[Click para encontrar el CheatSheet Completo](https://rawier.gitbook.io/glosario-de-hacking-ciberseguridad-y-redes/)

&nbsp;

## ¿Qué es la Criptografia? 🔑

**CRIPTOGRAFIA**: Es el arte de representar información mediante simbolos y sistemas de codificación para transmitir la información de manera segura y confiable.
¿Cual es su uso?: Cifrar confidenciales o privados para mantenerlos seguros ante cualquier tipo de ataque y para cumplir la normativa de seguridad de la información, (aunque esto no siempre es infalible).

## Ejemplos en tu dia a dia

- 🏠 Al ingresar a tu red social favorita con tu contraseña.
- 🏠 Al desbloquear tu celular.
- 🏠 Al mandar un mensaje de whatsapp a tu pareja.
- 🏠 Al escuchar a un taxista hablar con otro en codigo ejemplo: 10-4, 7-40, etc.

&nbsp;

## 1. Criptografía Simétrica

- 💫 **Características**: En la criptografía simétrica, se utiliza la misma clave para cifrar y descifrar un mensaje. Esto requiere que ambas partes compartan la clave de forma segura antes de su uso. Es más rápida en comparación con la criptografía asimétrica y se utiliza para cifrar grandes volúmenes de datos.
- 💫 **Aplicaciones**: Se usa comúnmente para el cifrado de archivos (por ejemplo, en sistemas de almacenamiento en la nube), en bases de datos para proteger datos sensibles y en redes privadas virtuales (VPN) para asegurar la transmisión de datos, en resumen, grandes volumenes de datos.

### Ejemplos de Criptografía Simétrica

| Nombre | Descripción |
| --|--|
| 🐦 **AES** | (Advanced Encryption Standard) Es un estándar ampliamente utilizado por su eficacia y seguridad, Algunos Softwares que lo usan son [Encrypto](https://macpaw.com/encrypto), [GIE](https://github.com/Rawierdt/GIE-UI), [PassPai](https://rawierdt.github.io/PassPai/) |
| 🐦 **DES** | (Data Encryption Standard) Es un algoritmo más antiguo que ha sido reemplazado en gran medida por AES. |
| 🐦 **Blowfish** | Es un algoritmo de cifrado de bloque que es rápido y eficiente para datos de tamaño variable muy usado en WooCommerce. |

&nbsp;

### Código de Ejemplo de Criptografía Simétrica

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

Este fragmento de código TypeScript define una función llamada `cipher` que realiza el cifrado utilizando el algoritmo Advanced Encryption Standard (AES).

La función recibe los siguientes parámetros:

- `password`: Una cadena que representa la contraseña utilizada para cifrar los datos.
- `salt`: Una cadena que representa la sal utilizada en el proceso de cifrado.
- `size`: Un número que representa el tamaño de la clave (128, 192 o 256).
- `input`: Un objeto `PathLike` que representa la ruta del fichero a cifrar.
- salida`: Un objeto`PathLike` que representa la ruta al fichero de salida cifrado.

Dentro de la función, crea un cifrado utilizando el método `createCipheriv` del módulo `crypto`. Especifica el algoritmo de cifrado como `aes-{size}-cbc`, donde `{size}` es el valor del parámetro `size`. También genera una clave utilizando el método `scryptSync`, pasando la `password`, `salt`, y `size / 8` como argumentos.

A continuación, la función utiliza el método `pipeline` para leer el contenido del fichero de entrada, encriptar lo utilizando el cifrado, y escribir el resultado encriptado en el fichero de salida. Si se produce un error durante el proceso de cifrado, lanza el error.

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

Esto descifra el contenido del anterior codigo.

&nbsp;

## 2. Criptografía Asimétrica ó de Clave Pública

- 💫 **Características**: También conocida como criptografía de clave pública, utiliza un par de claves: una pública y una privada. La clave pública se puede compartir abiertamente, mientras que la clave privada se mantiene en secreto. Esta técnica permite tanto el cifrado como la firma digital de mensajes.
- 💫 **Aplicaciones**: Es fundamental para la creación de firmas digitales, el establecimiento de sesiones seguras en Internet (como en SSL/TLS para sitios web seguros), y en sistemas de correo electrónico cifrado, Este método es esencial para establecer conexiones seguras en internet, como en el protocolo HTTPS.

### Ejemplos de Criptografía Asimétrica

| Nombre | Descripción |
| --|--|
| 🐦 **RSA** | (Rivest-Shamir-Adleman) Es uno de los primeros sistemas de criptografía asimétrica, utilizado para cifrado y firma digital. |
| 🐦 **DSA** | (Digital Signature Algorithm) Utilizado principalmente para la creación de firmas digitales. |
| 🐦 **ECC** | (Elliptic Curve Cryptography) Ofrece la misma seguridad que RSA pero con claves más cortas, lo que lo hace más eficiente, Algunos Softwares que lo usan son [GIE](https://github.com/Rawierdt/GIE-UI). |

&nbsp;

### Código de Ejemplo de Criptografía Asimétrica

```jsx
// Importa módulos necesarios
import * as crypto from "crypto";
import { PathLike, mkdirSync, writeFileSync } from "fs";
import { join } from "path";

// Función para generar un par de claves RSA o RSA-PSS
const keygen = (
  // Tipo de clave a generar ("rsa" o "rsa-pss")
  type: "rsa" | "rsa-pss",
  // Tamaño de cifrado para la clave privada (128, 192 o 256 bits)
  size: 128 | 192 | 256,
  // Frase de contraseña para proteger la clave privada
  passphrase: string,
  // Formato de salida de las claves ("pem" o "der")
  format: "pem" | "der",
  // Longitud del módulo para la clave (2048, 3072 o 4096 bits)
  modulusLength: 2048 | 3072 | 4096
  // Define las opciones de generación de claves según el tipo
) => {
  switch (type) {
    case "rsa": {
      // Opciones para claves RSA
      const options: crypto.RSAKeyPairOptions<
        crypto.KeyFormat,
        crypto.KeyFormat
      > = {
        modulusLength, // Longitud del módulo
        publicKeyEncoding: {
          type: "spki", // Formato estándar para clave pública
          format, // Formato de salida
        },
        privateKeyEncoding: {
          type: "pkcs8", // Formato estándar para clave privada
          format, // Formato de salida
          cipher: `aes-${size}-cbc`, // Algoritmo de cifrado para la clave privada
          passphrase, // Frase de contraseña
        },
      };
      return crypto.generateKeyPairSync("rsa", options); // Genera el par de claves
    }
    case "rsa-pss": {
      // Opciones para claves RSA-PSS (similar a RSA pero con firma PSS)
      const options: crypto.RSAPSSKeyPairOptions<
        crypto.KeyFormat,
        crypto.KeyFormat
      > = {
        modulusLength, // Longitud del módulo
        publicKeyEncoding: {
          type: "spki", // Formato estándar para clave pública
          format, // Formato de salida
        },
        privateKeyEncoding: {
          type: "pkcs8", // Formato estándar para clave privada
          format, // Formato de salida
          cipher: `aes-${size}-cbc`, // Algoritmo de cifrado para la clave privada
          passphrase, // Frase de contraseña
        },
      };
      return crypto.generateKeyPairSync("rsa-pss", options);  // Genera el par de claves
    }
  }
};

// Función para crear un par de claves y guardarlas en archivos
const keypair = (
  type: "rsa" | "rsa-pss",
  size: 128 | 192 | 256,
  passphrase: string,
  outDir: string,
  outFormat: "pem" | "der",
  modulusLength: 2048 | 3072 | 4096
) => {
  // Genera el par de claves usando la función keygen
  const { publicKey, privateKey } = keygen(
    type,
    size,
    passphrase,
    outFormat,
    modulusLength
  );
  // Crea la carpeta de salida si no existe
  mkdirSync(outDir, { recursive: true });
  // Guarda la clave pública en un archivo
  writeFileSync(join(outDir, `public.${outFormat}`), publicKey.toString());
  // Guarda la clave privada en un archivo (cifrada con la frase de contraseña)
  writeFileSync(join(outDir, `private.${outFormat}`), privateKey.toString());
};

// Exporta la función keypair para usarla en otros módulos
export default keypair;

```

El código anterior es una función TypeScript llamada `keygen` que genera un par de claves RSA o RSA-PSS. Toma cinco parámetros:

- `type`: el tipo de clave a generar, ya sea «rsa» o «rsa-pss».
- `size`: el tamaño de cifrado de la clave privada (128, 192 o 256 bits)
- Frase de contraseña: contraseña para proteger la clave privada.
- `format`: el formato de salida de las claves («pem» o «der»)
- `modulusLength`: la longitud del módulo de la clave (2048, 3072 o 4096 bits)

La función utiliza una sentencia `switch` para determinar qué tipo de clave generar, y luego crea un objeto options con los parámetros especificados. Luego llama a la función `crypto.generateKeyPairSync` para generar el par de claves, pasando el objeto options.

En resumen, esta función genera un par de claves RSA o RSA-PSS con tamaño de cifrado, protección por contraseña, formato de salida y longitud de módulo personalizables.

&nbsp;

## 3. Hash Criptográfico

- 💫 **Características**: Los hash criptográficos son algoritmos que toman un input de cualquier tamaño y producen un output de tamaño fijo, conocido como hash. Estos son unidireccionales, lo que significa que a partir del hash no se puede obtener el mensaje original. Además, una pequeña modificación en el input produce un hash completamente diferente.
- 💫 **Aplicaciones**: Se utilizan para verificar la integridad de los datos, en la autenticación de contraseñas (almacenando el hash de la contraseña en lugar de la contraseña misma), y en la tecnología blockchain para asegurar la integridad de la cadena de bloques.

### Ejemplos de Hash Criptográfico

| Nombre | Descripción |
| --|--|
| 🐦 **SHA-256** | (Secure Hash Algorithm 256 bits) Parte de la familia SHA-2, ampliamente utilizada en aplicaciones como Bitcoin. |
| 🐦 **MD5** | (Message-Digest Algorithm 5) Aunque es rápido, ya no se recomienda debido a vulnerabilidades encontradas. |
| 🐦 **Whirlpool** | Un algoritmo hash que produce un hash de 512 bits. |

&nbsp;

### Código de Ejemplo de Hash Criptográfico

```jsx
import * as crypto from 'crypto';
import { PathLike, readFileSync } from 'fs';

const hash = (algorithm: string, encoding: crypto.BinaryToTextEncoding, input: PathLike) => {
  return crypto.createHash(algorithm).update(readFileSync(input)).digest(encoding); 
};

export default hash;

```

Esta es una función TypeScript llamada `hash` que genera un valor hash para un archivo dado. Toma tres parámetros:

- `algorithm`: el algoritmo hash a utilizar (por ejemplo «sha256», «md5», etc.)
- `encoding`: la codificación a utilizar para el valor hash resultante (p.ej. «hex», «base64», etc.)
- `input`: el archivo para el que se generará el hash

La función utiliza el módulo `crypto` para crear un objeto hash, lo actualiza con el contenido del fichero de entrada y devuelve el valor hash en la codificación especificada.

&nbsp;

## 4. Criptografía de Curva Elíptica

- 💫 **Características**: Basada en la aritmética de curvas elípticas sobre campos finitos, ofrece un alto nivel de seguridad con claves más cortas en comparación con la criptografía asimétrica tradicional. Esto se traduce en operaciones más rápidas y menor uso de recursos.
- 💫 **Aplicaciones**: Es ampliamente utilizada en aplicaciones móviles y dispositivos con recursos limitados. También es fundamental en la creación de criptomonedas, como Bitcoin y Ethereum, para asegurar las transacciones y gestionar las claves privadas.

### Ejemplos de Curva Elíptica

| Nombre | Descripción |
| --|--|
| 🐦 **ECDSA** | (Elliptic Curve Digital Signature Algorithm) Utilizado para crear firmas digitales. |
| 🐦 **ECDH** | (Elliptic Curve Diffie-Hellman) Un método para intercambiar claves secretas. |

&nbsp;

### Código de Ejemplo de Curva Elíptica

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
    # Genera un par de claves ECDH.
    private_key = X25519PrivateKey.generate()
    public_key = private_key.public_key()
    return private_key, public_key


def derive_key(private_key, public_key):
    # Obtención de una clave compartida mediante ECDH
    shared_key = private_key.exchange(public_key)
    return shared_key


def fibonacci_sequence(n):
    # Generar una sucesión de Fibonacci hasta el enésimo término.
    sequence = [0, 1]
    while len(sequence) < n:
        sequence.append(sequence[-1] + sequence[-2])
    return sequence


def xor_encrypt(data, key):
    # XOR a los datos con la llave.
    return bytes([b ^ key[i % len(key)] for i, b in enumerate(data)])


def encrypt(plaintext, public_key):
    # Cifrar el texto plano utilizando la clave pública y una secuencia de Fibonacci.
    # Genera una llave asimetrica de manera aletoeria
    symmetric_key = os.urandom(32)

    # Se Obtiene la clave compartida mediante ECDH
    private_key, _ = generate_key_pair()  # Genera una clave privada temporal
    shared_key = derive_key(private_key, public_key)

    # Genera una clave fibonacci basada en la longitud del texto plano
    fib_sequence = fibonacci_sequence(len(plaintext))

    # Ajusta la longitud de la clave combinada para coincidir con el texto plano
    combined_key = bytes(
        [shared_key[i % len(shared_key)] ^ fib_sequence[i % len(fib_sequence)] for i in range(len(plaintext))])

    # Encripta el texto plano con la clave combinada
    encrypted_text = xor_encrypt(plaintext.encode(), combined_key)

    return encrypted_text, private_key  # Retorna temporalmente la clave privada


def decrypt(encrypted_text, private_key, public_key):
    """Descifra el texto cifrado utilizando la clave privada y la clave pública."""
    # Se Obtiene la clave compartida mediante ECDH
    shared_key = derive_key(private_key, public_key)

    # Generar una secuencia de Fibonacci basada en la longitud del texto cifrado
    fib_sequence = fibonacci_sequence(len(encrypted_text))

    # Ajusta la longitud de la clave combinada para que coincida con el texto cifrado
    combined_key = bytes(
        [shared_key[i % len(shared_key)] ^ fib_sequence[i % len(fib_sequence)] for i in range(len(encrypted_text))])

    # Descifra el texto cifrado con la clave combinada
    decrypted_text = xor_encrypt(encrypted_text, combined_key)

    return decrypted_text.decode(errors='ignore')  # Ignora los errores durante la decodificación


print("Enter a password to encrypt")

passwd = input(": ")

# Ejemplo de uso
# Frase: --
plaintext = passwd
private_key, public_key = generate_key_pair()
encrypted_text, temp_private_key = encrypt(plaintext, public_key)
print(f"Encrypted: {encrypted_text}")

decrypted_text = decrypt(encrypted_text, temp_private_key, public_key)
print(f"Decrypted: {decrypted_text}")

```

El código anterior fue escrito en Python usando tecnicas de calculo utilizando la criptografía de curva elíptica (concretamente, la curva X25519).

Instala las dependencias y asegurate de instalar la libreria cryptography correctamente.

Ejemplo: **Ingresamos la palabra** : **Hello**

### Proceso de generación de claves

1. **Clave privada**: Es un valor generado aleatoriamente que se mantiene en secreto. Se genera utilizando el método `X25519PrivateKey.generate()`.
2. **Clave pública**: Se deriva de la clave privada y puede compartirse abiertamente. Se calcula como parte del proceso de generación del par de claves.

### Ejemplo de generación de claves

1. **Ejecute la función `generate_key_pair()`** para crear una clave privada y una clave pública.
2. La clave privada es un valor binario que no está destinado a ser compartido.
3. La clave pública se deriva de la clave privada y puede ser compartida con otros.

### Ejemplo de salida

Si ejecutara el programa, podría ver un resultado similar a éste *(los valores reales serán diferentes cada vez debido a la aleatoriedad)*:

- **Private Key (Clave privada)**: `b'\x1a\x2b\x3c\x4d\x5e\x6f\...'`
- **Public Key (Clave pública)**: `b'\x9a\x8b\x7c\x6d\x5e\x4f\...'`

### Nota importante

Las claves pública y privada no se derivan de la entrada «Hola», sino que se generan de forma independiente. La entrada sólo se utiliza para los procesos de cifrado y descifrado después de que se hayan generado las claves.

&nbsp;

## 5. Criptografía Cuántica

- 💫 **Características**: Aprovecha los principios de la mecánica cuántica, como el entrelazamiento cuántico y la incertidumbre, para crear sistemas de comunicación que no pueden ser interceptados sin ser detectados. Ofrece una seguridad teóricamente incondicional.
- 💫 **Aplicaciones**: Aunque todavía está en las primeras fases de desarrollo e implementación, tiene el potencial de revolucionar la seguridad en comunicaciones sensibles y en la protección contra las amenazas de la computación cuántica a la criptografía tradicional.

### Ejemplos de criptografía Cuántica

| Nombre | Descripción |
| --|--|
| 🐦 **QKD** | (Quantum Key Distribution) Permite a dos partes generar una clave secreta compartida utilizando partículas cuánticas. Si un tercero intenta interceptar la clave, esto alterará el estado cuántico y será detectable. |

Esto esta aun en desarrollo, pero la idea principal de la criptografía cuántica promete revolucionar la seguridad informática al ofrecer métodos que son teóricamente invulnerables a ataques futuros basados en computadoras cuántica

### Código de Ejemplo de criptografía Cuántica

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
        # Alice genera bits aleatorios y bases
        for _ in range(self.n_bits):
            self.alice_bits.append(random.randint(0, 1))  # Bit aleatorio (0 ó 1)
            self.bases_alice.append(random.choice(['H', 'V']))  # Base aleatoria (horizontal o vertical)

    def simulate_bob_measurement(self):
        # Bob elige aleatoriamente bases para medir los bits de Alice
        for _ in range(self.n_bits):
            self.bases_bob.append(random.choice(['H', 'V']))
            # Simular la medición (si las bases coinciden, se lleva el bit)
            if self.bases_alice[_] == self.bases_bob[_]:
                self.bob_bits.append(self.alice_bits[_])
            else:
                self.bob_bits.append(None)  # Ningún bit si las bases no coinciden

    def sift_key(self):
        # Tamizar la clave en función de las bases coincidentes
        for i in range(self.n_bits):
            if self.bases_alice[i] == self.bases_bob[i]:
                self.shared_key.append(self.alice_bits[i])

    def run_qkd_protocol(self):
        self.generate_bits_and_bases()
        self.simulate_bob_measurement()
        self.sift_key()
        
        return self.shared_key

# Ejemplo de uso
n_bits = 10  # Número de bits a intercambiar
qkd_protocol = QKD(n_bits)
secure_key = qkd_protocol.run_qkd_protocol()

print("Shared secure key:", secure_key)
```

> Esta clasificación refleja la diversidad y profundidad del campo de la criptografía, mostrando cómo sus distintas técnicas se aplican para proteger la información en variados contextos. Desde el cifrado de mensajes hasta la seguridad de las transacciones en línea y la autenticación de usuarios, la criptografía es fundamental para la seguridad en el mundo digital.

---

&nbsp;

> Mas adelante mostraré como se rompen estos cifrados y porque mmd5 es muy malo para usar.
> En otra entrada revisaremos como funciona el cifrado AES.

&nbsp;

- 💜 Acceso al [--> Blog](https://rawier.vercel.app/es/blog/)

### Gracias por leer

&nbsp;

### Fuentes de consulta

- 🔖 [Ko±cielny, C. (2005). AES with the increased confidentiality. Quasigroups and Related Systems, 13, 265-268.](http://www.quasigroups.eu/contents/download/2005/13_20.pdf)
- 🔖 [Escobar Benet, M. (2015). Criptografía en clave pública y privada. RSA.](https://core.ac.uk/download/pdf/61462589.pdf)
- 🔖 [Dasso, A. (2017). Longitud de la clave RSA vs poder computacional. In XIX Workshop de Investigadores en Ciencias de la Computación WICC 2017, ITBA, Buenos Aires](https://sedici.unlp.edu.ar/handle/10915/62720)
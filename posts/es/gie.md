---
title: "GIE Cifrar y Descifrar archivos"
excerpt: "¡Un cifrador y descifrador para archivos y carpetas!"
date: "Apr 10 2024"
cover_image: "/blog/giew.webp"
alt: "GIE"
tags1: "Python"
tags2: "Tools"
---

![imageTitle](https://raw.githubusercontent.com/aiskoadt/GIE/main/title.jpg)

[![Static Badge](https://img.shields.io/badge/%20build-MIT-brightgreen?logo=github&label=LICENSE)](https://github.com/aiskoadt/GIE/LICENSE)
![Static Badge](https://img.shields.io/badge/APRIL%202024-red?label=RELEASE%20DATE)
![Static Badge](https://img.shields.io/badge/LANGUAGE-Python-yellow?logo=python)

# GIE

## Cifrar y Descifrar

Un cifrador y descifrador para archivos y carpetas para Windows, escrito en Python usando AES.

> [!CAUTION]
> Descargo de responsabilidad: Esta herramienta fue creada solo con fines educativos. No me hago responsable del mal uso de esta herramienta.

![aCreator](https://i.ibb.co/q92xdX2/gie-terminal.gif)

## Versión

**GIE V3.0**

### Características

Cifra y descifra tus archivos y carpetas con AES, para cualquier archivo, jpg, png, mp4, mp3, docx, pdf, etc...

**IMPORTANTE LEER TODO**

## 📦 Requisitos

**[Python3](https://www.python.org/downloads/)**

**[Colorama](https://pypi.org/project/colorama/)**

**Subprocess**

**Hashlib**

**Cryptography**

## 💻 Instalación

Ejecuta los comandos según tu caso (Win o Linux)

`pyhon` para windows

Clona o descarga este repositorio

```batch
git clone git@github.com:aiskoadt/GIE.git
```

Cambia de directorio

```batch
cd GIE
```

Ejecuta el archivo setup.py

```batch
python setup.py
```

O instala las dependencias manualmente

Ejecuta el proyecto

```batch
python gie.py -h
```

---

## Para Cifrar

Ejecuta `-h` para imprimir la ayuda/uso

```batch
python gie.py -h
```

Para **Cifrar** una carpeta o archivo

* ! La ruta debe estar entre comillas " "

Para carpetas

```batch
python gie.py "C:\TU\CARPETA"
```

Solo para archivos

```batch
python gie.py "C:\TUS\ARCHIVOS.extension"
```

extension = jpg, png, mp3, mp4, docx, etc, etc...

* ! Aparecerá un mensaje que dice: "Introduce una contraseña:"

! NOTA: **La contraseña no puede contener los caracteres $ y "**

Ejemplo de salida:
`python gie.py "D:\Sam\Plugins\IP.exe"`
`Introduce una contraseña:`

Nota: La contraseña no será visible mientras la escribes

Una vez introducida la contraseña, comenzará a cifrar los archivos con la extensión **".gie"** y generará un archivo **".GKY"**, que es muy importante para descifrar tu archivo original.

*"GKY" es la extensión del archivo que contiene la clave para el descifrado, junto con la contraseña proporcionada.*

! *Si quieres compartir el archivo con tu colega, tendrás que proporcionarle tres archivos, el .gie, el .GKY y la contraseña.*

## Para Descifrar

Para **Descifrar** una carpeta o archivo

* ! La ruta y la contraseña deben estar entre comillas " "

Ejecuta `-d` para descifrar
Ejecuta `-p` para establecer la contraseña utilizada anteriormente

Para carpetas

```batch
python gie.py -p "CONTRASEÑA" -d "C:\TU\CARPETA"
```

Solo para archivos

```batch
python gie.py -p "CONTRASEÑA" -d "C:\TUS\ARCHIVOS.extension.gie"
```

---

Ejemplo de salida:
`python gie.py -p "L1ñy*8Cv" -d "D:\Sam\Plugins\IP.exe"`

El programa buscará si el archivo .GKY existe en la ruta proporcionada e intentará descifrar el archivo con la contraseña, si la contraseña no coincide, el archivo no se descifrará o se descifrará corrupto, si el GKY no existe, el programa mostrará un mensaje de error y no podrá descifrar.

Es muy importante guardar muy bien el .GKY y la CONTRASEÑA.

---

### Función de Cifrado

```python
def encrypt_file(input_file: str, password: str):
    password_bytes = password.encode()  # Convertir la contraseña a bytes
    key_with_salt = generate_key(input_file, password_bytes)  # Generar la clave utilizando bytes
    if key_with_salt is None:
        print(Fore.RED + "No se pudo generar la clave." + Style.RESET_ALL)
        return

    key = key_with_salt[16:]  # Obtener la clave sin la sal

    iv = os.urandom(16)

    cipher = Cipher(algorithms.AES(key), modes.CBC(iv), backend=default_backend())
    encryptor = cipher.encryptor()

    with open(input_file, "rb") as file_in:
        data = file_in.read()

    padded_data = data + b'\x00' * (-len(data) % 16)
    encrypted_data = encryptor.update(padded_data) + encryptor.finalize()

    output_file = input_file + ".gie"
    with open(output_file, "wb") as file_out:
        file_out.write(iv)
        file_out.write(encrypted_data)

    print(Fore.LIGHTMAGENTA_EX + f"Archivo ENCRIPTADO guardado como: {output_file}" + Style.RESET_ALL)
    os.remove(input_file)
```

### Función de Descifrado

```python
def decrypt_file(input_file: str, password: bytes):
    base_file = os.path.splitext(os.path.basename(input_file))[0]  # Eliminar todas las extensiones
    while "." in base_file:
        base_file = os.path.splitext(base_file)[0]  # Eliminar todas las extensiones
        # Añadir la extensión .key al nombre del archivo base
    key_file = os.path.join(os.path.dirname(input_file), base_file + ".GKY")
    print(f"Buscando el archivo de la clave: {key_file}")  # Imprimir el nombre del archivo de clave que estamos buscando
    if os.path.exists(key_file):
        with open(key_file, "rb") as f:
            key_with_salt = f.read()
            salt = key_with_salt[:16]  # Obtener la sal almacenada
            derived_key = hashlib.pbkdf2_hmac('sha256', password, salt, 100000, 32)
            # print("La clave se recuperó con éxito.")
            # print(f"Longitud de la clave: {len(derived_key)}")
            # print(f"Longitud del salt: {len(salt)}")

        with open(input_file, "rb") as file_in:
            iv = file_in.read(16)
            encrypted_data = file_in.read()

        cipher = Cipher(algorithms.AES(derived_key), modes.CBC(iv), backend=default_backend())
        decryptor = cipher.decryptor()

        decrypted_data = decryptor.update(encrypted_data) + decryptor.finalize()
        unpadded_data = decrypted_data.rstrip(b'\x00')

        output_file = os.path.splitext(input_file)[0]
        with open(output_file, "wb") as file_out:
            file_out.write(unpadded_data)

        print(Fore.LIGHTCYAN_EX + f"Archivo DESENCRIPTADO guardado como: {output_file}" + Style.RESET_ALL)
        os.remove(input_file)

        # Eliminar el archivo de clave después del descifrado exitoso
        os.remove(key_file)
        # print(f"Archivo de la clave {key_file} eliminado con éxito.")

    else:
        print(Fore.LIGHTRED_EX + "No se encontró la clave." + Style.RESET_ALL)

```

---

### Lista de Tareas

* [ ] Comprobación de contraseña

* [x] AES

* [ ] Menú de interfaz de usuario

### 🤝 Contribuyendo

¡Las contribuciones, los problemas y las solicitudes de características son bienvenidos! Siéntete libre de consultar la página de problemas.

### ❤️ Muestra tu apoyo

¡Da una ⭐️ si este proyecto te ayudó!

### 📝 Licencia

Copyright © 2024 [aiskoa](https://aiskoa.vercel.app). Este proyecto tiene licencia [MIT](/LICENSE).
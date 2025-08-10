---
title: "GIE-UI Cifrar y Descifrar archivos"
excerpt: "¡Un cifrador y descifrador para archivos y carpetas con interfaz de usuario!"
date: "Apr 29 2024"
cover_image: "/blog/gieui.webp"
alt: "GIE-UI"
tags1: "Python"
tags2: "Tools"
---

![imageTitle](https://raw.githubusercontent.com/aiskoa-UI/main/img/title.png)

# GIE-UI

## GIE ahora con Interfaz de Usuario || Cifrar y Descifrar Archivos

Un cifrador y descifrador de archivos usando AES, de forma fácil y para carpetas, y envíalo de forma segura, escrito en Python con interfaz de usuario.

![Screenshott](https://i.imgur.com/NC2A0HT.jpeg)

### Características

Cifra y descifra tus archivos y carpetas con AES, para cualquier archivo, jpg, png, mp4, mp3, docx, pdf, etc...

### ¿Por qué GIE?

GIE es el nombre de mi primera novia (es broma 😂), GIE es el acrónimo de cifrado de archivos **G**entil, **I**nteligente y **F**ácil.

## 📦 Requisitos

- **[Python](https://www.python.org/downloads/)**, debería estar instalado en tu sistema (no es necesario).

### 🦠 Anuncio de Antivirus

GIE tiene la capacidad de cifrar rutas y archivos vitales en tu sistema, por lo que es considerado un riesgo por el sistema operativo. Si aún así decides usarlo, deberías crear una excepción para el programa GIE.

[Análisis de Virustotal](https://www.virustotal.com/gui/file/49a6c879bb46ad0f357a545f6f6577bb418c7f210cac60556f45051a9473851b/detection)

[Triage](https://tria.ge/240428-bnst8acg68)

## 💻 Instalación

Ejecuta los comandos según tu caso

Ejecuta el proyecto

```batch
python main.py
```

Ejecuta el archivo **GIE.exe**.
*(La versión portable de GIE está disponible)*

---

## Para Cifrar

Para **Cifrar** una carpeta o archivo

Para carpetas (_debes escribir la ruta tal como aparece en tu explorador de archivos_)

![PATH](https://i.imgur.com/Lah8Ri8.png)

Solo para archivos (_uno o más archivos_)

Solo selecciona los archivos a cifrar.

soporta = jpg, png, mp3, mp4, docx, xlsx, sql, py, zip, etc...

**Introduce una contraseña:**

**IMPORTANTE**

> La contraseña no puede contener los caracteres $ o "" y ''
> La contraseña no será visible mientras la escribes.

Cuando hagas clic en el botón Cifrar, la operación comenzará., comenzará a cifrar los archivos con la extensión **".gie"** y generará un archivo **".GKY"**, que es muy importante para descifrar tu archivo original.

*"GKY" es la extensión del archivo que contiene la clave para el descifrado, junto con la contraseña proporcionada.*

! *Si quieres compartir el archivo con tu colega, tendrás que proporcionarle tres archivos, el .gie, el .GKY y la contraseña.*

**EJEMPLO**

![FileEn](https://i.imgur.com/pGLWaxL.jpeg)


## Para Descifrar

Para **Descifrar** una carpeta o archivo

**IMPORTANTE**  
> La contraseña debe ser la misma que la utilizada para cifrar el archivo, de lo contrario perderás tu archivo para siempre.

El programa buscará si el archivo .GKY existe en la ruta proporcionada e intentará descifrar el archivo con la contraseña, si la contraseña no coincide, el archivo no se descifrará o se descifrará corrupto, si el GKY no existe, el programa mostrará un mensaje de error y no podrá descifrar.

Es muy importante guardar muy bien el .GKY y la CONTRASEÑA.

---

### FUNCIÓN DE CIFRADO

```python
def encrypt_file(input_file: str, password: str):
    password_bytes = password.encode()  
    # Convertir la contraseña a bytes

    key_with_salt = generate_key(input_file, password_bytes)  # Generar la clave usando bytes
    if key_with_salt is None:
        print(Fore.RED + "No se pudo generar la clave." + Style.RESET_ALL)
        return

    key = key_with_salt[16:]  # Obteniendo la clave sin la sal

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

### FUNCIÓN DE DESCIFRADO

```python
def decrypt_file(input_file: str, password: bytes):
    base_file = os.path.splitext(os.path.basename(input_file))[0]  # Eliminar todas las extensiones
    while "." in base_file:
        base_file = os.path.splitext(base_file)[0]  # Eliminar todas las extensiones
    # Añadir la extensión .key al nombre del archivo base
    key_file = os.path.join(os.path.dirname(input_file), base_file + ".GKY")
    key_file = os.path.normpath(key_file)  # Normalizar la ruta

    print(f"Buscando el archivo de la clave: {key_file}")  # Imprimir el nombre del archivo de clave que estamos buscando
    if os.path.exists(key_file):
        with open(key_file, "rb") as f:
            key_with_salt = f.read()
            salt = key_with_salt[:16]  # Obtener la sal almacenada
            derived_key = hashlib.pbkdf2_hmac('sha256', password, salt, 100000, 32)
```

> .GKY se usa para descifrar el archivo porque es la clave de paso, el nombre de la extensión .GKY no se puede cambiar.

```python
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
```

```python
        # Eliminar el archivo de clave después del descifrado exitoso
        os.remove(key_file)
    else:
        print(Fore.LIGHTRED_EX + "Clave no encontrada." + Style.RESET_ALL)
```

> Si el archivo GKY no se elimina después del descifrado, es posible que genere basura en tu sistema o incluso problemas con otros archivos cifrados.

---

### [⬇️ Descargar ⬇️](https://aiskoahub.io/scripts/GIE/)

### 🤝 Contribuyendo

¡Las contribuciones, los problemas y las solicitudes de características son bienvenidos! Siéntete libre de consultar la página de problemas.

### 💜 Muestra tu apoyo

¡Da una ⭐️ si este proyecto te ayudó! 

### 📝 Licencia

Copyright © 2024 [aiskoa](https://aiskoa.vercel.app). Este proyecto tiene licencia [MIT](/LICENSE).

---
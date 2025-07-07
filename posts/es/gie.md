---
title: "[🇺🇸] GIE Encrypt and Decrypt files"
excerpt: "An Encrypt and Decrypt for files and folders!"
date: "Apr 10 2024"
cover_image: "/blog/giew.webp"
alt: "GIE"
tags1: "Python"
tags2: "Tools"
---

![imageTitle](https://raw.githubusercontent.com/Rawierdt/GIE/main/title.jpg)

[![Static Badge](https://img.shields.io/badge/%20build-MIT-brightgreen?logo=github&label=LICENSE)](https://github.com/Rawierdt/GIE/LICENSE)
![Static Badge](https://img.shields.io/badge/APRIL%202024-red?label=RELEASE%20DATE)
![Static Badge](https://img.shields.io/badge/LANGUAGE-Python-yellow?logo=python)

# GIE

## Encrypt and Decrypt

An Encrypt and Decrypt for files and folders for Windows, written in Python using AES.

> [!CAUTION]
> Disclaimer: This tool was created for educational purposes only. I do not take any responsibility for the misuse of this tool.

![aCreator](https://i.ibb.co/q92xdX2/gie-terminal.gif)

## Version

**GIE V3.0**

### Features

Encrypt and decrypt your files and folders with AES, for any file, jpg, png, mp4, mp3, docx, pdf, etc...

**IMPORTANT TO READ ALL**

## 📦 Requirements

**[Python3](https://www.python.org/downloads/)**

**[Colorama](https://pypi.org/project/colorama/)**

**Subprocess**

**Hashlib**

**Cryptography**

## 💻 Installation

Execute the commands according to your case (Win or Linux)

`pyhon` for windows

Clone or Download this Repository

```batch
git clone git@github.com:Rawierdt/GIE.git
```

Change Directory

```batch
cd GIE
```

Run the setup.py file

```batch
python setup.py
```

OR install the dependencies manually

Run the project

```batch
python gie.py -h
```

---

## For Encrypt

Run `-h` for print the help/usage

```batch
python gie.py -h
```

To **Encrypt** a folder or file

* ! The path must be enclosed in quotes " "

For folders

```batch
python gie.py "C:\YOUR\FOLDER"
```

For only files

```batch
python gie.py "C:\YOUR\FILES.extension"
```

extension = jpg, png, mp3, mp4, docx, etc, etc...

* ! A message will appear that says: "Enter a password:"

! NOTE: **The password cannot contain the characters $ and "**

Example Output:
`python gie.py "D:\Sam\Plugins\IP.exe"`
`Enter a password:`

Note: The password will not be visible while you type it

Once the password is entered, it will start encrypting the files with the extension **".gie"** and will generate a **".GKY"** file, which is very important to decrypt your original file.

*"GKY" is the extension of the file containing the key for decryption, along with the password provided.*

! *If you want to share the file with your colleague, you will need to provide him/her with three files, the .gie, the .GKY and the password.*

## For Decrypt

To **Decrypt** a folder or file

* ! The path and password must be enclosed in quotes " "

Run `-d` for decrypt
Run `-p` for set the password used previously

For folders

```batch
python gie.py -p "PASSWORD" -d "C:\YOUR\FOLDER"
```

For only files

```batch
python gie.py -p "PASSWORD" -d "C:\YOUR\FILES.extension.gie"
```

---

Example Output:
`python gie.py -p "L1ñy*8Cv" -d "D:\Sam\Plugins\IP.exe"`

The program will search if the .GKY file exists in the path provided and will try to decrypt the file with the password, if the password does not match the file will not decrypt or will decrypt corruptly, if the GKY does not exist, the program will throw an error message and will not be able to decrypt.

It is very important to save the .GKY and the PASSWORD very well.

---

### Encrypt function

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

### Decrypt function

```python
def decrypt_file(input_file: str, password: bytes):
    base_file = os.path.splitext(os.path.basename(input_file))[0]  # Remove all extensions
    while "." in base_file:
        base_file = os.path.splitext(base_file)[0]  # Remove all extensions
        # Add the .key extension to the base file name
    key_file = os.path.join(os.path.dirname(input_file), base_file + ".GKY")
    print(f"Buscando el archivo de la clave: {key_file}")  # Print the name of the key file we are looking for
    if os.path.exists(key_file):
        with open(key_file, "rb") as f:
            key_with_salt = f.read()
            salt = key_with_salt[:16]  # Get the stored salt
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
        unpadded_data = decrypted_data.rstrip(b'\\x00')

        output_file = os.path.splitext(input_file)[0]
        with open(output_file, "wb") as file_out:
            file_out.write(unpadded_data)

        print(Fore.LIGHTCYAN_EX + f"Archivo DESENCRIPTADO guardado como: {output_file}" + Style.RESET_ALL)
        os.remove(input_file)

        # Delete the key file after successful decryption
        os.remove(key_file)
        # print(f"Archivo de la clave {key_file} eliminado con éxito.")

    else:
        print(Fore.LIGHTRED_EX + "No se encontró la clave." + Style.RESET_ALL)

```

---

### TODO List

* [ ] Password check

* [x] AES

* [ ] UI Menu

### 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check issues page.

### ❤️ Show your support

Give a ⭐️ if this project helped you!

### 📝 License

Copyright © 2024 [Rawier](https://rawier.vercel.app). This project is [MIT](/LICENSE) licensed.

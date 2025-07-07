---
title: "[🇺🇸] GIE-UI Encrypt and Decrypt files"
excerpt: "An Encrypt and Decrypt for files and folders with UI!"
date: "Apr 29 2024"
cover_image: "/blog/gieui.webp"
alt: "GIE-UI"
tags1: "Python"
tags2: "Tools"
---

![imageTitle](https://raw.githubusercontent.com/Rawierdt/GIE-UI/main/img/title.png)

# GIE-UI

## GIE now with User Interface || Encrypt and Decrypt Files

An Encrypt and Decrypt your files using AES, easily and folders, and send it secure, written in Python with UI.

![Screenshott](https://i.imgur.com/NC2A0HT.jpeg)

### Features

Encrypt and decrypt your files and folders with AES, for any file, jpg, png, mp4, mp3, docx, pdf, etc... 

### Why GIE?

GIE is the name of my first girldfriend (JK 😂), GIE is the acronym of **G**entle, **I**ntelligent and **E**asy file encryption.

## 📦 Requirements

- **[Python](https://www.python.org/downloads/)**, should be installed on your system (not required).

### 🦠 Antivirus advertisement

GIE has the ability to encrypt vital paths and files on your system, so it is considered a risk by the operating system. If you still decide to use it, you should create an exception to the GIE program.

[Virustotal scan](https://www.virustotal.com/gui/file/49a6c879bb46ad0f357a545f6f6577bb418c7f210cac60556f45051a9473851b/detection)

[Triage](https://tria.ge/240428-bnst8acg68)

## 💻 Installation

Execute the commands according to your case

Run the project

```batch
python main.py
```

Excecute **GIE.exe** file.
*(GIE portable version is avaliable)*

---

## For Encrypt

To **Encrypt** a folder or file

For folders (_you must type the path as it appears in your file browser_)

![PATH](https://i.imgur.com/Lah8Ri8.png)

For only files (_one or more files_)

Only select the files to encrypt.

supports = jpg, png, mp3, mp4, docx, xlsx, sql, py, zip, etc...

**Enter a password:**

**IMPORTANT**

> The password cannot contain the characters $ or "" and ''
> The password will not be visible while you type it.

When you click the Encrypt button, the operation will begin., it will start encrypting the files with the extension **".gie"** and will generate a **".GKY"** file, which is very important to decrypt your original file.

*"GKY" is the extension of the file containing the key for decryption, along with the password provided.*

! *If you want to share the file with your colleague, you will need to provide him/her with three files, the .gie, the .GKY and the password.*

**EXAMPLE**

![FileEn](https://i.imgur.com/pGLWaxL.jpeg)


## For Decrypt

To **Decrypt** a folder or file

**IMPORTANT**  
> The password must be the same as the one used to encrypt the file, otherwise you will lose your file forever.

The program will search if the .GKY file exists in the path provided and will try to decrypt the file with the password, if the password does not match the file will not decrypt or will decrypt corruptly, if the GKY does not exist, the program will throw an error message and will not be able to decrypt.

It is very important to save the .GKY and the PASSWORD very well.

---

### ENCRYPT FUNCTION

```python
def encrypt_file(input_file: str, password: str):
    password_bytes = password.encode()  
    # Convert password to bytes

    key_with_salt = generate_key(input_file, password_bytes)  # Generate the key using bytes
    if key_with_salt is None:
        print(Fore.RED + "The key could not be generated." + Style.RESET_ALL)
        return

    key = key_with_salt[16:]  # Getting the key without the salt

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

    print(Fore.LIGHTMAGENTA_EX + f"ENCRYPTED file saved as: {output_file}" + Style.RESET_ALL)
    os.remove(input_file)
```

### DECRYPT FUNCTION

```python
def decrypt_file(input_file: str, password: bytes):
    base_file = os.path.splitext(os.path.basename(input_file))[0]  # Remove all extensions
    while "." in base_file:
        base_file = os.path.splitext(base_file)[0]  # Remove all extensions
    # Add the .key extension to the base file name
    key_file = os.path.join(os.path.dirname(input_file), base_file + ".GKY")
    key_file = os.path.normpath(key_file)  # Normalize the path

    print(f"Searching for the key file: {key_file}")  # Print the name of the key file we are looking for
    if os.path.exists(key_file):
        with open(key_file, "rb") as f:
            key_with_salt = f.read()
            salt = key_with_salt[:16]  # Get the stored salt
            derived_key = hashlib.pbkdf2_hmac('sha256', password, salt, 100000, 32)
```

> .GKY using for decrypt the file coz it is the passkey, .GKY extension name is not enable to change.

```python
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

        print(Fore.LIGHTCYAN_EX + f"UNENCRIPTED file saved as: {output_file}" + Style.RESET_ALL)
        os.remove(input_file)
```

```python
        # Delete the key file after successful decryption
        os.remove(key_file)
    else:
        print(Fore.LIGHTRED_EX + "Key not found." + Style.RESET_ALL)
```

> If the GKY file is not removed after the decryption, it is possible to make trash on your system or even issues with other encrypted files.

---

### [⬇️ Download ⬇️](https://rawierdt.github.io/scripts/GIE/)

### 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check issues page.

### 💜 Show your support

Give a ⭐️ if this _project helped you!_ 

### 📝 License

Copyright © 2024 [Rawier](https://rawier.vercel.app). This project is [MIT](/LICENSE) licensed.

---

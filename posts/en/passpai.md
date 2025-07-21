---
title: "PassPai Local Password Manager"
excerpt: "Secure Password Gen. and Manager using AES!"
date: "Sep 08 2024"
cover_image: "/blog/passpai.webp"
alt: "PassPai"
tags1: "JavaScript"
tags2: "Tools"
---

![imageTitle](https://i.ibb.co/ygJ41Xk/passpaititle.jpg)

# PassPai

## Secure Password Manager

**PassPai** is an open-source password generation and management tool that allows the generation of secure passwords thanks to AES-256 encryption.

![PassPai1](https://i.ibb.co/Q9w0D1t/1.png)

![PassPai2](https://i.ibb.co/gRBFQ3v/passpaiim2.png)

## Website

### [➡️ Go to PassPai](https://aiskoadt.github.io/PassPai/)

## [Code](https://github.com/aiskoadt/PassPai)

## Features

* 🔵 **Password Generation**: Create secure passwords for different social networks. 😄
* 🔵 **Password Management**: Save and view passwords for various accounts.
* 🔵 **Adaptive Interface**: Switch between a light and dark theme. 🌸
* 🔵 **Modern Design**: Clean interface with a subtle background and attractive visual effects. 🌸
* 🔵 **File Download**: Possibility to download generated files locally.
* 🔵 **File Upload**: Thanks to this, you will be able to securely upload files and view your passwords.
* 🔵 **Cloud Security**: You will be able to access your passwords securely **without the need to download additional programs**. ☁️
* 🔵 **Military-Grade Security**: **AES-256** encryption protects your passwords against attacks or theft. 🔒
* 🔵 **Master Password Usage**: You only need to remember one password to access the others. 🔑

## 💻 Installation

To install and run KeyForge locally, follow these steps:

1. **Clone the repository**:

    ```bash
    git clone https://github.com/aiskoadt/PassPai.git
    ```

2. **Open the project in your browser**:

    Open the `index.html` file in your browser to see the application in action.

## 🎴 Usage

1. **Generate Passwords**: Go to the "Generate" tab and click "Generate" to create a new password.
2. **Manage Passwords**: In the "Manage" tab, you can view and copy saved passwords for different social networks.

## 🔒 Master Password Configuration

* **Download Passwords**: When downloading the file with the passwords, you will be asked to assign a master password. Once created, a file called **mypasswords** (*you can change the file name as you wish*) with the **.pai** extension will be downloaded.
* **Upload Passwords**: If you want to consult your passwords, you must upload your file with the **.pai** extension and enter your master password (*without it, the file will not load and you will have to try again*).

---

### SAVE PASSWORDS FUNCTION

```javascript

  function savePasswordsToFile() {
    promptForMasterPassword((password) => {
      generateEncryptionKey(password).then(key => {
        encryptionKey = key;
        iv = crypto.getRandomValues(new Uint8Array(12)); // IV must be unique for each encryption

        const passwordEntries = Object.entries(passwords);
        if (passwordEntries.length === 0) {
          alert("No passwords saved to download.");
          return;
        }

        let passwordText = "Social Network - Password\n";
        // The last part is useless but it's still there
        passwordEntries.forEach(([network, password]) => {
          passwordText += `${network}: ${password}\n`;
        });

        return crypto.subtle.encrypt(
          {
            name: "AES-GCM",
            iv: iv
          },
          encryptionKey,
          new TextEncoder().encode(passwordText)
        ).then(encryptedText => {
          const blob = new Blob([iv, new Uint8Array(encryptedText)], { type: "application/octet-stream" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "mypasswords.pai";
          // the file extension is PAI for convenience
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
      });
    });
  }
```

> AES in GCM mode and PBKDF2 with SHA-256 are being used

* 🔵 AES-GCM not only encrypts data to keep it confidential, but also includes a mechanism to verify the integrity and authenticity of encrypted data.
* 🔵 Performance: It is known for its efficiency and performance, which makes it suitable for applications that require high encryption and decryption speed.
* 🔵 Common Use: It is widely adopted in security protocols such as TLS (Transport Layer Security) and in applications that require secure and fast encryption.

* 🔵 PBKDF2 is a cryptographic function used to derive secure keys from passwords.
* 🔵 Resistant to brute force attacks and dictionary attacks.
* 🔵 “Key stretching” and significantly increases the time required to crack a password.
* 🔵 Salt: A random value that is added to the password to ensure that identical passwords do not generate the same derived key.
* 🔵 Iterations: The number of times the derivation process is repeated. A higher number of iterations increases security.

**generateEncryptionKey(password)**:

```nx
 Generates an encryption key from a password using PBKDF2 with SHA-256. The salt used is the password itself, which is not a recommended practice for security reasons, but is done here for simplicity.
```

**savePasswordsToFile()**:

```nx
 Saves passwords to an encrypted file. First, it prompts for a master password, generates an encryption key with it, and then encrypts the passwords stored in an object. The resulting file is downloaded with the .pai extension.
```

| Name | Description |
| --|--|
|Security | Using the password as salt is not secure (This will be changed later). It is better to use a random salt. |
| Initialization vector | A unique IV is generated for each encryption, which is correct. |
| Encryption | Uses AES-GCM, which is a secure and modern encryption mode. |
| AES-GCM | Advanced Encryption Standard - Galois/Counter Mode (Symmetric)|
| PBKDF2 |  Password-Based Key Derivation Function 2 |

---

### 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check issues page.

### 💜 Show your support

Give a ⭐️ if this *project helped you!*

### 📝 License

Copyright © 2024 [aiskoa](https://aiskoa.vercel.app). This project is [MIT](/LICENSE) licensed.

---
---
title: "GIE Encrypt and Decrypt files"
excerpt: "An encryptor and decryptor for files and folders!"
date: "Jul 03 2025"
cover_image: "/blog/gie.webp"
alt: "GIE"
tags1: "Go"
tags2: "Tools"
---

![GIE Header](https://i.ibb.co/KcDrDJvw/passpaititle.png)

# GIE

## 🔐 What is GIE and what is it for?

*In summary:*
An encryptor and decryptor for files and folders for Windows, Linux and macOS, written in GO using AES.

**💜 GIE is cross-platform, it works on Windows, Linux and macOS.**

Example:
*You can encrypt your file on Windows and decrypt it on Linux or vice versa*.

*In detail:*
GIE (*Go-based Information Encryptor*), is a cross-platform desktop application built using the **Wails** framework. GIE is designed for the secure encryption and decryption of files and directories, leveraging robust cryptographic primitives implemented in **Go**. The application aims to provide a user-friendly interface for managing sensitive data.

![Example of use](https://i.postimg.cc/6pxZfhm8/Desktop2025-08-0906-27-27p-m-ezgif-com-optimize.gif)

### Version

**GIE v1.2.5**

### 📦 Requirements

- **Go v1.24+**
- **Wails v2.10+**
- **Node v22.17+**

## ❓ Features

- Encrypts and decrypts files and folders with AES, for any file type.
- GIE follows a client-server architecture facilitated by the Wails framework.
- Possibility of adding hints.
- Possibility of sharing files between operating systems.
- 3 levels of protection (Low, Normal, High).
- Possibility of adding an encryption channel for greater security.
- Lightweight and easy to use.
- Intuitive and friendly user interface.
- Open Source!

### 🧑‍💻 Technical Features
Encrypt and decrypt your files and folders with AES, for any file type: *jpg*, *zip*+, *mp4*, _mp3_, _docx_, _pdf_, etc...

GIE follows a client-server architecture facilitated by the Wails framework. * Frontend (Client): Developed with React (**Svelte**) and **TypeScript**, responsible for the user interface and interaction. It communicates with the **Go** backend through Wails' inter-process communication (IPC) mechanisms. * Backend (Server): Implemented in Go, it handles all the central logic, including file operations, cryptographic processes and system interactions.

GIE employs a hybrid encryption scheme that combines **symmetric encryption (AES CTR)** for data confidentiality and a **Message Authentication Code (HMAC-SHA256)** for data integrity and authenticity. Key derivation is performed using PBKDF2.

The encryption and HMAC keys are derived from the user's password using PBKDF2 (Password-Based Key Derivation Function 2) with SHA256 as the pseudorandom function. Separate salts are used for the AES key and the HMAC key to prevent cross-protocol attacks. The number of iterations and the key length are configurable according to the chosen encryption level (Low, Normal, High).

The PBKDF2 function is defined as:

$$ 
DK = PBKDF2

(PRF,Password,Salt,Iterations,KeyLength)
$$ 

Where:
- `DK`: Derived Key
- `PRF`: Pseudorandom Function (HMAC SHA256 in this case)
- `Password`: Password provided by the user
- `Salt`: Random salt (16 bytes)
- `Iterations`: Number of iterations (e.g., *10,000 for Low*, *800,000 for Normal*, *12,000,000 for High*)
- `KeyLength`: Desired length of the derived key (16 bytes for AES-128, 32 bytes for AES-256)

AES in Counter (CTR) mode is used to encrypt the file content. CTR mode transforms a block cipher into a stream cipher, allowing parallel encryption/decryption and direct access to any part of the ciphertext. A unique and randomly generated 16-byte Initialization Vector (IV) is used for each encryption operation. The CTR mode encryption process can be conceptually represented as:

$$ 
C_{i} = E_{K}(Nonce||Counter_{i}) \oplus P_{i}
$$ 

Where:
- `Ci`: i-th block of ciphertext
- `EK`: AES encryption function with key K
- `Nonce`: A unique value for each encryption (part of the IV)
- `Counteri`: A counter that is incremented for each block
- `Pi`: i-th block of plaintext
- `⊕`: Bitwise XOR operation

*HMAC-SHA256* is used to ensure the integrity and authenticity of the encrypted data and its associated metadata.
The HMAC is calculated over the entire encrypted file, including the metadata header (hint length, hint, channel, encryption level code, AES salt, HMAC salt, CTR IV) and the ciphertext. This prevents tampering with both the data and its critical parameters.

The HMAC function is defined as:

$$ 
HMAC_{K}(m)=H((K\oplus opad)

||H((K \oplus ipad)||m))
$$ 

Where:
- `H`: Hash function (SHA256 in this case)
- `K`: Secret key (derived HMAC key)
- `m`: Message (metadata || ciphertext)
- `ipad`: Inner padding (0x36 repeated)
- `opad`: Outer padding (0x5C repeated)
- `||`: Concatenation

### Method Structure

| Field             | Size (Bytes) | Description                                                                   |
|-------------------|----------------|-------------------------------------------------------------------------------|
| Hint              | Variable       | Length of the hint provided by the user for the file                            |
| Channel           | 2              | uint16, a user-defined channel for grouping files                |
| Encryption Level Code | 1              | byte, code representing the encryption strength (0=Low, 1=Normal, 2=High) |
| AES Key Salt      | 16             | Random salt for AES key derivation                              |
| HMAC Key Salt     | 16             | Random salt for HMAC key derivation                             |
| CTR IV            | 16             | Random Initialization Vector for AES-CTR                               |
| Ciphertext        | Variable       | Encrypted content of the original file                                        |
| HMAC Tag          | 32             | HMAC-SHA256 of all preceding data (metadata + ciphertext)        |

GIE provides a robust and secure solution for encrypting files and directories, built on modern cross-platform technologies. Its design prioritizes both security through solid cryptographic practices and usability through a responsive graphical interface.

The following sequence diagram shows the complete workflow of file processing with real function calls:
![Application Flow](https://i.ibb.co/JjVCxXnJ/032ff1f6-8b79-427b-a38d-b161ebd79422.png)

The backend is based on a central application structure that acts as the main application controller and exposes methods to the frontend through the Wails framework.
![Application structure and main components](https://i.ibb.co/mVcC1jbL/image.png)

If you want to know more in depth, you can consult the [GitHub Repository](https://github.com/aiskoa/GIE) for additional details and usage examples.

You can also consult with [DeepWiki](https://deepwiki.com/aiskoa/GIE)

## 💻 Installation

Run the commands according to your case (Win or Linux)

Clone or download this repository

```batch
git@github.com:aiskoa/GIE.git
```

Change directory

```batch
cd GIE
```

Install the dependencies

```batch
npm install
```
And run

`wails build` to compile the application

> Make sure you have the latest version of Wails, Node and Go installed on your computer.

**ATTENTION!!**

If you just want to use it, you can download it from github or from the official site according to your system.

**From Official Site:**
[⬇ Download GIE](https://gie-aiskoa.vercel.app)

**Minimum Requirements:**
- Windows 10/11 / Debian / macOS Ventura or later
- 1 GB of disk space
- 2 GB of RAM

---

## 🔒 How to Encrypt?

> At the moment it is only available through the GUI.

To **Encrypt** a folder or file

- **Drag or search for the file in the program (Graphical Interface)**
- **Enter a password (Important to remember it)**
- Write a hint for the password (Optional)
- Choose the encryption channel (Optional)
- Choose the encryption level (Optional)
- **Click on "Encrypt"**
- **This converts the file to (.gie)**

Once the file is encrypted in **.gie** it cannot be opened, read or modified.
Keep in mind that GIE works for any type of file, even for large files.

👀 **NOTE** IF YOU ACCIDENTALLY ENCRYPT ANY FILE OR FUNCTIONALITY OF **GIE** THE ONLY WAY TO RESTORE IT IS BY REINSTALLING THE PROGRAM!

**⚠️⚠️ IMPORTANT ⚠️⚠️**

- The only way to "recover" the file again is by decrypting it with the **GIE** program.
- If you want to share the file with your colleague, friend or work team, you will have to provide them with the .gie, the password used and the channel (if applicable).
- **IF YOU FORGET OR LOSE THE PASSWORD, YOU WILL NOT BE ABLE TO RECOVER THE FILE IF A HINT WAS NOT WRITTEN.**
- **IF YOU PUT A CHANNEL YOU MUST ALSO REMEMBER IT OTHERWISE YOU WILL NOT BE ABLE TO RECOVER THE FILE.**

![Example encrypting a PDF](https://i.postimg.cc/6pxZfhm8/Desktop2025-08-0906-27-27p-m-ezgif-com-optimize.gif)

## 🔓 How to Decrypt?

> At the moment it is only available through the GUI.

To **Decrypt** a file

- **Drag or search for the (.gie) file in the program (Graphical Interface)**
- **Enter the password (Required)**
- Choose the encryption channel (Optional)
- **Click on "Decrypt"**
- **This converts the file to its natural state**

Keep in mind that it will only work for encrypted **.gie** files.
It only works with files encrypted by GIE (Go-based Information Encryptor) current v1.2.5 or higher.

👀 **NOTE** IT WILL NOT WORK WITH .GIE FILES VERSION PYTHON, ONLY WITH THE VERSION WRITTEN IN GO!!

- The only way to "recover" the file again is by decrypting it with the **GIE** program.
- If you want to share the file with your colleague, friend or work team, you will have to provide them with the .gie, the password used and the channel (if applicable).
- **IF YOU FORGET OR LOSE THE PASSWORD, YOU WILL NOT BE ABLE TO RECOVER THE FILE IF A HINT WAS NOT WRITTEN.**
- **IF YOU PUT A CHANNEL YOU MUST ALSO REMEMBER IT OTHERWISE YOU WILL NOT BE ABLE TO RECOVER THE FILE.**

![Example decrypting a PDF](https://i.postimg.cc/0yGwWJTc/ezgif-com-optimize.gif)

---

### Directory encryption function

```go
func (a *App) EncryptDirectory(dirPath string, password string, hint string, encryptionLevel string, channel int) string {
	if password == "" {
		return "Encryption failed: password cannot be empty."
	}

	// Check if path is actually a directory
	isDir, err := a.IsDirectory(dirPath)
	if err != nil {
		return fmt.Sprintf("Error checking if path is directory: %v", err)
	}
	if !isDir {
		return "Selected path is not a directory."
	}

	// Get all files in directory
	files, err := a.GetFilesInDirectory(dirPath)
	if err != nil {
		return fmt.Sprintf("Error getting files from directory: %v", err)
	}

	if len(files) == 0 {
		return "No files found in directory to encrypt."
	}

	// Track results
	var results []string
	successCount := 0

	for i, file := range files {
		fmt.Printf("Encrypting file %d/%d: %s\n", i+1, len(files), file)

		result := a.EncryptFile(file, password, hint, encryptionLevel, channel)
		if result == "success" {
			successCount++
			results = append(results, fmt.Sprintf("✓ %s", filepath.Base(file)))
		} else {
			results = append(results, fmt.Sprintf("✗ %s: %s", filepath.Base(file), result))
		}
	}

	// Return summary
	summary := fmt.Sprintf("Directory encryption completed: %d/%d files encrypted successfully", successCount, len(files))
	if successCount < len(files) {
		summary += "\n\nDetailed results:\n" + strings.Join(results, "\n")
	}

	return summary
}
```

### Directory decryption function

```go
func (a *App) DecryptDirectory(dirPath string, password string, channel int) string {
	if password == "" {
		return "Decryption failed: password cannot be empty."
	}

	// Check if path is actually a directory
	isDir, err := a.IsDirectory(dirPath)
	if err != nil {
		return fmt.Sprintf("Error checking if path is directory: %v", err)
	}
	if !isDir {
		return "Selected path is not a directory."
	}

	// Get all .gie files in directory
	var encryptedFiles []string

	err = filepath.Walk(dirPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Only add .gie files
		if !info.IsDir() && strings.HasSuffix(path, ".gie") {
			encryptedFiles = append(encryptedFiles, path)
		}
		return nil
	})

	if err != nil {
		return fmt.Sprintf("Error scanning directory: %v", err)
	}

	if len(encryptedFiles) == 0 {
		return "No encrypted files (.gie) found in directory to decrypt."
	}

	// Track results
	var results []string
	successCount := 0

	for i, file := range encryptedFiles {
		fmt.Printf("Decrypting file %d/%d: %s\n", i+1, len(encryptedFiles), file)

		result := a.DecryptFile(file, password, false, channel)
		if result == "success" {
			successCount++
			results = append(results, fmt.Sprintf("✓ %s", filepath.Base(file)))
		} else {
			results = append(results, fmt.Sprintf("✗ %s: %s", filepath.Base(file), result))
		}
	}

	// Return summary
	summary := fmt.Sprintf("Directory decryption completed: %d/%d files decrypted successfully", successCount, len(encryptedFiles))
	if successCount < len(encryptedFiles) {
		summary += "\n\nDetailed results:\n" + strings.Join(results, "\n")
	}

	return summary
}
```

---

### 📖 Documentation

[See the Documentation and User Guides](https://gie-aiskoa.vercel.app/docs/)

## 📝 Changelog

[See the Changelog](https://gie-aiskoa.vercel.app/changelog)

### ✍️ To-Do List

- [x] Password hint
- [ ] Theme change
- [ ] Android support
- [ ] iOS support
- [ ] Possibility of use from terminal without GUI (API or MCP)
- [x] Password check
- [x] Reinforced AES
- [x] User interface menu
- [x] Encryption of complete folders and directories

### 📝 License

Copyright © 2024 [aiskoa](https://aiskoa.vercel.app). This project is licensed [MIT](https://github.com/aiskoa/GIE/blob/main/LICENSE).

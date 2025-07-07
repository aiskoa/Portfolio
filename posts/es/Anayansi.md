---
title: "[🇺🇸] Anayansi cracker and create hashes"
excerpt: "A script for crack or create a hashes and passwords!"
date: "Mar 30 2024"
cover_image: "/blog/anayansi0.webp"
alt: "Anayansi"
tags1: "Python"
tags2: "Tools"
---

![Anayansi](https://raw.githubusercontent.com/Rawierdt/Anayansi/main/assets/title.jpg)

[![Static Badge](https://img.shields.io/badge/%20build-MIT-brightgreen?logo=github&label=LICENSE)](https://github.com/Rawierdt/Anayansi/LICENSE)
![Static Badge](https://img.shields.io/badge/MARCH%202024-red?label=RELEASE%20DATE)
![Static Badge](https://img.shields.io/badge/LANGUAGE-Python-yellow?logo=python)

# Anayansi

Anayansi is a script for crack or create a hash written in python, multiplatform for windows and linux.

### Creator Hash

![aCreator](https://raw.githubusercontent.com/Rawierdt/Anayansi/main/assets/anayansi_creator.gif)

&nbsp;

### Cracker Hash

![aCracker](https://raw.githubusercontent.com/Rawierdt/Anayansi/main/assets/anayansi_cracker.gif)

## Supported Hash Formats

* **MD5**
* **SHA1**
* **SHA256**
* **SHA384**
* **SHA512**

## 💻 Installation

Execute the commands according to your case (Win or Linux)

**pyhon** for windows **python3** for Linux

Clone or Download this Repository

```bash
git clone https://github.com/Rawierdt/Anayansi.git
```

Update Repositories

```bash
sudo apt update
```

Change Directory

```bash
cd Anayansi
```

Run the setup.py file

```bash
python3 setup.py
```

OR install the dependencies manually

```bash
pip install -r requirements.txt
```

Run the project

```bash
python3 anayansi.py
```

Or for windows

```bash
python anayansi.py
```

### MD5 Cracker function

```python
def md5():
    """ MD5 is for Decrypting Raw MD5 Hash"""
    hash = input(
        Fore.GREEN + " [" + Fore.RED + 'x' + Fore.GREEN + "]" + Style.RESET_ALL + " Enter the Hash : " + Fore.GREEN)
    w_list = input(
        Fore.GREEN + " [" + Fore.RED + 'x' + Fore.GREEN + "]" + Style.RESET_ALL + " Input Full Path of Wordlist : " + Fore.GREEN)
    print(Style.RESET_ALL)
    pass_file = open(w_list, "r")

    for i in pass_file:
        file_enc = i.encode('utf-8')
        md_hash = hashlib.md5(file_enc.strip()).hexdigest()

        if md_hash == hash:
            print(Fore.GREEN + " Password Found :", i + Style.RESET_ALL)
            break
        else:
            print(Fore.RED + " Password Not Found !!!" + Style.RESET_ALL)
```

&nbsp;

### What is Wordlist?

A "Wordlist" is a list of words or characters listed in a text file, an example of which is "rockyou.txt", and others.
I will not provide the Wordlist mentioned, but searching for it is not complicated.

&nbsp;

### MD5 Create function

```python
def md5():
    text = input(Fore.GREEN + " [" + Fore.RED + 'x' + Fore.GREEN + "]" + Style.RESET_ALL + " Enter String : " + Fore.GREEN + Style.RESET_ALL)
    md5 = hashlib.md5(text.encode('utf8').strip()).hexdigest()
    print(f"\n MD5 Hash : {Fore.GREEN}{md5}{Style.RESET_ALL}\n")
```

&nbsp;

### ✅ ⬇ Download ⬇

Available for Mac, Linux and Windows 10 / 11.

[Download](https://github.com/Rawierdt/Anayansi)

&nbsp;

### 📝 License

Copyright © 2024 [Rawier](https://rawier.vercel.app). This project is [MIT](https://github.com/Rawierdt/Anayansi/blob/main/LICENSE) licensed.

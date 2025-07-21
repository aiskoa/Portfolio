---
title: "Anayansi - Creador y Cracker de Hashes"
excerpt: "¡Un script para crackear o crear hashes y contraseñas!"
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

Anayansi es un script para crackear o crear un hash escrito en python, multiplataforma para windows y linux.

### Creador de Hash

![aCreator](https://raw.githubusercontent.com/Rawierdt/Anayansi/main/assets/anayansi_creator.gif)

&nbsp;

### Cracker de Hash

![aCracker](https://raw.githubusercontent.com/Rawierdt/Anayansi/main/assets/anayansi_cracker.gif)

## Formatos de Hash Soportados

* **MD5**
* **SHA1**
* **SHA256**
* **SHA384**
* **SHA512**

## 💻 Instalación

Ejecuta los comandos según tu caso (Win o Linux)

**python** para windows **python3** para Linux

Clona o Descarga este Repositorio

```bash
git clone https://github.com/Rawierdt/Anayansi.git
```

Actualiza los Repositorios

```bash
sudo apt update
```

Cambia de Directorio

```bash
cd Anayansi
```

Ejecuta el archivo setup.py

```bash
python3 setup.py
```

O instala las dependencias manualmente

```bash
pip install -r requirements.txt
```

Ejecuta el proyecto

```bash
python3 anayansi.py
```

O para windows

```bash
python anayansi.py
```

### Función MD5 Cracker

```python
def md5():
    """ MD5 es para Descifrar Hash MD5 en Crudo"""
    hash = input(
        Fore.GREEN + " [" + Fore.RED + 'x' + Fore.GREEN + "]" + Style.RESET_ALL + " Ingresa el Hash : " + Fore.GREEN)
    w_list = input(
        Fore.GREEN + " [" + Fore.RED + 'x' + Fore.GREEN + "]" + Style.RESET_ALL + " Ingresa la Ruta Completa de la Wordlist : " + Fore.GREEN)
    print(Style.RESET_ALL)
    pass_file = open(w_list, "r")

    for i in pass_file:
        file_enc = i.encode('utf-8')
        md_hash = hashlib.md5(file_enc.strip()).hexdigest()

        if md_hash == hash:
            print(Fore.GREEN + " Contraseña Encontrada :", i + Style.RESET_ALL)
            break
        else:
            print(Fore.RED + " Contraseña No Encontrada !!!" + Style.RESET_ALL)
```

&nbsp;

### ¿Qué es una Wordlist?

Una "Wordlist" es una lista de palabras o caracteres listados en un archivo de texto, un ejemplo de ello es "rockyou.txt", y otras.
No proporcionaré la Wordlist mencionada, pero buscarla no es complicado.

&nbsp;

### Función MD5 Create

```python
def md5():
    text = input(Fore.GREEN + " [" + Fore.RED + 'x' + Fore.GREEN + "]" + Style.RESET_ALL + " Ingresa el String : " + Fore.GREEN + Style.RESET_ALL)
    md5 = hashlib.md5(text.encode('utf8').strip()).hexdigest()
    print(f"\n Hash MD5 : {Fore.GREEN}{md5}{Style.RESET_ALL}\n")
```

&nbsp;

### ✅ ⬇ Descargar ⬇

Disponible para Mac, Linux y Windows 10 / 11.

[Descargar](https://github.com/Rawierdt/Anayansi)

&nbsp;

### 📝 Licencia

Copyright © 2024 [Rawier](https://rawier.vercel.app). Este proyecto tiene licencia [MIT](https://github.com/Rawierdt/Anayansi/blob/main/LICENSE).
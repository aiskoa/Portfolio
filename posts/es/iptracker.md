---
title: "Rastreador de IP"
excerpt: "Un rastreador de IP para sitios web y más"
date: "Dec 21 2022"
cover_image: "/blog/tiptracker.webp"
alt: "entidades"
tags1: "Python"
tags2: "Herramientas"
---

### Instalación

* Descargar y ejecutar.

Es una pequeña herramienta que muestra datos de un sitio web o IP introducida.

$$
\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6}
$$

La famosa ecuación es $E=mc^2$ y muestra la equivalencia entre masa y energía.

### Código

```javascript
import socket
import requests
from os import system

system('clear')
print("Bienvenido, por favor")
site = input("\nIngrese el sitio web: ")
ip = socket.gethostbyname(site)
got = requests.get(f"http://ip-api.com/json/{ip}").json()
lat = requests.get(f"http://ipwho.is/{ip}").json()

print("Direccion IP:", got["query"])
print("ISP:", got["isp"])
print("Tipo:", lat["type"])
```

### Descargar aquí

* [Descargar aquí](https://drive.google.com/file/d/1jlsOKaZSsocnx_mwd9pfCeWuZIDCKKaU/view?usp=share_link)

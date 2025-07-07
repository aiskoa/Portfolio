---
title: "[🇺🇸] Tracker IP"
excerpt: "A Tracker IP over web sites and more"
date: "Dec 21 2022"
cover_image: "/blog/tiptracker.webp"
alt: "entities"
tags1: "Python"
tags2: "Tools"
---

### Installation

* Download, and run.

It is a small tool that displays data from a web site or ip entered.

$$
\sum_{n=1}^\infty \frac{1}{n^2} = \frac{\pi^2}{6}
$$

La famosa ecuación es $E=mc^2$ y muestra la equivalencia entre masa y energía.

### Code

```javascript
import socket
import requests
from os import system

system('clear')
print("Bienvenidi, por favor")
site = input("\nIngrese el sitio web: ")
ip = socket.gethostbyname(site)
got = requests.get(f"http://ip-api.com/json/{ip}").json()
lat = requests.get(f"http://ipwho.is/{ip}").json()

print("Direccion IP:", got["query"])
print("ISP:", got["isp"])
print("Tipo:", lat["type"])
```

### Download Here

* [Download Here](https://drive.google.com/file/d/1jlsOKaZSsocnx_mwd9pfCeWuZIDCKKaU/view?usp=share_link)
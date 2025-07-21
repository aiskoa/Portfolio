---
title: "Tracker IP"
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

The famous equation is $E=mc^2$ and shows the equivalence between mass and energy.

### Code

```python
import socket
import requests
from os import system

system('clear')
print("Welcome, please")
site = input("\nEnter the website: ")
ip = socket.gethostbyname(site)
got = requests.get(f"http://ip-api.com/json/{ip}").json()
lat = requests.get(f"http://ipwho.is/{ip}").json()

print("IP Address:", got["query"])
print("ISP:", got["isp"])
print("Type:", lat["type"])
```


### Download Here

* [Download Here](https://drive.google.com/file/d/1jlsOKaZSsocnx_mwd9pfCeWuZIDCKKaU/view?usp=share_link)
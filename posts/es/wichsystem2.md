---
title: "[🇪🇸] W1chSystem2 SO escaneo de puertos"
excerpt: "Un Script en Python que nos dice si un sistema es windows o linux y sus puertos abiertos"
date: "Aug 23 2022"
cover_image: "/blog/whichsystem.webp"
alt: "wichsystem"
tags1: "Python"
tags2: "Tools"
---

**Script realizado por [S4vitar](https://www.youtube.com/c/s4vitar), modificado por mi agregando una función para analizar los puertos abiertos.**

*El codigo completo se encuentra en [GitHub](https://github.com/Rawierdt/W1chsystem)*

Herramienta sencilal.

```python
#!/usr/bin/python3
#coding: utf-8

import re, sys, subprocess

print("W1hchSystem2")

#Usage python3 wh1chSystem.py 10.10.10.205

ip = re.compile("\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}")

def dato_erroneo():

  if len(sys.argv) != 2 or sys.argv[1]
 != ip:
   print("\n[!] Usage: python3 " 
   + sys.argv[0] + " <ip-direction>\n")
   sys.exit(1)

def get_ttl(ip_address):

 proc = subprocess.Popen(["/usr/bin/ping 
 -c 1 %s" % 
 ip_address, ""], stdout=subprocess.PIPE, 
 shell=True)
 
 (out,err) = proc.communicate()

 out = out.split()
 out = out[12].decode('utf-8')

 try:

  ttl_value = re.findall(r"\d{1,3}", 
  out)[0]
  
  return ttl_value

 except IndexError:
   
  if ttl_value is IndexError:
   print("Machine out of order")
   sys.exit(1)


def get_os(ttl):

 ttl = int(ttl)

 if ttl >=0 and ttl <=64:
  return "Linux"
 
 elif ttl >= 65 and ttl <= 128:
  return "Windows"
  
 else:
  return "Not Found"
```

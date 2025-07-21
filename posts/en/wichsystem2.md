---
title: "W1chSystem2 OS port scan"
excerpt: "A Python Script that tells us if a system is Windows or Linux and its open ports"
date: "Aug 23 2022"
cover_image: "/blog/whichsystem.webp"
alt: "wichsystem"
tags1: "Python"
tags2: "Tools"
---

**Script made by [S4vitar](https://www.youtube.com/c/s4vitar), modified by me by adding a function to analyze open ports.**

*The complete code can be found on [GitHub](https://github.com/aiskoadt/W1chsystem)*

Simple tool.

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
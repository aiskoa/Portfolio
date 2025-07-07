---
title: "[🇺🇸] SISLOG Forensic Tool"
excerpt: "Forensic Tool to generate reports and logs"
date: "Apr 30 2023"
cover_image: "/blog/sislog.webp"
tags1: "Python"
tags2: "Tools"
---

![imagetitle](https://i.ibb.co/YcnFRM2/sislogtitle.jpg)

# SISLOG

## Create logs, reports, issues and more.
Windows 8/10/11 and Linux forensic tool to generate logs about installed programs, NetBios connections, ARP cache, DNS, processes, network, WIFI, services, computer modifications, scheduled tasks, mapped drives and more, all written in Python and output as TXT files.

> You need administrator privileges to avoid bugs with the txt creation.

I invite anyone to make modifications to this repository and improve the program for various operating systems regardless of their architecture or distribution.

![IMG](https://i.imgur.com/3Pw9O4u.png)


### Features

Encrypt and decrypt your files and folders with AES, for any file, jpg, png, mp4, mp3, docx, pdf, etc... 

### Why GIE?

GIE is the name of my first girldfriend (JK 😂), GIE is the acronym of **G**entle, **I**ntelligent and **E**asy file encryption.

## 📦 Requirements

- **[Python](https://www.python.org/downloads/)**, (not necessary).

## 💻 Installation

Execute the commands according to your case

Run the project

```batch
python setup.py
```

Then (or)

```batch
python main.py
```

Excecute **SISLOG.exe** file.

---

### VIEW DNS CACHE FUCTION

```python
# Función para mostrar la cache dns.
def get_dns_cache():
    dns_cache = subprocess.check_output(["ipconfig", "/displaydns"]).decode("ISO-8859-1")
    return dns_cache
```

### VIEW RUNNING TASK AND PROCESS FUCTION

```python
# Función para ver los procesos ejecutandose al momento.
def get_running_processes():
    processes_info = ""
    for process in psutil.process_iter():
        try:
            process_name = process.name()
            processes_info += process_name + "\n"
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return processes_info


# Función para ver los servicios ejecutandose en el momento.
def get_running_services():
    services_info = ""
    for service in psutil.win_service_iter():
        try:
            if service.status() == "running":
                services_info += service.name() + "\n"
        except (psutil.NoSuchProcess, psutil.AccessDenied, psutil.ZombieProcess):
            pass
    return services_info
```

---

### Output TXT Example

![IMG](https://i.ibb.co/cx4bMw6/SisLog-2.jpg)

### Download

`git clone git@github.com:Rawierdt/SisLog.git`

[⬇️ Check the latest release ⬇️](https://github.com/Rawierdt/SisLog/releases/tag/SISLOG)

### 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check issues page.

### 💜 Show your support

Give a ⭐️ if this _project helped you!_ 

### 📝 License

Copyright © 2024 [Rawier](https://rawier.vercel.app). This project is [MIT](/LICENSE) licensed.

---
---
title: "SISLOG Herramienta Forense"
excerpt: "Herramienta Forense para generar informes y registros"
date: "Apr 30 2023"
cover_image: "/blog/sislog.webp"
tags1: "Python"
tags2: "Tools"
---

![imagetitle](https://i.ibb.co/YcnFRM2/sislogtitle.jpg)

# SISLOG

## Crea registros, informes, problemas y más.
Herramienta forense para Windows 8/10/11 y Linux para generar registros sobre programas instalados, conexiones NetBios, caché ARP, DNS, procesos, red, WIFI, servicios, modificaciones de computadora, tareas programadas, unidades mapeadas y más, todo escrito en Python y con salida como archivos TXT.

> Necesitas privilegios de administrador para evitar errores con la creación de txt.

Invito a cualquiera a realizar modificaciones en este repositorio y mejorar el programa para varios sistemas operativos, independientemente de su arquitectura o distribución.

![IMG](https://i.imgur.com/3Pw9O4u.png)


### Características

Cifra y descifra tus archivos y carpetas con AES, para cualquier archivo, jpg, png, mp4, mp3, docx, pdf, etc...

### ¿Por qué GIE?

GIE es el nombre de mi primera novia (es broma 😂), GIE es el acrónimo de cifrado de archivos **G**entil, **I**nteligente y **F**ácil.

## 📦 Requisitos

- **[Python](https://www.python.org/downloads/)**, (no es necesario).

## 💻 Instalación

Ejecuta los comandos según tu caso

Ejecuta el proyecto

```batch
python setup.py
```

Luego (o)

```batch
python main.py
```

Ejecuta el archivo **SISLOG.exe**.

---

### FUNCIÓN DE CACHÉ DNS

```python
# Función para mostrar la cache dns.
def get_dns_cache():
    dns_cache = subprocess.check_output(["ipconfig", "/displaydns"]).decode("ISO-8859-1")
    return dns_cache
```

### FUNCIÓN DE TAREAS Y PROCESOS EN EJECUCIÓN

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

### Ejemplo de salida TXT

![IMG](https://i.ibb.co/cx4bMw6/SisLog-2.jpg)

### Descargar

`git clone git@github.com:Rawierdt/SisLog.git`

[⬇️ Ver la última versión ⬇️](https://github.com/Rawierdt/SisLog/releases/tag/SISLOG)

### 🤝 Contribuyendo

¡Las contribuciones, los problemas y las solicitudes de características son bienvenidos! Siéntete libre de consultar la página de problemas.

### 💜 Muestra tu apoyo

¡Da una ⭐️ si este proyecto te ayudó! 

### 📝 Licencia

Copyright © 2024 [Rawier](https://rawier.vercel.app). Este proyecto tiene licencia [MIT](/LICENSE).

---

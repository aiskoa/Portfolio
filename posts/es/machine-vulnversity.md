---
title: "[WriteUp] - Vulnversity (TryHackMe)"
excerpt: "Maquina Vulnversity, Reverse Shell"
date: "Jun 10 2025"
cover_image: "/blog/vulnversity-thm.webp"
alt: "Writeup 2"
tags1: "Hacking"
tags2: "Linux"
---

# Máquina "Vulnversity" (TryHackMe)

[📝 Download PDF Report](https://drive.google.com/file/d/1gkD94lRSYaorLr0cYcpJn_2-CPHzUlEO/view?usp=sharing)

&nbsp;

> *Difficulty Level: ⭐*

&nbsp;

A continuación se relata el reporte de pentesting para la máquina **Vulnversity** de TryHackMe con una dificultad *Facil*.
Se abarcará el uso de dirsearch (GoBuster o Dirbuster) hasta el uso de Burb Suite Community.

Resumen:

* Escaneo de puertos
* Explotación de vulnerabilidades
* Reverse Shell remoto

**IMPORTANTE** Debes tener una máquina virtual o un sistema operativo de auditoría con privilegios de root y una conexión a Internet.

## Metodologia

* Reconocimiento
* Enumeración
* Búsqueda y análisis de vulnerabilidades
* Explotación
* Post-explotación

**Reconocimiento**: Responde a las preguntas ¿Qué se atacará? y ¿Qué formará
parte de la prueba?

**Enumeración**: Se recolecta toda información posible de lo que se atacará para
realizar la prueba sin contratiempos

**Búsqueda y análisis de vulnerabilidades**: Identifica debilidades sobre lo que se
atacará, puertos, procesos, servicios entre otros.

**Explotación**: Aquí se comienza con el ataque utilizando todo lo anterior y con las
herramientas correctas.

**Post explotación**: Se buscan posibles vulnerabilidades extra o que más se podrá
atacar.

**Reporte de las pruebas**: Se redacta todo lo que se va haciendo durante la
auditoria.

## Reconocimiento yEnumeración

Durante el pre acuerdo se estableció que la maquina Objetivo se encuentra en la Red bajo la IP **10.10.167.123** por lo que esta se convierte en **la máquina objetivo** y de nuestro lado nuestra maquina se representa con la IP **10.6.42.149** .

Gracias a esto procedemos a lanzar un ping a la maquina victima y esperar respuesta.

Una vez con la respuesta por parte de la maquina victima confirmamos mediante el TTL que estamos frente a una máquina **Linux**, aún desconocemos su distribución y versión pero eso lo sabremos más adelante.

Con esta información podemos proceder a lanzar el escaneo usando **Nmap** y esperar que nos de el resultado, en este caso usamos un *--min-rate* alto ya que nos encontramos en un laboratorio controlado y podemos lanzar multiples trazas.

El comando desglosado:

| Campo | Valor |
| --- | --- |
| `-sV` | Intenta determinar la versión de los servicios que se estan ejecutando |
| `-p <x> or -p-` | Escaneo de puertos para el puerto `<x>` o todos |
| `-Pn` | Deshabilita la detección de host y el escaneo de puertos abiertos |
| `-A` | Habilita la detección de OS y la versión, integra más scripts |
| `-sC` | Escanea los scripts predeterminado de Nmap |
| `-v` | Modo detallado |
| `-sS` | TCP escaneo de puertos SYN |
| `-sU` | UDP escaneo |

**Comandos de Shell:**

```bash
nmap -p- -sV 10.10.167.123 --min-rate 5000 -oN all_ports.nmap -Pn
```

![nmap scan](https://i.ibb.co/mrV98d3x/img2-0-0.png)

**Severidad:** Medium
**Descripción:**
Una vez ejecutado el comando anterior nos arrojó los siguientes servicios corriendo en el sistema.

* **21/tcp** FTP v3.0.5
* **22/tcp** SSH
* **139/tcp** SMB 4 NetBIOS-ssn
* **445/tcp** SMB 4
* **3128/tcp** HTTP-PROXY Squid v4.10
* **3333/tcp** HTTP Apache 2.4.41 Ubuntu

Aqui se enumeran las vulnerabilidades de los servicios listados

* **21/tcp (FTP v3.0.5):** El puerto FTP es inseguro y puede ser explotado **mediante autenticación anónima**, secuencias de comandos entre sitios, ataques de fuerza bruta y ataques de salto de directorios.
* **22/tcp (SSH)**: Aunque SSH es un protocolo de acceso remoto seguro, puede ser vulnerable a **ataques de fuerza bruta de las credenciales SSH** o al uso de claves privadas para obtener acceso al sistema de destino.
* **139/tcp (SMB 4 NetBIOS-ssn):** El protocolo SMB (Server Message Block) ha sido históricamente vulnerable a varios tipos de ataques, como la ejecución remota de código y la escalación de privilegios. Una de las vulnerabilidades más famosas es **EternalBlue (MS17-010)**, que afecta SMBv1 y fue explotada por el ransomware WannaCry.
* **445/tcp (SMB 4):** Similar a 139/tcp, el puerto 445 también está asociado con SMB y puede ser vulnerable a ataques como EternalBlue. Además, permite la enumeración de recursos y usuarios en un sistema, lo que puede ser aprovechado por atacantes.
* **3128/tcp (HTTP-PROXY Squid v4.10)**: Los servidores proxy como Squid pueden ser vulnerables a**ataques de inyección de código**, configuraciones inseguras y exposición de información sensible. Es importante mantener las versiones actualizadas y configurar correctamente las reglas de acceso.
* **3333/tcp (HTTP Apache 2.4.41 Ubuntu):** El servidor HTTP Apache puede ser vulnerable a **inyecciones de SQL, secuencias de comandos entre sitios y falsificación de solicitudes**entre sitios. Es crucial aplicar parches de seguridad y mantener el software actualizado.

### Hazaña

Identificamos **6** puertos abiertos

* *¿Qué versión del proxy squid se está ejecutando en la máquina? R: 3.5.12*
* *Usando el indicador nmap -n ¿qué no resolverá? R: DNS*
* *¿Cuál es el sistema operativo más probable que ejecuta esta máquina? R: Ubuntu*
* *¿En qué puerto se ejecuta el servidor web? R: 3333 (Esto es bastante especial, ya que normalmente los sitios web funcionan en el puerto 80 (HTTP) o el puerto 443 (HTTPS).)*

![Screenshot of Index page](https://i.ibb.co/nqjzgf0L/img3-1-0.png)

Ahora sabemos que se esta alojando un servicio web con apache en el puerto *3333* lo que probablemente estemos frente a el lenguaje web **PHP**, este es un lenguaje de backend.

Usando dirsearch encontramos los directorios **/images**, **/css**, **/js**, **/fonts**, **/internal** los primeros no parecen ser especiales ya que corresponden a hojas de estilo, scripts, fuentes y las imagenes, todo esto para el funcionamiento correcto de la página, pero hay un directorio que es diferente al resto y este es **/internal**.

Este directorio es raro y hay que echarle un ojo a ello

```bash
dirsearch -u http://10.10.167.123:3333 -w /usr/share/wordlists/dirbuster/directory-list-2.3-medium.txt -t 150
```

![Fuzzing](https://i.ibb.co/k6r4LQLs/img3-2-0.png)

### Internal

**Descripción:**
El entrar a esta dirección nos damos cuenta que internal contiene un formulario donde se pueden subir archivos, en este formulario nos damos cuenta que no cualquier archivo es permitido ya que nos arroja la frase **Extension not allowed** lo que significa que solo ciertas extensiones deben permitir la subida del archivo, buscando por el código de la pagina nos damos cuenta que no es posible quitar este filtro por extensión desde el frontend lo que significa que solo el back es posible editar esto.

Por lo que solo queda buscar que tipo de extensión no es posible subir el archivo.

![Internal front](https://i.ibb.co/LzFKgmQM/img3-3-0.png)

## Explotación

### Reverse shell

**Descripción:**
Usando Wappalyzer, WhatWeb u otra herramienta o extensión confirmamos el uso de PHP como lenguaje para el sitio web.

Lo que significa que intentaremos alguna extensión permitida que nos permita tener el control del servidor usando php, lo que significa que buscaremos alguna extensión php que lo permita.

Para identificar qué extensiones no están bloqueadas, vamos a difuminar el formulario de carga. Para hacer esto, vamos a utilizar BurpSuite.

Para comenzar, crea una lista de palabras con las siguientes extensiones: en: *.php, .php3, .php4, .php5, .phtml*

![Screenshot of wappalyzer](https://i.ibb.co/yF5w7Hmh/img4-0-0.png)

Usando el intruder y sniffer en **Burbsuite** logramos realizar una automatización sobre las extensiones php y encontramos alguna que es aceptada por el filtro de extensiones.

Al hacer esto encontramos que la extensión permitida es **phtml** y gracias a esto sabemos que es posible cargar algun archivo malicioso o corrupto usando este tipo de extensión.

![Burbsuite capture](https://i.ibb.co/spCCXKr8/img4-1-0.png)

![Upload the phtml file](https://i.ibb.co/1Dc25Bz/img4-1-1.png)

## Post-Explotación

**Severidad:** Critical

Usando dirsearch descubrimos el directorio **uploads** en este se encuentran los archivos subidos desde front.
Entonces sabiendo esto intentamos subi una web shell para poder ejecutar comandos, posteriormente se intenta con una shell mas avanzada usando netcat

Como vemos en la imagen tenemos control de la maquina usando al usuario **www-data** quien es quien es responsable de apache y el servicio web.
El siguiente objetivo seria escalar privilegios para poder escalar al usuario **root*.

Con netcat es posible crear la reverse shell y poder ejecutar comandos desde terminal, solo nos ponemos en escucha por algun puerto y listo.

Para evitar esto es recomendable supervisar el codigo webb asegurandose conexiones autorizadas.

Creamos o buscamos una tiny shell para probar (*Simple HTTP Requests GET Method Shell*):

```bash
<?=`$_GET[0]`?>
```

Esto nos arrojara como resultado la ejecución del comando pero desde el navegador.

![Tiny shell exec](https://i.ibb.co/gMgtGR5F/img4-2-0.png)

Para ver y ejecutar comando de manera mas comoda desde nuestra terminal tendremos que crear alguna shell mas completa, asignando nuestra ip y puerto.
Y nos ponemos en escucha por algún mismo puerto.

```bash
nc -nlvp 1233
```

## Análisis y Conclusiones

Como vimos esta maquina su principal problema fue el hacer las configuraciones incorrectas y dejar a la deriva un formulario que no sew deberia ver siendo un visitante.
Tambien se encontró un formulario simple donde al subir el archivo con la extensión correcta era posible subir los archivos e infectarlos con codigo malicioso.

## Recomendaciones

* Hacer las configuraciones y programación adecuada de los servidores web, en especial en el codigo front.
* Hacer validaciones por conexión autorizada.
* Hacer una sanitization de datos en formularios
* Negar el paso a paginas que solo el administrador del sitio debe conocer.
* Crear una regla de **rate-limit** para evitar **fuzzing** y reconocimiento por fuerza bruta.
* Levantar un waf o filtros mas avanzados.- Hacer las configuraciones y programación adecuada de los servidores web, en especial en el codigo front.
* Actualización
* Uso de Firewall
* Utilizar alguna herramienta de monitoreo o SIEM/SOAR.

### Estandar

Se recomienda seguir el estándar NIST, específicamente NIST SP 800-53 y NIST SP 800-171.

* NIST SP 800-53: Es un catalogo de controles de seguridad que cubren lo necesario respecto a protección de sistemas.
    o Limita quien puede acceder a que (control de acceso).
    o Restringe servicios innecesarios (reducción de superficie de ataque).
    o Asegura la configuración del sistema (hardening)
    o Aplica parches a tiempo (gestión de vulnerabilidades).
    o Protege y supervisa.
    o Documenta y responde a incidentes
* NIST SP 800-171: Se enfoca a proteger información en sistemas de empresas.
    o Autenticación fuerte
    o Configuraciones seguras en los equipos.

## Fuentes de consulta

* Simple PHP Webshell | yuyudhn’s notes. (2024, June 26). Linuxsec.org. <https://htb.linuxsec.org/backdoor-stuff/php-webshell>

### Glosario de Hacking Ciberseguridad y Redes

Recomiendo revisar mi articulo sobre esto para poder entender de mejor los terminos de este writeup.

🍁 Glosario de terminos [--> Glosario](https://aiskoa.vercel.app/es/blog/glossary)

---

&nbsp;

> Gracias por leer mi blog, espero que te haya gustado.

&nbsp;

* 💜 Acceso a más writeups [--> WriteUps](https://aiskoa.vercel.app/writeup)

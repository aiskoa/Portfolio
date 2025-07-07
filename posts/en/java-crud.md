---
title: "[🇪🇸] Java CRUD"
excerpt: "Java CRUD para el IPN"
date: "Dec 28 2021"
cover_image: "/blog/JavaCrud.webp"
alt: "Java"
tags1: "Java"
tags2: "SQL"
---

# Java CRUD

<h1 align="center">☕ JAVA CRUD Alumnos ☕</h1>
<p align="center">
  Java CRUD para la inscripción, edición y eliminación de alumnos de una escuela, esta inscripción funciona con base de datos MySQL. Usando NetBeans

### Login
  ![Javacrud](https://raw.githubusercontent.com/Rawierdt/java-crud-alumnos/main/src/resources/img/login.png)

### Edit
  ![Javacrud](https://raw.githubusercontent.com/Rawierdt/java-crud-alumnos/main/src/resources/img/edit.png)

### View
  ![Javacrud](https://raw.githubusercontent.com/Rawierdt/java-crud-alumnos/main/src/resources/img/view.png)
</p>
<br>
> Este proyecto se ha realizado únicamente con fines de aprendizaje, cualquier error que se pueda encontrar debe ser corregido por usted mismo.
<br>

* [GitHub](https://github.com/Rawierdt/java-crud-alumnos)
  
* [Docs](https://github.com/Rawierdt/java-crud-alumnos/blob/main/DocCalificaciones.pdf)

<br>
<br>

>>Database:
```sql
Name: dbcalificaciones,   `NumeroLista` int(11) NOT NULL,
  `Nombre` varchar(50) NOT NULL,
  `ApellidoPaterno` varchar(50) NOT NULL,
  `Sexo` varchar(15) NOT NULL,
  `Carrera` varchar(50) NOT NULL,
  `Materia` varchar(50) NOT NULL,
  `PlanEstudios` int(11) NOT NULL,
  `D1` int(11) NOT NULL,
  `D2` int(11) NOT NULL,
  `D3` int(11) NOT NULL,
  `PromedioR` int(11) NOT NULL,
  `Secuencia` varchar(20) NOT NULL,
  `NoEquipo` int(11) NOT NULL.
```

&nbsp;

  and
```sql
>>`id` int(11) NOT NULL,
  `user` varchar(45) NOT NULL,
  `password` varchar(255) NOT NULL  
```

&nbsp;

user: admin@root.com password: root
<br>
el conector mysql para java se encuentra en la carpeta del controlador
<br>


# How to use

## Step 1

* Importa el proyecto a tu carpeta de netbeans.

## Step 2

* Abra el proyecto, compruebe si hay errores luego compile y ejecute.

## Step 3

* Si ya has conectado la base de datos y todo funciona, puedes compilar el proyecto a .jar

<br>

# Download
Disponible solo en Windows.

[Check the latest release](https://github.com/Rawierdt/java-crud-alumnos)

<br>

# Complete Documentation

[PDF](./DocCalificaciones.pdf)

<br>

# License

💜 [MIT License](/LICENSE)
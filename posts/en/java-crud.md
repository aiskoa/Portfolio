---
title: "Java CRUD"
excerpt: "Java CRUD for IPN"
date: "Dec 28 2021"
cover_image: "/blog/JavaCrud.webp"
alt: "Java"
tags1: "Java"
tags2: "SQL"
---

# Java CRUD

<h1 align="center">☕ JAVA CRUD Students ☕</h1>
<p align="center">
  Java CRUD for the enrollment, editing and deletion of students from a school, this enrollment works with a MySQL database. Using NetBeans

### Login
  ![Javacrud](https://raw.githubusercontent.com/aiskoadt/java-crud-alumnos/main/src/resources/img/login.png)

### Edit
  ![Javacrud](https://raw.githubusercontent.com/aiskoadt/java-crud-alumnos/main/src/resources/img/edit.png)

### View
  ![Javacrud](https://raw.githubusercontent.com/aiskoadt/java-crud-alumnos/main/src/resources/img/view.png)
</p>
<br>
> This project has been carried out for learning purposes only, any errors that may be found must be corrected by yourself.
<br>

* [GitHub](https://github.com/aiskoadt/java-crud-alumnos)
  
* [Docs](https://github.com/aiskoadt/java-crud-alumnos/blob/main/DocCalificaciones.pdf)

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
the mysql connector for java is in the controller folder
<br>


# How to use

## Step 1

* Import the project to your netbeans folder.

## Step 2

* Open the project, check for errors then compile and run.

## Step 3

* If you have already connected the database and everything works, you can compile the project to .jar

<br>

# Download
Available only on Windows.

[Check the latest release](https://github.com/aiskoadt/java-crud-alumnos)

<br>

# Complete Documentation

[PDF](./DocCalificaciones.pdf)

<br>

# License

💜 [MIT License](/LICENSE)
---
title: "Espejito"
excerpt: "Pequeña aplicación que muestra los datos que una página web puede obtener"
date: "Dec 28 2021"
cover_image: "/blog/iespejito.webp"
tags1: "JavaScript"
tags2: "Tools"
---

# Instalación

* La guía completa se puede encontrar en [GitHub](https://github.com/Rawierdt/espejito)
* La página se puede encontrar [Aquí](https://rawierdt.github.io/espejito/)

<h1 align="center">🍀 Espejito... Mis Datos 🍀</h1>
  Pequeña aplicación que muestra los datos que una página web puede obtener
</p>

> Este proyecto fue hecho solo con fines de aprendizaje

* Acceso al [Sitio Web](https://Rawierdt.github.io/espejito/)

## Finalizar

* Ve tus datos, si estás usando VPN mostrará otra dirección, si estás usando Brave u otro navegador puede que bloquee el rastreo.

#### Descargar

Disponible para Mac, Linux y Windows.

[Revisa la última versión](https://github.com/Rawierdt/espejito)

### Licencia

💜 [Licencia MIT](https://github.com/Rawierdt/espejito/blob/main/LICENSE)

### Ejemplo de Código

```javascript
const container = 
document.getElementById("sections");

const sections = [
  {
    title: "Estas usando un navegador",
    content: {
      Nombre: platform.name,
      Version: platform.version,
      Diseño: platform.layout,
      Idioma: navigator.language,
      Cookies: navigator.cookieEnabled,
      "No rastrear": navigator.doNotTrack,
      Complementos: navigator.plugins?.length,
    },
  },
];
```
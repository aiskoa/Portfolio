---
title: "[🇺🇸] Espejito"
excerpt: "Small application that displays the data that a web page can obtain"
date: "Dec 28 2021"
cover_image: "/blog/iespejito.webp"
tags1: "JavaScript"
tags2: "Tools"
---

# Installation

* The complete guide can be found at [GitHub](https://github.com/Rawierdt/espejito)
* Page can be found [Here](https://rawierdt.github.io/espejito/)

<h1 align="center">🍀 Espejito... My Data 🍀</h1>
  Small application that displays the data that a web page can obtain
</p>

> This project was made for learning purposes only

* Access to the [Website](https://Rawierdt.github.io/espejito/)

## Finish

* View your data, if you are using VPN it will show another address, if you are using Brave or another browser it may block tracking.

#### Download

Available for Mac, Linux and Windows.

[Check the latest release](https://github.com/Rawierdt/espejito)

### License

💜 [MIT License](https://github.com/Rawierdt/espejito/blob/main/LICENSE)

### Code Example

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

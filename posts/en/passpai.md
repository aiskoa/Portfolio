---
title: "[🇪🇸] PassPai Local Password Manager"
excerpt: "Secure Password Gen. and Manager using AES!"
date: "Sep 08 2024"
cover_image: "/blog/passpai.webp"
alt: "PassPai"
tags1: "JavaScript"
tags2: "Tools"
---

![imageTitle](https://i.ibb.co/ygJ41Xk/passpaititle.jpg)

# PassPai

## Secure Password Manager

**PassPai** es una herramienta para la generación y gestión de contraseñas de codigo abierto que permite la generación de contraseñas seguras gracias a la encriptación  AES-256

![PassPai1](https://i.ibb.co/Q9w0D1t/1.png)

![PassPai2](https://i.ibb.co/gRBFQ3v/passpaiim2.png)

## Website

### [➡️ Go to PassPai](https://rawierdt.github.io/PassPai/)

## [Code](https://github.com/Rawierdt/PassPai)

## Features

* 🔵 **Generación de Contraseñas**: Crea contraseñas seguras para distintas redes sociales. 😄
* 🔵 **Gestión de Contraseñas**: Guarda y visualiza contraseñas para diversas cuentas.
* 🔵 **Interfaz Adaptativa**: Alterna entre un tema claro y oscuro. 🌸
* 🔵 **Diseño Moderno**: Interfaz limpia con un fondo sutil y efectos visuales atractivos. 🌸
* 🔵 **Descarga de Archivos**: Posibilidad de descargar los archivos generados a nivel local.
* 🔵 **Carga de Archivos**: Gracias a ello podra cargar archivos de forma segura y ver sus contraseñas.
* 🔵 **Seguridad en Nube**: Podrá acceder a sus contraseñas de forma segura **sin necesidad de descargar programas adicionales**. ☁️
* 🔵 **Seguridad a Nivel Militar**: La encriptación **AES-256** protege sus contraseñas contra ataques o robos. 🔒
* 🔵 **Uso de Contraseña Maestra**: Solo necesita recordar una contraseña para acceder a las otras. 🔑

## 💻 Installation

Para instalar y ejecutar KeyForge localmente, sigue estos pasos:

1. **Clona el repositorio**:

    ```bash
    git clone https://github.com/Rawierdt/PassPai.git
    ```

2. **Abre el proyecto en tu navegador**:

    Abre el archivo `index.html` en tu navegador para ver la aplicación en acción.

## 🎴 Usage

1. **Generar Contraseñas**: Ve a la pestaña "Generar" y haz clic en "Generar" para crear una nueva contraseña.
2. **Gestionar Contraseñas**: En la pestaña "Gestionar", puedes ver y copiar contraseñas guardadas para diferentes redes sociales.

## 🔒 Configuración de Contraseña Maestra

* **Descargar Contraseñas**: Al descargar el archivo con las contraseñas se le pedira asignar una contraseña maestra. Una vez creada se descargará un archivo llamado **mypasswords** (*puede cambiar el nombre del archivo a su gusto*) con la extención **.pai**.
* **Cargar Contraseñas**: Si desea consultar sus contraseñas, deberá cargar su archivo con extensión **.pai** y escribir su contraseña maestra (*sin ella el archivo no se cargará y deberá intentar de nuevo*).

---

### SAVE PASSWORDS FUNTION

```javascript

  function savePasswordsToFile() {
    promptForMasterPassword((password) => {
      generateEncryptionKey(password).then(key => {
        encryptionKey = key;
        iv = crypto.getRandomValues(new Uint8Array(12)); // IV debe ser único para cada cifrado

        const passwordEntries = Object.entries(passwords);
        if (passwordEntries.length === 0) {
          alert("No hay contraseñas guardadas para descargar.");
          return;
        }

        let passwordText = "Red Social - Contraseña\n";
        // Eso ultimo no tiene utilidad pero aun asi esta
        passwordEntries.forEach(([network, password]) => {
          passwordText += `${network}: ${password}\n`;
        });

        return crypto.subtle.encrypt(
          {
            name: "AES-GCM",
            iv: iv
          },
          encryptionKey,
          new TextEncoder().encode(passwordText)
        ).then(encryptedText => {
          const blob = new Blob([iv, new Uint8Array(encryptedText)], { type: "application/octet-stream" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = "mypasswords.pai";
          // la extensión del archivo es PAI para comodidad
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        });
      });
    });
  }
```

> Se esta usando AES en modo GCM y PBKDF2 con SHA-256

* 🔵 AES-GCM no solo cifra los datos para mantenerlos confidenciales, sino que también incluye un mecanismo para verificar la integridad y autenticidad de los datos cifrados.
* 🔵 Rendimiento: Es conocido por su eficiencia y rendimiento, lo que lo hace adecuado para aplicaciones que requieren alta velocidad de cifrado y descifrado.
* 🔵 Uso Común: Es ampliamente adoptado en protocolos de seguridad como TLS (Transport Layer Security) y en aplicaciones que requieren cifrado seguro y rápido.

* 🔵 PBKDF2 es una función criptográfica utilizada para derivar claves seguras a partir de contraseñas.
* 🔵 Resistente a ataques de fuerza bruta y ataques de diccionario.
* 🔵 “Key stretching” y aumenta significativamente el tiempo necesario para romper una contraseña.
* 🔵 Sal: Un valor aleatorio que se añade a la contraseña para asegurar que contraseñas iguales no generen la misma clave derivada.
* 🔵 Iteraciones: El número de veces que se repite el proceso de derivación. Un mayor número de iteraciones aumenta la seguridad.

**generateEncryptionKey(password):**

```nx
 Genera una clave de cifrado a partir de una contraseña usando PBKDF2 con SHA-256. La sal utilizada es la propia contraseña, lo cual no es una práctica recomendada por motivos de seguridad, pero se hace aquí por simplicidad.
```

**savePasswordsToFile():**

```nx
 Guarda las contraseñas en un archivo cifrado. Primero, solicita una contraseña maestra, genera una clave de cifrado con ella, y luego cifra las contraseñas almacenadas en un objeto. El archivo resultante se descarga con la extensión .pai.
```

| Nombre | Descripción |
| --|--|
|Seguridad | Usar la contraseña como sal no es seguro (Esto se cambiará mas tarde). Es mejor usar una sal aleatoria. |
| Vector de inicialización | Se genera un IV único para cada cifrado, lo cual es correcto. |
| Cifrado | Utiliza AES-GCM, que es un modo de cifrado seguro y moderno. |
| AES-GCM | Advanced Encryption Standard - Galois/Counter Mode (Simetrico)|
| PBKDF2 |  Password-Based Key Derivation Function 2 |

---

### 🤝 Contributing

Contributions, issues and feature requests are welcome! Feel free to check issues page.

### 💜 Show your support

Give a ⭐️ if this *project helped you!*

### 📝 License

Copyright © 2024 [Rawier](https://rawier.vercel.app). This project is [MIT](/LICENSE) licensed.

---

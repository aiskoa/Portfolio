---
title: "GIE Encriptar y Desencriptar archivos"
excerpt: "¡Un cifrador y descifrador para archivos y carpetas!"
date: "Jul 03 2025"
cover_image: "/blog/gie.webp"
alt: "GIE"
tags1: "Go"
tags2: "Tools"
---

![GIE Header](https://i.ibb.co/KcDrDJvw/passpaititle.png)

# GIE

## 🔐 ¿Qué es GIE y para qué sirve?

*De forma resumida:*
Un cifrador y descifrador para archivos y carpetas para Windows, linux y macos, escrito en GO usando AES. 
**💜 GIE es cross-platform, funciona en Windows, Linux y macOS.**

Ejemplo: 
*Podra encriptar su archivo en windows y desencriptarlo en linux o viceversa*.

*En detalle:*
GIE (*Go-based Information Encryptor*), es una aplicación de escritorio multiplataforma construida utilizando el framework **Wails**. GIE está diseñada para el cifrado y descifrado seguro de archivos y directorios, aprovechando primitivas criptográficas robustas implementadas en **Go**. La aplicación tiene como objetivo proporcionar una interfaz fácil de usar para gestionar datos sensibles.

![Ejemplo de uso](https://i.postimg.cc/6pxZfhm8/Desktop2025-08-0906-27-27p-m-ezgif-com-optimize.gif)

### Versión

**GIE v1.2.5**

### 📦 Requisitos

- **Go v1.24+**
- **Wails v2.10+**
- **Node v22.17+**

## ❓ Características

- Cifra y descifra archivos y carpetas con AES, para cualquier tipo archivo sea.
- GIE sigue una arquitectura cliente-servidor facilitada por el framework Wails.
- Posiblidad de agregar pistas.
- Posibilidad de compartir archivos entre sistemas operativos.
- 3 niveles de protección (Bajo, Normal, Alto).
- Posibilidad de agregar un canal de cifrado para mayor seguridad.
- Ligero y facil de usar.
- Interfaz de usuario intuitiva y amigable.
- Open Source!.

### 🧑‍💻 Características tecnicas
Cifra y descifra tus archivos y carpetas con AES, para cualquier archivo sea: *jpg*, *zip*+, *mp4*, _mp3_, _docx_, _pdf_, etc...

GIE sigue una arquitectura cliente-servidor facilitada por el framework Wails. * Frontend (Cliente): Desarrollado con React (**Svelte**) y **TypeScript**, responsable de la interfaz de usuario y la interacción. Se comunica con el backend de **Go** a través de los mecanismos de comunicación entre procesos (IPC) de Wails. * Backend (Servidor): Implementado en Go, maneja toda la lógica central, incluyendo operaciones de archivo, procesos criptográficos e interacciones con el sistema.

GIE emplea un esquema de cifrado híbrido que combina **cifrado simétrico (AES CTR)** para la confidencialidad de los datos y un **Código de Autenticación de Mensajes (HMAC-SHA256)** para la integridad y autenticidad de los datos. La derivación de claves se realiza utilizando PBKDF2

Las claves de cifrado y HMAC se derivan de la contraseña del usuario utilizando PBKDF2(Password-Based Key Derivation Function 2) con SHA256 como función pseudoaleatoria. Se utilizan sales separadas para la clave AES y la clave HMAC para prevenir ataques entre protocolos. El número de iteraciones y la longitud de la clave son configurables según el nivel de cifrado elegido (Bajo, Normal, Alto).

La función PBKDF2 se define como:

$$
DK = PBKDF2(PRF,Password,Salt,Iterations,KeyLength)
$$

Donde: 
- `DK`: Clave Derivada 
- `PRF`: Función Pseudoaleatoria (HMAC SHA256 en este caso) 
- `Password`: Contraseña proporcionada por el usuario 
- `Salt`: Sal aleatoria (16 bytes) 
- `Iterations`: Número de iteraciones (ej., *10,000 para Bajo*, *800,000 para Normal*, *12,000,000 para Alto*) 
- `KeyLength`: Longitud deseada de la clave derivada (16 bytes para AES-128, 32 bytes para AES-256)

AES en modo Contador (CTR) se utiliza para cifrar el contenido del archivo. El modo CTR transforma un cifrado por bloques en un cifrado de flujo, permitiendo el cifrado/descifrado paralelo y el acceso directo a cualquier parte del texto cifrado. Se utiliza un Vector de Inicialización (IV) único y generado aleatoriamente de 16 bytes para cada operación de cifrado. El proceso de cifrado en modo CTR se puede representar conceptualmente como:

$$
C_{i} = E_{K}(Nonce||Counter_{i}) \oplus P_{i}
$$

Donde: 
- `Ci`: i-ésimo bloque de texto cifrado 
- `EK`: Función de cifrado AES con clave K
- `Nonce`: Un valor único para cada cifrado (parte del IV) 
- `Counteri`: Un contador que se incrementa para cada bloque 
- `Pi`: i-ésimo bloque de texto plano 
- `⊕`: Operación XOR a nivel de bits

*HMAC-SHA256* se utiliza para garantizar la integridad y autenticidad de los datos cifrados y sus metadatos asociados. 
El HMAC se calcula sobre todo el archivo cifrado, incluyendo la cabecera de metadatos (longitud de la pista, pista, canal, código de nivel de cifrado, sal AES, sal HMAC, IV CTR) y el texto cifrado. Esto evita la manipulación tanto de los datos como de sus parámetros críticos.

La función HMAC se define como:

$$
HMAC_{K}(m)=H((K⊕opad)||H((K ⊕ipad)||m))
$$

Donde: 
- `H`: Función hash (SHA256 en este caso) 
- `K`: Clave secreta (clave HMAC derivada) 
- `m`: Mensaje (metadatos || texto cifrado) 
- `ipad`: Relleno interno (0x36 repetido) 
- `opad`: Relleno externo (0x5C repetido) 
- `||`: Concatenación

### Estructura de Metodo

| Campo             | Tamaño (Bytes) | Descripción                                                                   |
|-------------------|----------------|-------------------------------------------------------------------------------|
| Pista             | Variable       | Longitud de la pista proporcionada por el usuario para el archivo                            |
| Canal             | 2              | uint16, un canal definido por el usuario para agrupar archivos                |
| Código Nivel Cifrado | 1              | byte, código que representa la fuerza del cifrado (0=Bajo, 1=Normal, 2=Alto) |
| Sal Clave AES     | 16             | Sal aleatoria para la derivación de la clave AES                              |
| Sal Clave HMAC    | 16             | Sal aleatoria para la derivación de la clave HMAC                             |
| IV CTR            | 16             | Vector de Inicialización aleatorio para AES-CTR                               |
| Texto Cifrado     | Variable       | Contenido cifrado del archivo original                                        |
| Etiqueta HMAC     | 32             | HMAC-SHA256 de todos los datos precedentes (metadatos + texto cifrado)        |

GIE proporciona una solución robusta y segura para el cifrado de archivos y directorios, construida sobre tecnologías multiplataforma modernas. Su diseño prioriza tanto la seguridad a través de prácticas criptográficas sólidas como la usabilidad a través de una interfaz gráfica responsiva

El siguiente diagrama de secuencia muestra el flujo de trabajo completo del procesamiento de archivos con llamadas a funciones reales:
![Flujo de la aplicación](https://i.ibb.co/JjVCxXnJ/032ff1f6-8b79-427b-a38d-b161ebd79422.png)

El backend se basa en una estructura central de la aplicación que actúa como controlador principal de la aplicación y expone métodos al frontend a través del marco Wails.
![Estructura de la aplicación y componentes principales](https://i.ibb.co/mVcC1jbL/image.png)

Si desea saber más a profundidad, puede consultar el [Repositorio de GitHub](https://github.com/aiskoa/GIE) para obtener detalles adicionales y ejemplos de uso.
De igual forma puede consultar con [DeepWiki](https://deepwiki.com/aiskoa/GIE)

## 💻 Instalación

Ejecuta los comandos según tu caso (Win o Linux)

Clona o descarga este repositorio

```batch
git@github.com:aiskoa/GIE.git
```

Cambia de directorio

```batch
cd GIE
```

Instala las dependencias

```batch
npm install
```
Y ejecuta

`wails build` para compilar la aplicación

> Asegurate de tener instalado la ultima versión de Wails, Node y Go en tu equipo.

**ATENCIÓN!!**

Si solo deseas usarla, puedes descargarla desde github o desde el sitio oficial según tu sistema.

**Desde Sitio Oficial:**
[⬇ Descargar GIE](https://gie-aiskoa.vercel.app)

**Requisitos Minimos:**
- Windows 10/11 / Debian / macOS Ventura o posterior
- 1 GB de espacio en disco
- 2 GB de memoria RAM

---

## 🔒 ¿Cómo Cifrar?

> De momento solo esta disponible mediante la GUI.

Para **Cifrar** una carpeta o archivo

- **Arrastre ó busque el archivo al programa (Interfaz Gráfica)**
- **Introduce una contraseña (Importante recordarla)**
- Escriba una pista parar la contraseña (Opcional)
- Elija el canal de cifrado (Opcional)
- Elija el nivel de cifrado (Opcional)
- **Clic en "Encrypt"**
- **Esto Convierte el archivo a (.gie)**

Una vez el archivo este cifrado en **.gie** este no podra ser abierto, leido o modificado.
Tenga en cuenta que GIE funciona para cualquier tipo de archivo, incluso para archivos grandes.

👀 **OJO** SI ENCRIPTA POR ERROR ALGÚN ARCHIVO O FUNCIONALIDAD DE **GIE** LA UNICA FORMA DE RESTAURARLO ES REINSTALANDO EL PROGRAMA!

**⚠️⚠️ IMPORTATE ⚠️⚠️**

- La unica forma de "recuperar" el achivo nuevamente es mediante el programa **GIE** desencriptandolo.
- Si deseas compartir el archivo con tu colega, amigo o equipo de trabajo, tendrás que proporcionarle el .gie, la contraseña utilizada y canal (si aplica).
- **SI OLVIDA O PIERDE LA CONTRASEÑA, NO PODRÁ RECUPERAR EL ARCHIVO SI NO SE ESCRIBIÓ UNA PISTA.**
- **SI PUSO UN CANAL TAMBIÉN DEBERÁ RECORDARLO DE LO CONTRARIO NO PODRÁ RECUPERAR EL ARCHIVO.**

![Ejemplo encriptando un PDF](https://i.postimg.cc/6pxZfhm8/Desktop2025-08-0906-27-27p-m-ezgif-com-optimize.gif)

## 🔓 ¿Cómo Descifrar?

> De momento solo esta disponible mediante la GUI.

Para **Desencriptar** un archivo

- **Arrastre ó busque el archivo (.gie) al programa (Interfaz Gráfica)**
- **Introduce la contraseña (Obligatorio)**
- Elija el canal de cifrado (Opcional)
- **Clic en "Decrypt"**
- **Esto Convierte el archivo a su estado natural**

Tenga en cuenta que solo funcionará para archivos **.gie** cifrados.
Solo funciona con archivos encriptados por GIE (Go-based Information Encryptor) actual v1.2.5 o superior.

👀 **OJO** NO FUNCIONARÁ CON ARCHIVOS .GIE VERSIÓN PYTHON, SOLO CON LA VERSIÓN ESCRITA EN GO!!

- La unica forma de "recuperar" el achivo nuevamente es mediante el programa **GIE** desencriptandolo.
- Si deseas compartir el archivo con tu colega, amigo o equipo de trabajo, tendrás que proporcionarle el .gie, la contraseña utilizada y canal (si aplica).
- **SI OLVIDA O PIERDE LA CONTRASEÑA, NO PODRÁ RECUPERAR EL ARCHIVO SI NO SE ESCRIBIÓ UNA PISTA.**
- **SI PUSO UN CANAL TAMBIÉN DEBERÁ RECORDARLO DE LO CONTRARIO NO PODRÁ RECUPERAR EL ARCHIVO.**

![Ejemplo desencriptando un PDF](https://i.postimg.cc/0yGwWJTc/ezgif-com-optimize.gif)

---

### Función de cifrado a directorios

```go
func (a *App) EncryptDirectory(dirPath string, password string, hint string, encryptionLevel string, channel int) string {
	if password == "" {
		return "Encryption failed: password cannot be empty."
	}

	// Check if path is actually a directory
	isDir, err := a.IsDirectory(dirPath)
	if err != nil {
		return fmt.Sprintf("Error checking if path is directory: %v", err)
	}
	if !isDir {
		return "Selected path is not a directory."
	}

	// Get all files in directory
	files, err := a.GetFilesInDirectory(dirPath)
	if err != nil {
		return fmt.Sprintf("Error getting files from directory: %v", err)
	}

	if len(files) == 0 {
		return "No files found in directory to encrypt."
	}

	// Track results
	var results []string
	successCount := 0

	for i, file := range files {
		fmt.Printf("Encrypting file %d/%d: %s\n", i+1, len(files), file)

		result := a.EncryptFile(file, password, hint, encryptionLevel, channel)
		if result == "success" {
			successCount++
			results = append(results, fmt.Sprintf("✓ %s", filepath.Base(file)))
		} else {
			results = append(results, fmt.Sprintf("✗ %s: %s", filepath.Base(file), result))
		}
	}

	// Return summary
	summary := fmt.Sprintf("Directory encryption completed: %d/%d files encrypted successfully", successCount, len(files))
	if successCount < len(files) {
		summary += "\n\nDetailed results:\n" + strings.Join(results, "\n")
	}

	return summary
}
```

### Función de desifrado a directorios

```go
func (a *App) DecryptDirectory(dirPath string, password string, channel int) string {
	if password == "" {
		return "Decryption failed: password cannot be empty."
	}

	// Check if path is actually a directory
	isDir, err := a.IsDirectory(dirPath)
	if err != nil {
		return fmt.Sprintf("Error checking if path is directory: %v", err)
	}
	if !isDir {
		return "Selected path is not a directory."
	}

	// Get all .gie files in directory
	var encryptedFiles []string

	err = filepath.Walk(dirPath, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return err
		}

		// Only add .gie files
		if !info.IsDir() && strings.HasSuffix(path, ".gie") {
			encryptedFiles = append(encryptedFiles, path)
		}
		return nil
	})

	if err != nil {
		return fmt.Sprintf("Error scanning directory: %v", err)
	}

	if len(encryptedFiles) == 0 {
		return "No encrypted files (.gie) found in directory to decrypt."
	}

	// Track results
	var results []string
	successCount := 0

	for i, file := range encryptedFiles {
		fmt.Printf("Decrypting file %d/%d: %s\n", i+1, len(encryptedFiles), file)

		result := a.DecryptFile(file, password, false, channel)
		if result == "success" {
			successCount++
			results = append(results, fmt.Sprintf("✓ %s", filepath.Base(file)))
		} else {
			results = append(results, fmt.Sprintf("✗ %s: %s", filepath.Base(file), result))
		}
	}

	// Return summary
	summary := fmt.Sprintf("Directory decryption completed: %d/%d files decrypted successfully", successCount, len(encryptedFiles))
	if successCount < len(encryptedFiles) {
		summary += "\n\nDetailed results:\n" + strings.Join(results, "\n")
	}

	return summary
}
```

---

### 📖 Documentación

[Consulte la Documentación y Guias de uso](https://gie-aiskoa.vercel.app/docs/)

## 📝 Changelog

[Consulte el Historial de Cambios](https://gie-aiskoa.vercel.app/changelog)

### ✍️ Lista de Tareas

- [x] Pista de la contraseña
- [ ] Cambio de tema
- [ ] Soporte en Android
- [ ] Soporte en iOS
- [ ] Posibilidad de uso desde terminal sin GUI (API o MCP)
- [x] Comprobación de contraseña
- [x] AES reforzado
- [x] Menú de interfaz de usuario
- [x] Encriptación de carpetas y directorios completos


### 🤝 Contribuyendo

¡Las contribuciones, los problemas y las solicitudes de características son bienvenidos! Siéntete libre de consultar la página de problemas.

### ❤️ Muestra tu apoyo

¡Da una ⭐️ si este proyecto te ayudó!

### 📝 Licencia

Copyright © 2024 [aiskoa](https://aiskoa.vercel.app). Este proyecto tiene licencia [MIT](https://github.com/aiskoa/GIE/blob/main/LICENSE).
---
title: "Metacrawler Borrador de Metadatos"
excerpt: "Software borrador de metadatos para archivos"
date: "Mar 27 2024"
cover_image: "/blog/metacrawlerimg.webp"
alt: "Metacrawler 2"
tags1: "JavaScript"
tags2: "Tools"
---

# Metacrawler 2

Nueva versión de Metacrawler, borra metadatos de cualquier formato de archivo, incluso creando una copia del mismo, ahora escrito en Javascript, usando Electron.

## Aquí está Metacrawler 2

![IMG](https://i.ibb.co/kqjLPSd/metacrawlerr.png)

## Cómo ejecutar

Descarga o clona el proyecto.

Para empezar, ejecuta el comando.

`npm install`

luego

`npm run start`

&nbsp;

## Ejemplo de código (Función Eliminar Metadatos)

```javascript
document.getElementById('fileInput').addEventListener('change', (event) => {
    filePath = event.target.files[0].path;
    removeMetadata(filePath);
});

function removeMetadata(filePath) {
    const originalFilePath = filePath + '_original';

    exiftool
        .write(filePath, { all: '' })
        .then(() => {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "¡Metadatos eliminados!",
            showConfirmButton: false,
            timer: 1500
          });
            ipcRenderer.send('download-file', filePath);

            fs.unlink(originalFilePath, err => {
                if (err) {
                    console.error(err);
                }
            });
        })
        .catch(err => console.error(err));
}

document.getElementById('downloadButton').addEventListener('click', () => {
    ipcRenderer.send('download-file', filePath);
});
```

> Descarga o clona el proyecto en Github.
[Descargar desde Github](https://github.com/aiskoadt/metacrawler)

### Licencia

MIT

&nbsp;

- 💜 Acceso al [--> Blog](https://aiskoa.vercel.app/es/blog/)

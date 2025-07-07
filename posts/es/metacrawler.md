---
title: "[🇺🇸] Metacrawler Metadata Eraser"
excerpt: "Metadata eraser software for files"
date: "Mar 27 2024"
cover_image: "/blog/metacrawlerimg.webp"
alt: "Metacrawler 2"
tags1: "JavaScript"
tags2: "Tools"
---

# Metacrawler 2

New version of Metacrawler, erases metadata from any file format, even creating a copy of it, now written in Javascript, using Electron.

## Here is Metacrawler 2

![IMG](https://i.ibb.co/kqjLPSd/metacrawlerr.png)

## How to run

Download or clone the project.

To start run the command.

`npm install`

then

`npm run start`

&nbsp;

## Code example (Remove Metadata Function)

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

> Download or Clone the project in Github.
[Download from Github](https://github.com/Rawierdt/metacrawler)

### License

MIT

&nbsp;

- 💜 Acceso al [--> Blog](https://rawier.vercel.app/es/blog/)
---
title: "Clon de Spotify para las Sesiones de Diana"
excerpt: "Aplicación de música (electron), para las Sesiones de Diana de Riot Games Music"
date: "Aug 14 2022"
cover_image: "/blog/dianasessions.webp"
alt: "entities"
tags1: "JavaScript"
tags2: "Tools"
---

![Captura](https://raw.githubusercontent.com/aiskoa/Chilltify/main/Screenshots/Index.png)

## Instalación

* La guía completa se puede encontrar en [GitHub](https://github.com/aiskoa/Chilltify)

<h1 align="center">🌜 Música Lofi - Sesiones de Diana 🌛</h1>

[![license](https://img.shields.io/github/license/KillahPotatoes/KP-Liberation.svg)](/LICENSE)

[![GitHub Release Date](https://img.shields.io/github/release-date/KillahPotatoes/KP-Liberation.svg)](https://github.com/aiskoa/Chilltify/releases)

[![GitHub contributors](https://img.shields.io/github/contributors/KillahPotatoes/KP-Liberation)](https://github.com/aiskoa/Chilltify/contributors)

[![GitHub forks](https://img.shields.io/github/forks/KillahPotatoes/KP-Liberation)](https://github.com/aiskoa/Chilltify/network)

<p align="center">
  Aplicación de música Lofi hecha en electron, basada en las "Sesiones de Diana" de Riot Games Music.

> Este proyecto fue hecho solo con fines educativos, y la música proviene originalmente de [Riot Games Music](https://www.youtube.com/c/riotgamesmusic)

## Descargar

Disponible para Mac, Linux y Windows.

Instalador `.exe` solo disponible para Windows.

[Instalador de Windows](https://drive.google.com/uc?export=download&confirm=01yo&id=1jaOdnnbRDlwPOBI3_pnWF0P0E6ASZKUS)

[MacOS](https://drive.google.com/drive/folders/1LOYV_qe18X_R_i_79w7tK7rw661Jzd10?usp=sharing)

[Linux](https://drive.google.com/drive/folders/1_6AQhmQ0W0Uni2w_MwGZR6uMiy_oZVb7?usp=sharing)

## Licencia
💜 [Licencia MIT](https://github.com/aiskoa/Chilltify/blob/main/LICENSE)

### Ejemplo de Código

```javascript
//Llamamos a createwindow de main.js
const {createWindow} = require('./main')
const {app} = require('electron')
const path = require('path');
//Llamamos al modulo de electron
require('electron-reload')(__dirname, {
    electron: path.join(__dirname, 
    'node_modules/.bin/electron')
});
app.allowRendererProcessReuse = false;
//Para Mac Os "darwin", cuando se pulse 
//salir, 
//debera invocar el metodo quit del 
//objeto app 
app.whenReady().then(createWindow)
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {  
        app.quit()
    }
});
//Para Mac Os, cuando la aplicacion 
//se quede en el dock este 
// reactivarse con el evento activate
app.on('activate', function() {
    if (BrowserWindow.getAllWindows
    ().length === 0){
        createWindow();
    }
});
```
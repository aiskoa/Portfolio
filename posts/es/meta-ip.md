---
title: "Metacrawler & IPTrack"
excerpt: "Borrador de metadatos y búsqueda de IP"
date: "Apr 23 2023"
cover_image: "/blog/metacrawler.webp"
tags1: "Helpdesk"
tags2: "Tools"
---

# Tidex

2 programas escritos en Python Metacrawler (Borrador de metadatos) y IPTracker (Búsqueda de IP).

&nbsp;

* Metacrawler: Borra metadatos en cualquier archivo de imagen o foto.
* IPTracker: Encuentra la ubicación de una dirección IP proporcionada por URL (opcional) y encuentra sus puertos abiertos, además de generar un informe de direcciones IP maliciosas.

&nbsp;

## Aquí está Metacrawler

![IMG](https://i.ibb.co/Qv9TfyZ/Metacrawler.png)

Ejemplo de código para Metacrawler

```python
# Se eliminan los metadatos
def remove_exif():
    global image_path
    image = Image.open(image_path)
    try:
        for key in image.info:
            if key in ExifTags.TAGS:
                del image.info[key]
        image.save(image_path)
    except:
        pass

# Se carga la imagen
def load_image():
    global filename, image_path
    root = tk.Tk()
    root.withdraw()
    image_path = filedialog.askopenfilename()
    if image_path:
        filename = os.path.basename(image_path)
        image = pygame.image.load(image_path)
        screen.blit(image, (0, 0))
        remove_exif()
```

&nbsp;
Ejemplo de código para IPTrack
## Aquí está IPTracker

![IMG](https://i.ibb.co/tbTMP0g/IPTracker.png)

```python
# Verificar si la dirección IP es maliciosa utilizando la API de VirusTotal
def is_malicious(ip, api_key):
    url = f'https://www.virustotal.com/api/v3/ip_addresses/{ip}'
    headers = {'x-apikey': api_key}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        stats = data.get('attributes', {}).get('last_analysis_stats', {})
        if stats.get('malicious') or stats.get('suspicious'):
            return True
    return False
```

## Modificar

En IPTracker
`api_key = 'API_KEY_HERE' con tu clave API de VirusTotal`

[Descargar aquí desde GitHub](https://github.com/Rawierdt/Metacrawler-IPTracker)

[Ver la última versión](https://github.com/Rawierdt/Metacrawler-IPTracker/releases/tag/Metacrawlerv1)

&nbsp;

~ [Rawier](https://rawier.vercel.app/portfolio)💜
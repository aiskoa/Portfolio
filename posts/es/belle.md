---
title: "GIE Encriptar y Desencriptar archivos"
excerpt: "¡Un cifrador y descifrador para archivos y carpetas!"
date: "Jul 03 2025"
cover_image: "/blog/belle.webp"
alt: "GIE"
tags1: "Go"
tags2: "Tools"
---

![Belle Header](https://i.ibb.co/CptY9gzM/title2.png)

[![Static Badge](https://img.shields.io/badge/%20build-MIT-brightgreen?logo=github&label=LICENSE)](https://github.com/aiskoa/BELLE/LICENSE)
![Static Badge](https://img.shields.io/badge/FEBRUARY%202025-yellow?label=RELEASE%20DATE)
![Static Badge](https://img.shields.io/badge/LANGUAGE-Go-blue?logo=go)

# BELLE

## 🔐 Qué es Belle y para qué sirve?

*De forma resumida:*
Belle es una aplicación de escritorio multiplataforma (Windows, Linux y macOS) diseñada para la creación y gestión de informes de ciberseguridad, especialmente pentesting. Permite a los usuarios estructurar hallazgos, agregar evidencia y generar informes profesionales en diversos formatos.

> [!NOTE]
> Disclaimer: Esta es solo una herramienta para crear reportes.

*Algunos ejemplos usando BELLE:*

[Doc](https://drive.google.com/file/d/1AUxPmv_p5vBa8ajfXQF_-snrgrmgg8Ly/view?usp=sharing)

[Vulnversity](https://drive.google.com/file/d/1gkD94lRSYaorLr0cYcpJn_2-CPHzUlEO/view?usp=sharing)

---

**💜 Belle es cross-platform, funciona en Windows, Linux y macOS.**

Ejemplo:
Un analista de seguridad puede documentar las vulnerabilidades encontradas en una auditoría, incluir capturas de pantalla, fragmentos de código y recomendaciones, y luego exportar el informe completo a PDF o LaTeX con solo unos pocos clics.

*En detalle:*
Belle facilita la organización de fases de un informe, la adición de entradas detalladas para cada hallazgo (con campos para severidad, descripción, recomendaciones, comandos de shell, fragmentos de código, URLs e imágenes). Su enfoque está en la eficiencia y la personalización, permitiendo la integración de logos y la exportación a formatos estándar de la industria.

![UI](https://i.postimg.cc/rFXXXsCH/op7.png)

![UI2](https://i.postimg.cc/PrYHPY5P/Captura-de-pantalla-2026-02-20-185209.png)

### Versión

**BELLE v2.0.0**

### 📦 Requisitos

- **Go v1.20+**
- **Node.js 16.0+** (Para la gestión de dependencias del frontend)
- **Wails CLI v2.0+** (Para compilar y ejecutar la aplicación)
- **Pandoc** (Herramienta para la conversión de documentos, esencial para la exportación a PDF/LaTeX)
- **Una distribución LaTeX (ej. TeX Live o MiKTeX)** (Necesaria para la generación de PDFs de alta calidad)

## ❓ Características

- **Generación de Informes de Pentesting:** Crea informes estructurados con fases, hallazgos y detalles.
- **Editor Markdown Integrado:** Permite la edición de contenido utilizando Markdown.
- **Gestión de Vulnerabilidades:** Añade, edita y elimina entradas de vulnerabilidades con campos ricos en detalles.
- **Exportación Flexible:** Exporta informes a PDF, LaTeX, Markdown y un formato `.belle` propietario para facilitar la colaboración.
- **Soporte Multimedia:** Inserta imágenes, tablas, fragmentos de código y URLs en los hallazgos.
- **Personalización Visual:** Incluye logo del cliente, imágenes de portada y personalización de colores.
- **Soporte Multi-idioma:** Interfaz y plantillas de informes disponibles en español e inglés.
- **Integración con LLMs (Opcional):** Asistencia para la redacción de recomendaciones o la mejora de texto mediante Gemini, Claude o OpenRouter.

### 🧑‍💻 Características técnicas

- **Backend:** Go (con el framework Wails para la integración con el frontend).
- **Frontend:** Svelte (un framework reactivo para la interfaz de usuario).
- **Gestión de estado:** Context API de Go, Svelte stores.
- **Construcción y empaquetado:** Wails y Vite.
- **Generación de documentos:** Pandoc para la conversión de Markdown a LaTeX/PDF.
- **Manejo de imágenes:** Procesamiento y redimensionamiento de imágenes en el backend.
- **Persistencia:** Almacenamiento de proyectos y configuraciones en archivos JSON.

### Estructura
El proyecto `BELLE` sigue una estructura organizada:
- `app.go`: Contiene la lógica principal del backend de Go, interactuando con el frontend a través de Wails.
- `main.go`: Punto de entrada de la aplicación Wails.
- `structs.go`: Define las estructuras de datos utilizadas en el proyecto (e.g., `Vulnerability`, `BelleProject`).
- `frontend/`: Contiene todo el código del frontend (Svelte, JavaScript, CSS).
- `translations.json`: Archivo de traducciones para la aplicaci贸n.
- Otros archivos de configuración y recursos.

## 💻 Instalación

Para instalar y ejecutar Belle, sigue estos pasos:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/aiskoa/BELLE.git
    cd BELLE
    ```
2.  **Instalar dependencias de Node.js:**
    ```bash
    npm install
    ```
3.  **Compilar y ejecutar la aplicación:**
    Asegúrate de tener instalados Go, Node.js y la CLI de Wails.
    ```bash
    wails build # Para construir el ejecutable
    wails dev   # Para ejecutar en modo desarrollo
    ```
    Si encuentras errores al exportar a PDF, asegúrate de tener Pandoc y una distribución LaTeX (como TeX Live o MiKTeX) instalados y configurados en tu PATH.

---

### Función de ejemplo

Un ejemplo de cómo interactuar con el backend de Belle desde el frontend es la función `ExportMarkdown`. Esta función toma los datos del proyecto y los exporta a un archivo Markdown.

```go
func (a *App) ExportMarkdown(projectData string) (string, error) {
	// Prevenir condiciones de carrera para la exportaci贸n a Markdown
	a.exportMDMutex.Lock()
	defer a.exportMDMutex.Unlock()

	runtime.EventsEmit(a.ctx, "export-progress", map[string]interface{}{"type": "markdown", "stage": "inicio", "percent": 5})
	var project BelleProject
	err := json.Unmarshal([]byte(projectData), &project)
	if err != nil {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.ErrorDialog,
			Title:   "Error",
			Message: "No se pudo parsear los datos del proyecto para Markdown: " + err.Error(),
		})
		return "", err
	}

	runtime.EventsEmit(a.ctx, "export-progress", map[string]interface{}{"type": "markdown", "stage": "generando contenido", "percent": 40})
	md, err := a.GenerateMarkdown(project, nil) // Llama a una función interna para generar el contenido Markdown
	if err != nil {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.ErrorDialog,
			Title:   "Error",
			Message: "No se pudo generar el Markdown: " + err.Error(),
		})
		return "", err
	}

	// Abre un diálogo para que el usuario guarde el archivo
	filePath, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title:           "Exportar a Markdown",
		DefaultFilename: "reporte.md",
		Filters: []runtime.FileFilter{
			{DisplayName: "Markdown (*.md)", Pattern: "*.md"},
		},
	})
	if err != nil {
		return "", err
	}
	if filePath == "" {
		return "", nil
	}

	runtime.EventsEmit(a.ctx, "export-progress", map[string]interface{}{"type": "markdown", "stage": "guardando archivo", "percent": 80})
	err = os.WriteFile(filePath, []byte(md), 0644) // Escribe el contenido en el archivo
	if err != nil {
		return "", err
	}

	runtime.EventsEmit(a.ctx, "export-progress", map[string]interface{}{"type": "markdown", "stage": "finalizado", "percent": 100})
	runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Type:    runtime.InfoDialog,
		Title:   "脡xito",
		Message: "Reporte en Markdown exportado correctamente.",
	})
	return "ok", nil
}
```

> Asegurate de tener instalado la ultima versión de Wails, Node y Go en tu equipo.

**ATENCIÓN!!**

Si solo deseas usarla, puedes descargarla desde github o desde el sitio oficial según tu sistema.

**Desde Sitio Oficial:**
[⬇ Descargar Belle](https://edurne-ac.github.io/Belle-Reports/)

---

### TODO List

- [x] LLM
- [ ] Bloqueo por password PDF
- [ ] Mejor UI
- [ ] Templetes

### 🤝 Contribuyendo

¡Las contribuciones, los problemas y las solicitudes de características son bienvenidos! Siéntete libre de consultar la página de problemas.

### ❤️ Muestra tu apoyo

¡Da una ⭐️ si este proyecto te ayudó!

### 📝 Licencia

Copyright © 2026 [aiskoa](https://aiskoa.vercel.app). Este proyecto tiene licencia [MIT](https://github.com/Edurne-AC/BELLE/blob/main/LICENSE).
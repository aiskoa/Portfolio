---
title: "Belle pentesting report tool"
excerpt: "A LaTeX pentesting report creator!"
date: "Feb 08 2026"
cover_image: "/blog/belle.webp"
alt: "Belle"
tags1: "Go"
tags2: "Tools"
---

![Belle Header](https://i.ibb.co/CptY9gzM/title2.png)

[![Static Badge](https://img.shields.io/badge/%20build-MIT-brightgreen?logo=github&label=LICENSE)](https://github.com/aiskoa/BELLE/LICENSE)
![Static Badge](https://img.shields.io/badge/FEBRUARY%202025-yellow?label=RELEASE%20DATE)
![Static Badge](https://img.shields.io/badge/LANGUAGE-Go-blue?logo=go)

# BELLE

## 🔐 What is Belle and what is it for?

*In summary:*
Belle is a cross-platform desktop application (Windows, Linux, and macOS) designed for the creation and management of cybersecurity reports, especially for pentesting. It allows users to structure findings, add evidence, and generate professional reports in various formats.

> [!NOTE]
> Disclaimer: This is only a tool for creating reports.

*Some report examples using BELLE:*

[Doc](https://drive.google.com/file/d/1AUxPmv_p5vBa8ajfXQF_-snrgrmgg8Ly/view?usp=sharing)

[Vulnversity](https://drive.google.com/file/d/1gkD94lRSYaorLr0cYcpJn_2-CPHzUlEO/view?usp=sharing)

---

**💜 Belle is cross-platform, working on Windows, Linux, and macOS.**

Example:
A security analyst can document vulnerabilities found during an audit, include screenshots, code snippets, and recommendations, then export the complete report to PDF or LaTeX with just a few clicks.

*In detail:*
Belle facilitates the organization of report phases, the addition of detailed entries for each finding (with fields for severity, description, recommendations, shell commands, code snippets, URLs, and images). Its focus is on efficiency and customization, allowing for the integration of logos and export to industry-standard formats.

![UI](https://i.postimg.cc/rFXXXsCH/op7.png)

![UI2](https://i.postimg.cc/PrYHPY5P/Captura-de-pantalla-2026-02-20-185209.png)

### Version

**BELLE v2.0.0**

### 📦 Requirements

- **Go v1.20+** 
- **Node.js 16.0+** (For frontend dependency management)
- **Wails CLI v2.0+** (For building and running the application)
- **Pandoc** (Document conversion tool, essential for PDF/LaTeX export)
- **A LaTeX distribution (e.g., TeX Live or MiKTeX)** (Required for high-quality PDF generation)

## ❓ Features

- **Pentesting Report Generation:** Create structured reports with phases, findings, and details.
- **Integrated Markdown Editor:** Allows content editing using Markdown.
- **Vulnerability Management:** Add, edit, and delete vulnerability entries with rich detail fields.
- **Flexible Export:** Export reports to PDF, LaTeX, Markdown, and a proprietary `.belle` format for easy collaboration.
- **Multimedia Support:** Insert images, tables, code snippets, and URLs into findings.
- **Visual Customization:** Include client logos, cover images, and color scheme customization.
- **Multi-language Support:** User interface and report templates available in Spanish and English.
- **LLM Integration (Optional):** Assistance for drafting recommendations or improving text using Gemini, Claude, or OpenRouter.

### 🧑‍💻 Technical Characteristics

- **Backend:** Go (with the Wails framework for frontend integration).
- **Frontend:** Svelte (a reactive framework for the user interface).
- **State Management:** Go's Context API, Svelte stores.
- **Build and Packaging:** Wails and Vite.
- **Document Generation:** Pandoc for Markdown to LaTeX/PDF conversion.
- **Image Handling:** Backend processing and resizing of images.
- **Persistence:** Project and configuration storage in JSON files.

### Structure
The `BELLE` project follows an organized structure:
- `app.go`: Contains the main Go backend logic, interacting with the frontend via Wails.
- `main.go`: Entry point for the Wails application.
- `structs.go`: Defines data structures used in the project (e.g., `Vulnerability`, `BelleProject`).
- `frontend/`: Contains all frontend code (Svelte, JavaScript, CSS).
- `translations.json`: Application translation file.
- Other configuration and resource files.

## 💻 Installation

To install and run Belle, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/aiskoa/BELLE.git
    cd BELLE
    ```
2.  **Install Node.js dependencies:**
    ```bash
    npm install
    ```
3.  **Compile and run the application:**
    Ensure you have Go, Node.js, and the Wails CLI installed.
    ```bash
    wails build # To build the executable
    wails dev   # To run in development mode
    ```
    If you encounter errors when exporting to PDF, ensure you have Pandoc and a LaTeX distribution (like TeX Live or MiKTeX) installed and configured in your PATH.

---

### Example Function

An example of how to interact with Belle's backend from the frontend is the `ExportMarkdown` function. This function takes project data and exports it to a Markdown file.

```go
func (a *App) ExportMarkdown(projectData string) (string, error) {
	// Prevent race conditions for Markdown export
	a.exportMDMutex.Lock()
	defer a.exportMDMutex.Unlock()

	runtime.EventsEmit(a.ctx, "export-progress", map[string]interface{}{"type": "markdown", "stage": "start", "percent": 5})
	var project BelleProject
	err := json.Unmarshal([]byte(projectData), &project)
	if err != nil {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.ErrorDialog,
			Title:   "Error",
			Message: "Could not parse project data for Markdown: " + err.Error(),
		})
		return "", err
	}

	runtime.EventsEmit(a.ctx, "export-progress", map[string]interface{}{"type": "markdown", "stage": "generating content", "percent": 40})
	md, err := a.GenerateMarkdown(project, nil) // Calls an internal function to generate Markdown content
	if err != nil {
		runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
			Type:    runtime.ErrorDialog,
			Title:   "Error",
			Message: "Could not generate Markdown: " + err.Error(),
		})
		return "", err
	}

	// Opens a dialog for the user to save the file
	filePath, err := runtime.SaveFileDialog(a.ctx, runtime.SaveDialogOptions{
		Title:           "Export to Markdown",
		DefaultFilename: "report.md",
		Filters: []runtime.FileFilter{
			{DisplayName: "Markdown (*.md)", Pattern: "*.md"},
		},
	})
	if err != nil {
		return "", err
	}
	if filePath == "" {
		return "", nil // User canceled
	}

	runtime.EventsEmit(a.ctx, "export-progress", map[string]interface{}{"type": "markdown", "stage": "saving file", "percent": 80})
	err = os.WriteFile(filePath, []byte(md), 0644) // Writes the content to the file
	if err != nil {
		return "", err
	}

	runtime.EventsEmit(a.ctx, "export-progress", map[string]interface{}{"type": "markdown", "stage": "finished", "percent": 100})
	runtime.MessageDialog(a.ctx, runtime.MessageDialogOptions{
		Type:    runtime.InfoDialog,
		Title:   "Success",
		Message: "Markdown report exported successfully.",
	})
	return "ok", nil
}
```

> Make sure you have the latest version of Wails, Node and Go installed on your computer.

**ATTENTION!!**

If you just want to use it, you can download it from github or from the official site according to your system.

**From Official Site:**
[⬇ Download Belle](https://edurne-ac.github.io/Belle-Reports/)

---

### TODO List

- [x] LLM
- [ ] Password Lock PDF
- [ ] Better UI
- [ ] Templetes

### 🤝 Contributing
Contributions, issues and feature requests are welcome! Feel free to check issues page.

### ❤️ Show your support
Give a ⭐️ if this project helped you!

### 📝 License

Copyright © 2026 [aiskoa](https://aiskoa.vercel.app). This project is [MIT](https://github.com/Edurne-AC/BELLE/blob/main/LICENSE) licensed.

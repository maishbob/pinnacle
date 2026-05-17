# Pinnacle - Innovative Tech Solutions

Welcome to the **Pinnacle** website project. This repository contains the source code for the official website of Pinnacle, a company specializing in custom software development, mobile apps, cloud solutions, and data analytics.

## 📖 Project Overview

This is a **responsive static website** designed to showcase Pinnacle's services, team, portfolio, and contact information. It is built with modern web standards and optimized for performance and accessibility.

### Key Sections:
- **Hero**: engaging introduction with a call to action.
- **Clients**: Logo showcase of trusted industry leaders.
- **Services**: Detailed breakdown of offerings (Software Dev, Mobile Apps, Cloud, etc.).
- **Process**: Outline of the development methodology.
- **Featured Projects**: Case studies of past work.
- **Testimonials**: Client success stories.
- **Team**: Introduction to the leadership team.
- **Contact**: Functional contact form and location details.

## 🛠 Technologies Used

- **HTML5**: Semantic markup with `<main>`, `<nav>`, `<section>`, `<footer>` landmarks.
- **CSS3**: Inline in `index.html` — Flexbox/Grid layout, CSS custom properties, responsive design.
  - Google Fonts (Syne & DM Sans).
- **JavaScript**: Inline vanilla JS for mobile hamburger menu.

## 📂 Project Structure

```
Pinnacle/
│
├── images/              # Logos and client assets
│
├── index.html           # Main landing page (CSS and JS self-contained)
├── index-old.html       # Previous version (archived)
└── README.md            # Project documentation
```

## 🚀 Getting Started

Since this is a static website, you don't need a complex build process.

### Prerequisites
- A modern web browser (Chrome, Firefox, Edge, Safari).
- A text editor (VS Code, Sublime Text) for making changes.

### Running Locally
1. **Clone or Download** the repository.
2. Open the project folder.
3. specific steps:
   - **Direct Open**: Double-click `index.html` to open it in your default browser.
   - **Local Server (Recommended)**: Use a simple HTTP server to avoid CORS issues with some resources.
     - With Python: `python -m http.server 8000`
     - With PHP: `php -S localhost:8000`
     - With Node.js (`serve`): `npx serve .`
4. Navigate to `http://localhost:8000` (if using a server).

## 🎨 Customization

- **Content**: Edit `index.html` to update text, links, and structure.
- **Styles**: Modify `css/styles.css` to change colors, fonts, and layout.
- **Scripts**: Update `js/main.js` to adjust behaviors like the specialized sliders or form handling.
- **Images**: Replace assets in the `images/` folder. Ensure filenames match or update the references in HTML/CSS.

## 📄 License

This project is proprietary to Pinnacle. All rights reserved.

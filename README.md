# Digital College ID Card Generator 🎓

An interactive, production-ready web application built with **React**, **Vite**, **JavaScript**, and modern **CSS** that allows students to enter personal and academic details and receive an **instant, high-fidelity digital college ID card preview** with real scannable QR codes, realistic smart chip & security holograms, signature stamps, and high-resolution PNG / PDF export.

---

## Project Description

The **Digital College ID Card Generator** is a modern credential generation studio designed for higher education institutions, colleges, and universities. It bridges the gap between digital credential records and physical ID cards by offering real-time dynamic rendering as students type their information.

Students can personalize their ID badges, choose from authentic university themes, upload their portrait photo with immediate client-side rendering, toggle between front and reverse sides of the card, and export high-DPI printable credentials for institutional verification.

---

## Features

- 🌌 **Aurora Background System**: Dynamic, animated soft aurora beams, cosmic void base, cyber grid matrix overlay, and twinkling starfield.
- 🧊 **Glassmorphism ID Card**: Frosted glass blur (`backdrop-filter: blur(24px)`), semi-transparent surfaces, and crisp institutional typography.
- 🌈 **Holographic Security Border**: Multi-stop continuous color-shifting gradient border (`Cyan → Blue → Purple → Pink → Orange → Cyan`) and periodic diagonal light sweep reflection.
- 🎴 **Physical 3D Tilt Stage**: Interactive perspective tilt reacting to cursor movements with specular mouse glare and zero-lag direct CSS custom property updates.
- ✨ **Global Mouse Glow**: Fluid, lerp-interpolated cursor follower providing soft ambient lighting across the dashboard.
- 🧩 **Bento Grid Dashboard**: Modular glass cards for Student Information, College Selection, Logo Studio, Theme Studio, Profile Photo, and Quick Actions Dock.
- 💾 **Local Storage Save/Load Draft**: Persist all student information, custom logos, and selected themes to the browser for instant recall anytime.
- ⚡ **Instant Live Preview**: Dynamic dual-binding updates the ID card badge in real time as the user types.
- 🪪 **Authentic CR80 Portrait Badge Design**: Formatted according to standard institutional ID specifications, complete with lanyard slot punch, security microchip, and rainbow hologram seal.
- 🏛️ **Select College Dropdown with Sample Institutions & Custom Mode**:
  - Pre-loaded with 12 recognized universities:
    * *Vignan's Foundation for Science, Technology and Research (VFSTR)*
    * *Vignan University*
    * *KL University*
    * *GITAM University*
    * *Andhra University*
    * *Acharya Nagarjuna University*
    * *IIT Hyderabad*
    * *NIT Warangal*
    * *IIIT Hyderabad*
    * *University of Hyderabad*
    * *SRM University*
    * *Amrita Vishwa Vidyapeetham*
  - **Custom College Option**: Allows entering College Name, College Short Name, and College Location with instant live propagation to the ID card.
- 🎨 **Automatic Demo Logos & Custom Logo Creator**:
  - **Authentic Placeholder Logos**: Unique, non-infringing vector demo logos designed for every sample college (`VF`, `VU`, `KL`, `G`, `AU`, `ANU`, `IITH`, `NITW`, `IIITH`, `UoH`, `SRM`, `AVV`).
  - **Automatic Logo Switching**: Selecting any college instantly switches the logo on the card badge.
  - **🖼️ Upload College Logo**: Upload any PNG, JPG, JPEG, or SVG file with immediate card badge replacement.
  - **Remove Logo**: 1-click button restoring the selected college's default demo logo.
  - **🎨 Custom Logo Creator Studio**: Modern two-column modal with live preview:
    * *Logo Text*: College Initials / Short Name (e.g. `VFSTR`)
    * *Logo Shape*: Circle, Shield, Square, Rounded Square, Hexagon, Badge
    * *Logo Icon*: 🎓 Education, 🏫 College, 📚 Books, 🔬 Science, 💻 Technology, ⭐ Star, 🏛️ University, 🌐 Global
    * *Logo Style*: Solid, Gradient, Outline
    * *Background Color*: Interactive color picker with live hex code
    * *Text Color*: Interactive color picker with live hex code
    * *Border*: None, Thin, Medium, Thick
    * *Logo Size Slider*: Dynamic badge sizing slider
    * *Live Preview*: Instant vector rendering updating on every keystroke or slider change!
- 📋 **Pre-Populated Academic & Personal Option Dropdowns**:
  - **Father's / Guardian's Name**: Dedicated bio field on the form, rendered on the ID card badge and embedded into the camera QR code.
  - **Academic Session Dropdown**: Pre-populated with 15+ standard 4-year, 3-year, 2-year, and 5-year sessions (e.g. `2024 - 2028`, `2025 - 2029`, etc.) with 1-click toggle to type custom.
  - **Department**: 18+ comprehensive engineering, science, business, and humanities departments (with custom input toggle).
  - **Course / Program**: 20+ undergraduate, graduate, and doctorate programs (with custom input toggle).
  - **Section**: Options from **Section 1 through Section 22**, plus letter batches.
  - **Year of Study**: 1st Year through Ph.D Scholar.
- 🔄 **Front & Back Flip View**: Interactive toggle to inspect both the front credential face and the reverse regulatory side (terms, campus helpline, return policy, and barcode).
- 📱 **Real Scannable QR Code & Barcode**:
  - **Camera-Scannable QR**: Powered by `qrcode.react`, embedding student verification text readable by iPhone Camera, Google Lens, or Android scanners.
  - **Code 128 Barcode**: High-contrast, optical scanner-ready canvas barcode (`jsbarcode`) on both front and back of badge, plus an interactive "Test Scanners" inspection modal.
- 🎨 **Institutional Theme Presets**:
  - *Royal Navy & Gold*
  - *Crimson & Bronze*
  - *Emerald & Silver*
  - *Imperial Violet & Cyan*
  - *Midnight Onyx*
- 📸 **Live Photo Upload**: Client-side image handling using `FileReader` (base64 Data URL) with drag-and-drop support, thumbnail preview, change/removal, and fallback default avatar.
- 🖨️ **High-Definition Export**:
  - **Download PNG**: Crystal-clear 3x scale image rasterization via `html2canvas`.
  - **Download PDF**: Formatted standard CR80 printable card document generated via `jsPDF`.
- 🛡️ **Controlled Form Validation**: Friendly validation checks ensuring essential academic fields are completed before credential issuance.
- 🔄 **One-Click Reset & Auto-Fill**: Reset button wipes custom data and safely restores default sample badge; Auto-fill provides rapid testing data.
- 📱 **Fully Responsive Layout**: Two-column layout on desktop, stacked touch-friendly interface on tablets and smartphones with zero overflow.

---

## Technologies Used

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Declarative Component-Based User Interface |
| **Vite** | Lightning-fast frontend build tooling and development server |
| **JavaScript (ES6+)** | Application logic, event listeners, and asynchronous file handlers |
| **CSS3** | Glassmorphism, custom design tokens, responsive CSS grid/flexbox, animations |
| **html2canvas** | High-DPI DOM element rasterization for image download |
| **jsPDF** | Client-side PDF document compilation |
| **qrcode.react** | Dynamic vector SVG QR code generation |
| **lucide-react** | Clean, accessible vector icons |
| **canvas-confetti** | Celebration visual cue on successful credential validation |

---

## React Concepts Demonstrated

1. **Controlled Forms**: Every form input (`<input>`, `<select>`, `<textarea>`) is bound directly to React state via `value` and controlled via `onChange`.
2. **useState Hook**:
   - `student`: Master object storing personal, academic, and contact fields.
   - `errors`: Object tracking active field-level validation errors.
   - `selectedTheme`: Active visual styling palette for the ID card.
   - `activeSide`: Toggling between `'front'` and `'back'` card views.
   - `isGenerated` & `isDownloading`: Lifecycle and asynchronous export state management.
3. **Props & Component Reusability**:
   - Modular decomposition: `Header`, `StudentForm`, `FormInput`, `IDCard`, and `Footer`.
   - `FormInput` serves as an all-in-one reusable component for text inputs, select dropdowns, and textareas.
4. **Dynamic Rendering**:
   - Theme chips rendered dynamically from config array.
   - Live QR code payload computed on-the-fly from student inputs.
5. **Conditional Rendering**:
   - Validation warning banner displayed only when errors exist.
   - Success badge and celebration confetti displayed when validation passes.
   - Uploaded photo rendered when present, fallback vector avatar rendered when absent.
   - Card front versus back face rendered conditionally based on `activeSide`.
6. **Event Handling**:
   - File drag-and-drop (`onDrop`, `onDragOver`).
   - Image file processing via `FileReader.onload`.
   - Prevent default form submissions (`e.preventDefault()`).
   - Asynchronous PDF and PNG export button actions.

---

## Project Structure

```
digital-college-id-generator/
├── .gitignore               # Git exclusions (node_modules, dist, .env)
├── README.md                # Comprehensive documentation
├── index.html               # Entry HTML template with typography imports
├── package.json             # NPM package declarations and scripts
├── vite.config.js           # Vite build and dev configuration
├── public/
│   └── college-crest.svg    # Official academic crest vector graphic
└── src/
    ├── main.jsx             # React DOM root entrypoint
    ├── App.jsx              # Root component & central state orchestrator
    ├── index.css            # Global design tokens, typography, resets
    ├── App.css              # Glassmorphic form, CR80 badge, responsive layout
    ├── utils/
    │   └── defaultData.js   # Initial state, sample student data, theme definitions
    └── components/
        ├── Header.jsx          # App branding and feature indicators
        ├── FormInput.jsx       # Reusable controlled input with validation state
        ├── StudentForm.jsx     # Multi-section details form, dropdowns & actions
        ├── CollegeLogo.jsx     # Dynamic vector SVG crest & emblem renderer
        ├── LogoStudioModal.jsx # Custom logo creator & presets modal
        ├── BarcodeCanvas.jsx   # Code 128 canvas barcode generator
        ├── IDCard.jsx          # Realistic CR80 smart ID card badge (Front/Back)
        └── Footer.jsx          # Application footer and credentials notice
```

---

## Installation

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** (v9.0.0 or higher) or **yarn** / **pnpm**

### Steps

1. Clone or navigate to the project directory:
   ```bash
   cd digital-college-id-generator
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

---

## Run Locally

To launch the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

Open your browser and navigate to:
```
http://localhost:3000
```

To test the optimized production build locally:

```bash
npm run build
npm run preview
```

---

## Screenshots

*(Screenshots can be captured directly from your browser once the dev server is active)*

| Feature | Description |
| :--- | :--- |
| **Live Editor & Card Preview** | Two-column desktop layout with controlled inputs and instant preview |
| **Front Card Badge** | Photo, smart chip, hologram, QR code, and dual signatures |
| **Back Card Badge** | Institutional terms, emergency contact, college helpline, and barcode |
| **Theme Selector** | One-click color scheme switching across Royal Navy, Crimson, Emerald, etc. |

---

## Deployment

The project is built on Vite and is 100% static client-side, making it ideal for **Vercel**, **Netlify**, or **GitHub Pages**.

### Deploy to Vercel (Step-by-Step)

1. **Push to GitHub**:
   Follow the Git commands below to push your repository to GitHub.
2. **Open Vercel**:
   Go to [vercel.com](https://vercel.com/) and log in (or sign up with your GitHub account).
3. **Import Project**:
   Click **"Add New..."** -> **"Project"** and select your GitHub repository.
4. **Configure Project Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. **Deploy**:
   Click **"Deploy"**. Vercel will build the project in seconds and provide your live production URL (e.g. `https://digital-college-id-generator.vercel.app`).

---

## Git Commands for GitHub

To connect and push this project to your GitHub repository:

```bash
# Initialize git (if not already done)
git init

# Add all files to staging
git add .

# Commit your changes
git commit -m "Initial commit - Digital College ID Generator"

# Set default branch to main
git branch -M main

# Add your remote repository URL (replace with your repository link)
git remote add origin YOUR_GITHUB_REPOSITORY_URL

# Push to GitHub
git push -u origin main
```

---

## Future Enhancements

- [x] Pre-loaded college names, university presets, and custom college creator studio.
- [x] Support for custom college logo / seal uploads and real-time SVG vector crest synthesis.
- [x] Optical Code 128 barcode and camera-scannable QR verification.
- [x] Father's / Guardian's name and Academic Session dropdowns.
- [ ] NFC / vCard generation inside the QR payload for 1-tap contact saving.
- [ ] Bulk batch ID card generation from CSV / Excel spreadsheets.
- [ ] Direct print preset (standard 85.6mm x 54mm thermal printer driver sizing).
- [ ] Dark/Light interface mode toggle.

---

## Author

Developed with care as an academic project demonstrating advanced React, controlled state architecture, and client-side vector synthesis.

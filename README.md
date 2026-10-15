# PixelShift — In-Browser Image Format Identifier & Converter

PixelShift is an in-browser image format identification and conversion application built with **Next.js**. It detects the true format of any uploaded picture using raw binary magic byte inspection and provides conversion between multiple image formats with 100% client-side privacy.

---

## ✨ Features

- **Binary Magic Bytes Inspection**: Detects true image formats (`PNG`, `JPEG`, `WEBP`, `AVIF`, `BMP`, `ICO`, `SVG`, `TIFF`, `GIF`, `HEIC`) regardless of file extension.
- **100% In-Browser Privacy**: Zero server uploads. All processing occurs locally in client memory.
- **9 Target Export Formats**:
  - **PNG** (Lossless with full alpha transparency)
  - **JPG / JPEG** (Adjustable quality compression)
  - **WebP** (Modern web standard, ~30% smaller than JPG)
  - **AVIF** (Next-generation AV1 codec compression)
  - **ICO** (True Windows icon generator for website favicons)
  - **BMP** (Uncompressed 24/32-bit bitmap)
  - **SVG** (Responsive vector wrapper with viewBox)
  - **TIFF** (Baseline uncompressed format for print/archival)
  - **GIF** (Universal 8-bit palette raster)
- **Tuning & Controls**:
  - Quality percentage slider (10% to 100%)
  - Dimension scaling (25%, 50%, 75%, 100%, 150%, 200%)
  - Custom background color fill for transparent images converted to JPEG/BMP
  - ICO resolution picker (16x16 to 256x256)
- **Batch Processing & ZIP Export**: Convert multiple images at once and download everything bundled in a single `.zip` archive.
- **Live Comparison & Clipboard**: Instant side-by-side preview with calculated file size savings and 1-click clipboard copy.

---

## 🚀 Getting Started

### Prerequisites

- Node.js (version 18.18 or higher recommended)
- npm, pnpm, or yarn

### Installation

1. Clone this repository:
```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
cd YOUR_REPOSITORY
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your web browser.

---

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Icons**: Lucide React
- **Packaging**: JSZip
- **Feedback**: Canvas Confetti
- **Styling**: Clean Vanilla CSS Design System (Zero-neon, high-legibility palette)

---

## 📄 License

MIT License. Free for personal and commercial use.

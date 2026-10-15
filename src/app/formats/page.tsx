import React from "react";
import type { Metadata } from "next";
import { Navbar } from "../../components/Navbar";
import { FormatDirectory } from "../../components/FormatDirectory";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Supported Formats - PixelShift",
  description: "Explore supported image formats including PNG, JPEG, WebP, AVIF, BMP, ICO, SVG, TIFF, and GIF.",
};

export default function FormatsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <FormatDirectory />
      </main>
      <Footer />
    </div>
  );
}

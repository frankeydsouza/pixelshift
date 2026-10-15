import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { FormatDirectory } from "../../components/FormatDirectory";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Supported Image Formats & Specifications - PixelShift",
  description: "Explore supported image formats including PNG, JPEG, WebP, AVIF, BMP, ICO, SVG, TIFF, and GIF. Check transparency support, compression rates, and ideal use cases.",
};

export default function FormatsPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1, paddingTop: "32px" }}>
        <div className="container" style={{ marginBottom: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px" }}>
            <Link
              href="/"
              className="btn btn-secondary btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <ArrowLeft size={14} />
              <span>Back to Converter</span>
            </Link>

            <Link
              href="/"
              className="btn btn-primary btn-sm"
              style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}
            >
              <Sparkles size={14} />
              <span>Convert Now</span>
            </Link>
          </div>
        </div>

        <FormatDirectory />
      </main>
      <Footer />
    </div>
  );
}

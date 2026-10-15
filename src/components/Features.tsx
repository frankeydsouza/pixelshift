"use client";

import React from "react";
import { Binary, ShieldCheck, Cpu, SlidersHorizontal, Archive, Sparkles } from "lucide-react";

export function Features() {
  const featureList = [
    {
      icon: <Binary size={22} />,
      title: "Deep Binary Format Inspection",
      description:
        "Unlike basic tools that rely solely on file extensions, PixelShift inspects the raw file magic bytes (e.g. 0x89504E47 for PNG, 0xFFD8FF for JPEG) to identify the true format even when renamed incorrectly.",
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "100% Private Client-Side Processing",
      description:
        "Your images never leave your local device. Conversions run entirely inside your browser's WebAssembly and HTML5 Canvas memory. Ideal for confidential documents, client logos, and proprietary data.",
    },
    {
      icon: <Cpu size={22} />,
      title: "Custom High-Fidelity Encoders",
      description:
        "Includes dedicated client-side encoders for Windows ICO (with multi-resolution headers), 24-bit uncompressed BMP, tagged baseline TIFF, and responsive SVG wrappers without external server dependencies.",
    },
    {
      icon: <SlidersHorizontal size={22} />,
      title: "Granular Quality & Resizing Controls",
      description:
        "Fine-tune output file size with percentage quality sliders for lossy formats (JPEG, WebP, AVIF) and preset scaling (25%, 50%, 75%, 100%, 150%, 200%) while preserving sharp aspect ratios.",
    },
    {
      icon: <Archive size={22} />,
      title: "Batch Processing & One-Click ZIP Export",
      description:
        "Convert dozens of images simultaneously. Preview each individually, make selective format choices, and bundle all converted assets into a clean compressed ZIP archive with one click.",
    },
    {
      icon: <Sparkles size={22} />,
      title: "Intelligent Transparency Management",
      description:
        "Detects whether an image has transparent alpha pixels. When converting transparent images into non-alpha formats like JPEG or BMP, customize background fill colors (white, black, or custom slate).",
    },
  ];

  return (
    <section id="features" className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container">
        <div className="section-header">
          <div className="badge badge-neutral" style={{ marginBottom: "12px" }}>
            ENGINEERING EXCELLENCE
          </div>
          <h2 className="section-title">Built for Precision, Privacy & Speed</h2>
          <p className="section-subtitle">
            Experience an image converter engineered with uncompromising attention to data security, format integrity, and instantaneous performance.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "24px",
        }}>
          {featureList.map((f, i) => (
            <div
              key={i}
              className="card"
              style={{
                padding: "28px",
                display: "flex",
                flexDirection: "column",
                gap: "14px",
              }}
            >
              <div style={{
                width: "44px",
                height: "44px",
                borderRadius: "12px",
                backgroundColor: "var(--bg-subtle)",
                color: "var(--text-primary)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid var(--border-light)",
              }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>
                {f.title}
              </h3>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

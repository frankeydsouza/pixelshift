"use client";

import React from "react";
import { Upload, Search, RefreshCw, Download } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      num: "01",
      icon: <Upload size={20} />,
      title: "Upload or Paste Image",
      desc: "Drag and drop any picture, browse from your computer, or press Ctrl+V to paste directly from your clipboard.",
    },
    {
      num: "02",
      icon: <Search size={20} />,
      title: "Automated Identification",
      desc: "Our engine immediately analyzes header bytes to determine true format, pixel dimensions, and alpha channel status.",
    },
    {
      num: "03",
      icon: <RefreshCw size={20} />,
      title: "Select New Format",
      desc: "Choose from 9 target formats (PNG, JPG, WebP, AVIF, BMP, ICO, SVG, TIFF, GIF) and optionally tune quality and size.",
    },
    {
      num: "04",
      icon: <Download size={20} />,
      title: "Instant Download & Copy",
      desc: "Get your converted file in milliseconds, copy directly to your clipboard, or export multiple files as a single ZIP archive.",
    },
  ];

  return (
    <section className="section-padding" style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid var(--border-light)" }}>
      <div className="container">
        <div className="section-header">
          <div className="badge badge-neutral" style={{ marginBottom: "12px" }}>
            SIMPLE WORKFLOW
          </div>
          <h2 className="section-title">How It Works</h2>
          <p className="section-subtitle">
            Zero sign-up, zero server uploads, and zero complex configurations. Convert any image format in four seamless steps.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "24px",
          position: "relative",
        }}>
          {steps.map((step, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: "var(--bg-primary)",
                border: "1px solid var(--border-light)",
                borderRadius: "var(--radius-lg)",
                padding: "24px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <div style={{
                  width: "38px",
                  height: "38px",
                  borderRadius: "10px",
                  backgroundColor: "var(--accent-primary)",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {step.icon}
                </div>
                <span style={{
                  fontSize: "24px",
                  fontWeight: "800",
                  color: "var(--border-medium)",
                  fontFamily: "var(--font-mono)",
                }}>
                  {step.num}
                </span>
              </div>

              <h3 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)" }}>
                {step.title}
              </h3>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

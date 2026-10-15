"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does PixelShift identify the true format of an uploaded image?",
      a: "Instead of relying on whatever file extension someone typed in the filename (which is frequently incorrect or misleading), PixelShift reads the file's raw binary magic bytes. For example, PNG files start with 0x89504E47 ('PNG'), JPEGs start with 0xFFD8FF, and WebP begins with 'RIFF....WEBP'. This guarantees 100% accurate identification.",
    },
    {
      q: "Are my images uploaded to any remote server or stored in the cloud?",
      a: "No. Never. 100% of the image decoding, transformation, canvas rendering, and binary encoding happens locally in your web browser's runtime memory. Your pictures never touch an external server or API, making it fully compliant for enterprise, healthcare, and confidential design workflows.",
    },
    {
      q: "Which image format offers the best compression for modern websites?",
      a: "WebP and AVIF are currently the gold standards for the web. WebP offers roughly 25-35% smaller file sizes than comparable JPEGs and PNGs while retaining full alpha transparency. AVIF pushes compression even further, cutting file size by up to 50% on supported browsers.",
    },
    {
      q: "How does transparency work when converting PNG or WebP to JPEG?",
      a: "The JPEG standard does not support alpha transparency. When converting a transparent image to JPEG, PixelShift allows you to select a background fill color (crisp white by default, clean dark slate, or custom). If you wish to preserve transparency, convert to PNG, WebP, AVIF, BMP (32-bit), or ICO instead.",
    },
    {
      q: "Can I generate Windows favicon.ico files?",
      a: "Yes! When selecting the ICO format, PixelShift uses a dedicated encoder that constructs a genuine Microsoft Windows Icon directory header (ICONDIR + ICONDIRENTRY) supporting custom dimensions such as 16x16, 32x32, 48x48, 64x64, 128x128, and 256x256.",
    },
    {
      q: "Is there a limit on how many images I can convert at once?",
      a: "Because all processing uses your device's memory, you can batch convert dozens of images without server queue wait times or throttling. You can also download all converted images at once in a single ZIP file.",
    },
  ];

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section id="faq" className="section-padding" style={{ backgroundColor: "var(--bg-primary)" }}>
      <div className="container" style={{ maxWidth: "800px" }}>
        <div className="section-header" style={{ marginBottom: "28px" }}>
          <h1 className="section-title">Frequently Asked Questions</h1>
          <p className="section-subtitle">
            Answers about image format identification and privacy.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="card"
                style={{
                  overflow: "hidden",
                  transition: "all 0.2s ease",
                }}
              >
                <button
                  onClick={() => toggle(idx)}
                  style={{
                    width: "100%",
                    padding: "20px 24px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    textAlign: "left",
                    backgroundColor: isOpen ? "var(--bg-subtle)" : "var(--bg-surface)",
                    transition: "background-color 0.15s ease",
                  }}
                >
                  <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>
                    {faq.q}
                  </span>
                  <div style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                    color: "var(--text-secondary)",
                  }}>
                    <ChevronDown size={18} />
                  </div>
                </button>

                {isOpen && (
                  <div style={{
                    padding: "16px 24px 22px 24px",
                    borderTop: "1px solid var(--border-light)",
                    backgroundColor: "var(--bg-surface)",
                  }}>
                    <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.65 }}>
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

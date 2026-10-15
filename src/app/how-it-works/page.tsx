import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, CheckCircle2, Sliders, ShieldCheck } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { HowItWorks } from "../../components/HowItWorks";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "How It Works - Step by Step Guide - PixelShift",
  description: "Learn how to easily identify and convert image formats using PixelShift. Tips for transparency preservation, resizing, and optimal compression.",
};

export default function HowItWorksPage() {
  const tips = [
    {
      title: "Preserving Transparency",
      desc: "If your source image has transparent elements (like a logo), convert it into PNG, WebP, or AVIF. If converting to JPEG, select a clean white or black background fill.",
    },
    {
      title: "Maximizing Web Performance",
      desc: "For production websites, choose WebP or AVIF with quality set between 85% and 92%. This typically reduces file size by 30-50% compared to traditional JPEGs with imperceptible visual change.",
    },
    {
      title: "Creating Website Favicons",
      desc: "Select ICO format and pick 32px or 64px size to generate standard Windows and browser-compatible `favicon.ico` files in one click.",
    },
    {
      title: "Fast Batch Exports",
      desc: "Upload multiple photos at once, preview them in the carousel tabs, and use 'Download All as ZIP' to receive an organized archive without downloading one by one.",
    },
  ];

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
              <span>Start Converting</span>
            </Link>
          </div>
        </div>

        <HowItWorks />

        {/* Pro Tips Section */}
        <section style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid var(--border-light)", padding: "64px 0" }}>
          <div className="container" style={{ maxWidth: "860px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div className="badge badge-neutral" style={{ marginBottom: "10px" }}>
                BEST PRACTICES
              </div>
              <h3 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "12px" }}>
                Tips for the Best Conversion Results
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6 }}>
                Make informed decisions when exporting your assets for web, app development, or graphic design.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "40px" }}>
              {tips.map((t, idx) => (
                <div key={idx} className="card" style={{ padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "10px" }}>
                    <CheckCircle2 size={16} color="var(--accent-primary)" />
                    <h4 style={{ fontSize: "15px", fontWeight: "700" }}>{t.title}</h4>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.55 }}>
                    {t.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ textAlign: "center" }}>
              <Link href="/" className="btn btn-primary btn-lg">
                <Sparkles size={16} />
                <span>Open Converter Workspace</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

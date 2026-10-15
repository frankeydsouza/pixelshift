import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, HelpCircle } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { FAQ } from "../../components/FAQ";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - PixelShift",
  description: "Find answers to frequently asked questions about image format identification, in-browser privacy, WebP vs AVIF compression, and favicon creation.",
};

export default function FAQPage() {
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
              <span>Open Converter</span>
            </Link>
          </div>
        </div>

        <FAQ />

        {/* Quick Contact / Help note */}
        <section style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid var(--border-light)", padding: "48px 0", textAlign: "center" }}>
          <div className="container" style={{ maxWidth: "600px" }}>
            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
              Ready to convert your images?
            </h3>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "20px" }}>
              No installation required. Works directly in any modern desktop, tablet, or mobile browser.
            </p>
            <Link href="/" className="btn btn-primary btn-lg">
              <Sparkles size={16} />
              <span>Launch Image Converter</span>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

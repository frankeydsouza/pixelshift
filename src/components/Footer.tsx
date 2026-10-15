"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeftRight, ShieldCheck } from "lucide-react";

export function Footer() {
  return (
    <footer style={{
      backgroundColor: "#FFFFFF",
      borderTop: "1px solid var(--border-light)",
      paddingTop: "clamp(36px, 6vw, 60px)",
      paddingBottom: "32px",
      color: "var(--text-secondary)",
      fontSize: "13px",
      marginTop: "auto",
    }}>
      <div className="container">
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "clamp(24px, 4vw, 40px)",
          paddingBottom: "36px",
          borderBottom: "1px solid var(--border-light)",
        }}>
          {/* Brand Info */}
          <div>
            <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px", marginBottom: "12px", textDecoration: "none" }}>
              <div style={{
                width: "30px",
                height: "30px",
                borderRadius: "8px",
                backgroundColor: "var(--accent-primary)",
                color: "#FFFFFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}>
                <ArrowLeftRight size={16} strokeWidth={2.5} />
              </div>
              <span style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)" }}>
                PixelShift
              </span>
            </Link>
            <p style={{ lineHeight: 1.6, color: "var(--text-tertiary)", marginBottom: "14px" }}>
              The modern, clean image format identification and lossless client-side conversion engine.
            </p>
            <div className="badge badge-success" style={{ fontSize: "11px" }}>
              <ShieldCheck size={12} />
              <span>Zero-Telemetry Local Execution</span>
            </div>
          </div>

          {/* Quick Pages */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Explore Pages
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", color: "var(--text-tertiary)" }}>
              <li><Link href="/" style={{ transition: "color 0.15s ease" }}>Image Converter (Home)</Link></li>
              <li><Link href="/formats" style={{ transition: "color 0.15s ease" }}>Supported Formats & Specs</Link></li>
              <li><Link href="/features" style={{ transition: "color 0.15s ease" }}>Features & Technology</Link></li>
              <li><Link href="/how-it-works" style={{ transition: "color 0.15s ease" }}>How It Works Guide</Link></li>
              <li><Link href="/faq" style={{ transition: "color 0.15s ease" }}>Frequently Asked Questions</Link></li>
            </ul>
          </div>

          {/* Supported Formats */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Supported Formats
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", color: "var(--text-tertiary)" }}>
              <li><Link href="/formats">Portable Network Graphics (.png)</Link></li>
              <li><Link href="/formats">Joint Photographic Experts (.jpg, .jpeg)</Link></li>
              <li><Link href="/formats">Google WebP Standard (.webp)</Link></li>
              <li><Link href="/formats">AV1 Image File (.avif)</Link></li>
              <li><Link href="/formats">Microsoft Windows Icon (.ico)</Link></li>
              <li><Link href="/formats">Windows Bitmap (.bmp) & TIFF (.tiff)</Link></li>
            </ul>
          </div>

          {/* Privacy & Security */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Privacy Guarantee
            </h4>
            <p style={{ lineHeight: 1.6, color: "var(--text-tertiary)" }}>
              No images are ever transmitted over a network. All binary magic byte inspections and pixel buffer conversions execute securely within your browser's sandboxed client runtime.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "12px",
          paddingTop: "24px",
          color: "var(--text-muted)",
          fontSize: "12px",
        }}>
          <div>
            © 2026 PixelShift. Clean In-Browser Format Conversion.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/" style={{ color: "var(--text-tertiary)" }}>Converter</Link>
            <Link href="/formats" style={{ color: "var(--text-tertiary)" }}>Formats</Link>
            <Link href="/features" style={{ color: "var(--text-tertiary)" }}>Features</Link>
            <Link href="/how-it-works" style={{ color: "var(--text-tertiary)" }}>How It Works</Link>
            <Link href="/faq" style={{ color: "var(--text-tertiary)" }}>FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

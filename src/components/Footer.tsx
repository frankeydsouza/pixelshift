"use client";

import React from "react";
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
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
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
            </div>
            <p style={{ lineHeight: 1.6, color: "var(--text-tertiary)", marginBottom: "14px" }}>
              The modern, clean image format identification and lossless client-side conversion engine.
            </p>
            <div className="badge badge-success" style={{ fontSize: "11px" }}>
              <ShieldCheck size={12} />
              <span>Zero-Telemetry Local Execution</span>
            </div>
          </div>

          {/* Popular Conversions */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Popular Conversions
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "7px", color: "var(--text-tertiary)" }}>
              <li><a href="#converter" style={{ transition: "color 0.15s ease" }}>PNG to JPG (High Compression)</a></li>
              <li><a href="#converter" style={{ transition: "color 0.15s ease" }}>JPG to WebP (Web Optimized)</a></li>
              <li><a href="#converter" style={{ transition: "color 0.15s ease" }}>PNG to WebP (Transparent)</a></li>
              <li><a href="#converter" style={{ transition: "color 0.15s ease" }}>PNG to ICO (Website Favicon)</a></li>
              <li><a href="#converter" style={{ transition: "color 0.15s ease" }}>Image to AVIF (Next-Gen)</a></li>
            </ul>
          </div>

          {/* Formats Supported */}
          <div>
            <h4 style={{ fontSize: "12px", fontWeight: "700", color: "var(--text-primary)", marginBottom: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Supported Formats
            </h4>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "7px", color: "var(--text-tertiary)" }}>
              <li><span>Portable Network Graphics (.png)</span></li>
              <li><span>Joint Photographic Experts (.jpg, .jpeg)</span></li>
              <li><span>Google WebP Standard (.webp)</span></li>
              <li><span>AV1 Image File (.avif)</span></li>
              <li><span>Microsoft Windows Icon (.ico)</span></li>
              <li><span>Windows Bitmap (.bmp) & TIFF (.tiff)</span></li>
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
            <a href="#converter" style={{ color: "var(--text-tertiary)" }}>Convert</a>
            <a href="#formats" style={{ color: "var(--text-tertiary)" }}>Formats</a>
            <a href="#features" style={{ color: "var(--text-tertiary)" }}>Features</a>
            <a href="#faq" style={{ color: "var(--text-tertiary)" }}>FAQ</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

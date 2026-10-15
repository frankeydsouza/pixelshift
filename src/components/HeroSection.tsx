"use client";

import React from "react";
import { Shield, Cpu, Zap } from "lucide-react";

export function HeroSection() {
  return (
    <section style={{
      paddingTop: "clamp(32px, 6vw, 64px)",
      paddingBottom: "24px",
      textAlign: "center",
      position: "relative",
    }}>
      <div className="container" style={{ maxWidth: "880px" }}>
        {/* Subtle Announcement Pill */}
        <div style={{ display: "inline-flex", marginBottom: "16px", maxWidth: "100%" }}>
          <div className="badge badge-neutral" style={{
            padding: "5px 12px",
            fontSize: "12px",
            gap: "8px",
            boxShadow: "var(--shadow-xs)",
            maxWidth: "100%",
            flexWrap: "wrap",
            justifyContent: "center",
          }}>
            <span style={{
              display: "inline-block",
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "var(--accent-blue)",
              flexShrink: 0,
            }} />
            <span style={{ fontWeight: "600", color: "var(--text-primary)" }}>Smart Detection Engine</span>
            <span className="desktop-only" style={{ color: "var(--text-tertiary)" }}>•</span>
            <span className="desktop-only" style={{ color: "var(--text-secondary)" }}>Deep magic byte inspection & multi-format conversion</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 style={{
          fontSize: "clamp(26px, 6vw, 48px)",
          fontWeight: "800",
          letterSpacing: "-0.035em",
          color: "var(--text-primary)",
          lineHeight: 1.18,
          marginBottom: "16px",
        }}>
          Identify Any Image Format. <br />
          <span style={{ color: "var(--text-secondary)" }}>Convert to Any Standard in Seconds.</span>
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "clamp(14px, 3.5vw, 17px)",
          color: "var(--text-secondary)",
          lineHeight: 1.6,
          maxWidth: "680px",
          margin: "0 auto 24px auto",
        }}>
          Upload any picture to automatically inspect its true binary format, dimensions, and alpha transparency. 
          Freely convert between PNG, JPG, WebP, AVIF, BMP, ICO, SVG, TIFF, and GIF — 100% processed in your browser.
        </p>

        {/* Trust Badges */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexWrap: "wrap",
          gap: "14px 20px",
          color: "var(--text-tertiary)",
          fontSize: "12px",
          fontWeight: "500",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Shield size={15} color="#166534" />
            <span>Zero server uploads (Safe & Private)</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Cpu size={15} color="#1E293B" />
            <span>High-precision binary detection</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Zap size={15} color="#2563EB" />
            <span>Batch processing & ZIP export</span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState } from "react";
import { Check, X } from "lucide-react";

export function FormatDirectory() {
  const [filter, setFilter] = useState<"all" | "web" | "vector" | "system">("all");

  const formats = [
    {
      code: "PNG",
      name: "Portable Network Graphics",
      category: "web",
      transparency: true,
      compression: "Lossless",
      idealFor: "Logos, transparent illustrations, screenshots, UI mockups",
      browserSupport: "100% (Universal)",
      ratioRating: "Medium",
    },
    {
      code: "JPEG",
      name: "Joint Photographic Experts",
      category: "web",
      transparency: false,
      compression: "Lossy (Variable)",
      idealFor: "Photos, camera scans, print media, social media posts",
      browserSupport: "100% (Universal)",
      ratioRating: "High",
    },
    {
      code: "WEBP",
      name: "WebP Modern Format",
      category: "web",
      transparency: true,
      compression: "Lossy & Lossless",
      idealFor: "Modern web pages, SEO performance, responsive delivery",
      browserSupport: "97% (Modern browsers)",
      ratioRating: "Very High (~30% smaller than JPG)",
    },
    {
      code: "AVIF",
      name: "AV1 Image File Format",
      category: "web",
      transparency: true,
      compression: "High Efficiency Lossy",
      idealFor: "Cutting-edge web speed, HDR imaging, CDN bandwidth optimization",
      browserSupport: "93% (Chrome, Firefox, Safari)",
      ratioRating: "Maximum (~50% smaller than JPG)",
    },
    {
      code: "ICO",
      name: "Windows Icon / Favicon",
      category: "system",
      transparency: true,
      compression: "Lossless / Container",
      idealFor: "Website browser tab icons (favicon.ico), Windows shortcut icons",
      browserSupport: "100% (Universal)",
      ratioRating: "Compact (Multi-res)",
    },
    {
      code: "BMP",
      name: "Bitmap Image File",
      category: "system",
      transparency: true,
      compression: "Uncompressed",
      idealFor: "Windows desktop software, embedded systems, raw pixel manipulation",
      browserSupport: "100% (Legacy to modern)",
      ratioRating: "Large (Zero compression)",
    },
    {
      code: "SVG",
      name: "Scalable Vector Graphics",
      category: "vector",
      transparency: true,
      compression: "XML Vector Container",
      idealFor: "Infinite scaling icons, responsive badges, illustrations",
      browserSupport: "100% (Universal)",
      ratioRating: "Scalable",
    },
    {
      code: "TIFF",
      name: "Tagged Image File Format",
      category: "system",
      transparency: true,
      compression: "Lossless / Baseline",
      idealFor: "Print publishing, desktop publishing, high-res scanning archives",
      browserSupport: "Desktop & Specialized Apps",
      ratioRating: "High Fidelity",
    },
    {
      code: "GIF",
      name: "Graphics Interchange Format",
      category: "web",
      transparency: true,
      compression: "8-bit Indexed Palette",
      idealFor: "Legacy graphics, simple indexed animations, universal memes",
      browserSupport: "100% (Universal)",
      ratioRating: "Standard",
    },
  ];

  const filtered = formats.filter((f) => {
    if (filter === "all") return true;
    return f.category === filter;
  });

  return (
    <section id="formats" className="section-padding" style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid var(--border-light)" }}>
      <div className="container">
        <div className="section-header">
          <div className="badge badge-neutral" style={{ marginBottom: "12px" }}>
            COMPREHENSIVE DIRECTORY
          </div>
          <h2 className="section-title">Supported Formats & Specs</h2>
          <p className="section-subtitle">
            Every format has distinct strengths in compression, color depth, and transparency. Compare specifications to choose the ideal target for your workflow.
          </p>

          {/* Filter Tabs */}
          <div style={{
            display: "inline-flex",
            flexWrap: "wrap",
            gap: "4px",
            justifyContent: "center",
            padding: "4px",
            backgroundColor: "var(--bg-subtle)",
            borderRadius: "var(--radius-md)",
            marginTop: "16px",
            maxWidth: "100%",
          }}>
            {[
              { id: "all", label: "All Formats" },
              { id: "web", label: "Web & Performance" },
              { id: "vector", label: "Vector" },
              { id: "system", label: "System & Publishing" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                style={{
                  padding: "6px 12px",
                  fontSize: "12px",
                  fontWeight: "600",
                  borderRadius: "var(--radius-sm)",
                  backgroundColor: filter === tab.id ? "#FFFFFF" : "transparent",
                  color: filter === tab.id ? "var(--text-primary)" : "var(--text-secondary)",
                  boxShadow: filter === tab.id ? "var(--shadow-xs)" : "none",
                  transition: "all 0.15s ease",
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Horizontal Scroll Indicator */}
        <div className="mobile-only" style={{
          justifyContent: "center",
          fontSize: "11px",
          color: "var(--text-tertiary)",
          marginBottom: "8px",
          textAlign: "center",
        }}>
          <span>↔ Scroll horizontally to view full format specs</span>
        </div>

        {/* Formats Table Container */}
        <div style={{
          overflowX: "auto",
          border: "1px solid var(--border-light)",
          borderRadius: "var(--radius-lg)",
          boxShadow: "var(--shadow-sm)",
          WebkitOverflowScrolling: "touch",
        }}>
          <table style={{
            width: "100%",
            minWidth: "640px",
            borderCollapse: "collapse",
            textAlign: "left",
            fontSize: "13px",
          }}>
            <thead>
              <tr style={{ backgroundColor: "var(--bg-subtle)", borderBottom: "1px solid var(--border-light)" }}>
                <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Format</th>
                <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Transparency</th>
                <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Compression</th>
                <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Best Used For</th>
                <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Browser Support</th>
                <th style={{ padding: "12px 16px", fontWeight: "700", color: "var(--text-primary)" }}>Efficiency</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((item, idx) => (
                <tr
                  key={item.code}
                  style={{
                    borderBottom: idx === filtered.length - 1 ? "none" : "1px solid var(--border-light)",
                    backgroundColor: idx % 2 === 0 ? "#FFFFFF" : "var(--bg-primary)",
                  }}
                >
                  <td style={{ padding: "14px 16px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                      <span style={{ fontWeight: "700", color: "var(--text-primary)" }}>{item.code}</span>
                      <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>({item.name})</span>
                    </div>
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    {item.transparency ? (
                      <span className="badge badge-success" style={{ fontSize: "10px", padding: "2px 6px" }}>
                        <Check size={11} /> Supported
                      </span>
                    ) : (
                      <span className="badge badge-neutral" style={{ fontSize: "10px", padding: "2px 6px" }}>
                        <X size={11} /> No Alpha
                      </span>
                    )}
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--text-secondary)" }}>
                    {item.compression}
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--text-secondary)", maxWidth: "240px" }}>
                    {item.idealFor}
                  </td>
                  <td style={{ padding: "14px 16px", color: "var(--text-tertiary)" }}>
                    {item.browserSupport}
                  </td>
                  <td style={{ padding: "14px 16px" }}>
                    <span className="badge badge-neutral" style={{ fontWeight: "600", fontSize: "11px" }}>
                      {item.ratioRating}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

"use client";

import React from "react";
import { ArrowLeftRight, ShieldCheck, Sparkles, Layers } from "lucide-react";

export function Navbar() {
  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      backgroundColor: "rgba(255, 255, 255, 0.92)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border-light)",
      transition: "border-color 0.2s ease",
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "68px",
      }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: "36px",
            height: "36px",
            borderRadius: "10px",
            backgroundColor: "var(--accent-primary)",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-sm)",
          }}>
            <ArrowLeftRight size={18} strokeWidth={2.5} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
                PixelShift
              </span>
              <span style={{
                fontSize: "10px",
                fontWeight: "700",
                backgroundColor: "var(--bg-subtle)",
                color: "var(--text-secondary)",
                padding: "2px 6px",
                borderRadius: "4px",
                border: "1px solid var(--border-light)",
              }}>
                PRO
              </span>
            </div>
            <span style={{ fontSize: "11px", color: "var(--text-tertiary)", fontWeight: "500", marginTop: "-2px" }}>
              Format Identifier & Converter
            </span>
          </div>
        </a>

        {/* Center Nav Links */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "28px",
          fontSize: "14px",
          fontWeight: "500",
          color: "var(--text-secondary)",
        }}>
          <a href="#converter" style={{ transition: "color 0.15s ease" }} onMouseOver={(e) => (e.currentTarget.style.color = "var(--text-primary)")} onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}>
            Converter
          </a>
          <a href="#formats" style={{ transition: "color 0.15s ease" }} onMouseOver={(e) => (e.currentTarget.style.color = "var(--text-primary)")} onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}>
            Supported Formats
          </a>
          <a href="#features" style={{ transition: "color 0.15s ease" }} onMouseOver={(e) => (e.currentTarget.style.color = "var(--text-primary)")} onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}>
            Features
          </a>
          <a href="#faq" style={{ transition: "color 0.15s ease" }} onMouseOver={(e) => (e.currentTarget.style.color = "var(--text-primary)")} onMouseOut={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}>
            FAQ
          </a>
        </nav>

        {/* Right Badge / CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div className="badge badge-success" style={{ padding: "6px 12px", fontSize: "12px" }}>
            <ShieldCheck size={14} />
            <span>100% In-Browser & Private</span>
          </div>
          <a href="#converter" className="btn btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Sparkles size={14} />
            <span>Convert Image</span>
          </a>
        </div>
      </div>
    </header>
  );
}

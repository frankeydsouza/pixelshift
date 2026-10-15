"use client";

import React, { useState } from "react";
import { ArrowLeftRight, ShieldCheck, Sparkles, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 50,
      backgroundColor: "rgba(255, 255, 255, 0.95)",
      backdropFilter: "blur(12px)",
      WebkitBackdropFilter: "blur(12px)",
      borderBottom: "1px solid var(--border-light)",
      transition: "all 0.2s ease",
    }}>
      <div className="container" style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        height: "64px",
      }}>
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
          <div style={{
            width: "34px",
            height: "34px",
            borderRadius: "10px",
            backgroundColor: "var(--accent-primary)",
            color: "#FFFFFF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "var(--shadow-sm)",
            flexShrink: 0,
          }}>
            <ArrowLeftRight size={17} strokeWidth={2.5} />
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span style={{ fontSize: "17px", fontWeight: "700", color: "var(--text-primary)", letterSpacing: "-0.02em" }}>
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
            <span style={{ fontSize: "10px", color: "var(--text-tertiary)", fontWeight: "500", marginTop: "-2px" }}>
              Format Identifier & Converter
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="desktop-only" style={{
          alignItems: "center",
          gap: "24px",
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

        {/* Desktop Right Action & Badge */}
        <div className="desktop-only" style={{ alignItems: "center", gap: "12px" }}>
          <div className="badge badge-success" style={{ padding: "6px 12px", fontSize: "12px" }}>
            <ShieldCheck size={14} />
            <span>100% In-Browser & Private</span>
          </div>
          <a href="#converter" className="btn btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <Sparkles size={14} />
            <span>Convert Image</span>
          </a>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          className="mobile-only"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
          style={{
            padding: "8px",
            borderRadius: "8px",
            color: "var(--text-primary)",
            backgroundColor: "var(--bg-subtle)",
            border: "1px solid var(--border-light)",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Dropdown Drawer */}
      {mobileMenuOpen && (
        <div
          className="animate-fade-in"
          style={{
            backgroundColor: "#FFFFFF",
            borderTop: "1px solid var(--border-light)",
            padding: "16px 20px 20px 20px",
            display: "flex",
            flexDirection: "column",
            gap: "14px",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <div className="badge badge-success" style={{ alignSelf: "flex-start", padding: "6px 12px", fontSize: "12px" }}>
            <ShieldCheck size={14} />
            <span>100% In-Browser & Private</span>
          </div>

          <nav style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            fontSize: "15px",
            fontWeight: "600",
            color: "var(--text-primary)",
            paddingTop: "6px",
          }}>
            <a
              href="#converter"
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: "8px 0", borderBottom: "1px solid var(--border-light)" }}
            >
              Converter Workspace
            </a>
            <a
              href="#formats"
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: "8px 0", borderBottom: "1px solid var(--border-light)" }}
            >
              Supported Formats
            </a>
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: "8px 0", borderBottom: "1px solid var(--border-light)" }}
            >
              Features & Privacy
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              style={{ padding: "8px 0" }}
            >
              FAQ
            </a>
          </nav>

          <a
            href="#converter"
            onClick={() => setMobileMenuOpen(false)}
            className="btn btn-primary"
            style={{ width: "100%", justifyContent: "center", marginTop: "6px" }}
          >
            <Sparkles size={16} />
            <span>Start Converting</span>
          </a>
        </div>
      )}
    </header>
  );
}

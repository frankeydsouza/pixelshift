"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftRight, ShieldCheck, ArrowLeft, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Converter", href: "/" },
    { label: "Supported Formats", href: "/formats" },
    { label: "Features", href: "/features" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "FAQ", href: "/faq" },
  ];

  const isHome = pathname === "/";

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
        {/* Logo -> Always returns to Home (Converter) */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
        >
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
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-only" style={{
          alignItems: "center",
          gap: "6px",
          fontSize: "14px",
          fontWeight: "500",
        }}>
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                style={{
                  padding: "6px 13px",
                  borderRadius: "var(--radius-sm)",
                  color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                  backgroundColor: isActive ? "var(--bg-subtle)" : "transparent",
                  fontWeight: isActive ? "700" : "500",
                  border: isActive ? "1px solid var(--border-medium)" : "1px solid transparent",
                  transition: "all 0.15s ease",
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Top Side: ONLY ONE element */}
        <div className="desktop-only" style={{ alignItems: "center" }}>
          {isHome ? (
            <div className="badge badge-success" style={{ padding: "6px 12px", fontSize: "12px" }}>
              <ShieldCheck size={14} />
              <span>100% In-Browser & Private</span>
            </div>
          ) : (
            <Link
              href="/"
              className="btn btn-primary btn-sm"
              style={{ display: "flex", alignItems: "center", gap: "6px" }}
            >
              <ArrowLeft size={14} />
              <span>Back to Converter</span>
            </Link>
          )}
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
            gap: "12px",
            boxShadow: "var(--shadow-md)",
          }}
        >
          <nav style={{
            display: "flex",
            flexDirection: "column",
            gap: "4px",
            fontSize: "14px",
            fontWeight: "600",
          }}>
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    padding: "10px 12px",
                    borderRadius: "6px",
                    backgroundColor: isActive ? "var(--bg-subtle)" : "transparent",
                    color: isActive ? "var(--accent-primary)" : "var(--text-primary)",
                    fontWeight: isActive ? "700" : "500",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span>{link.label}</span>
                  {isActive && <span style={{ fontSize: "11px", color: "var(--text-tertiary)" }}>Current</span>}
                </Link>
              );
            })}
          </nav>

          {!isHome && (
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="btn btn-primary"
              style={{ width: "100%", justifyContent: "center", marginTop: "4px", gap: "6px" }}
            >
              <ArrowLeft size={15} />
              <span>Back to Converter</span>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

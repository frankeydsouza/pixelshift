import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Sparkles, Shield, Cpu, Zap, Lock, RefreshCw, Layers } from "lucide-react";
import { Navbar } from "../../components/Navbar";
import { Features } from "../../components/Features";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Features & Privacy Architecture - PixelShift",
  description: "Learn about PixelShift's deep binary magic byte format detection, zero-upload local privacy guarantee, custom format encoders, and batch conversion engine.",
};

export default function FeaturesPage() {
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
              <span>Convert Now</span>
            </Link>
          </div>
        </div>

        <Features />

        {/* Technical Architecture Deep Dive */}
        <section style={{ backgroundColor: "#FFFFFF", borderTop: "1px solid var(--border-light)", padding: "64px 0" }}>
          <div className="container" style={{ maxWidth: "860px" }}>
            <div style={{ textAlign: "center", marginBottom: "40px" }}>
              <div className="badge badge-neutral" style={{ marginBottom: "10px" }}>
                SECURITY & PERFORMANCE
              </div>
              <h3 style={{ fontSize: "28px", fontWeight: "700", marginBottom: "12px" }}>
                How PixelShift Protects Your Data
              </h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6 }}>
                Traditional converters upload your files to cloud servers where they can be cached, logged, or intercepted. PixelShift takes a fundamentally different client-side approach.
              </p>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px", marginBottom: "40px" }}>
              <div className="card" style={{ padding: "24px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "var(--success-bg)", color: "var(--success)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <Lock size={18} />
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>Zero Cloud Exposure</h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  Every conversion is executed using JavaScript and HTML5 Canvas inside your browser sandbox. No file payload ever travels over a network connection.
                </p>
              </div>

              <div className="card" style={{ padding: "24px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "var(--accent-soft)", color: "var(--accent-primary)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <Cpu size={18} />
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>In-Memory Binary Parsing</h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  Header magic bytes are inspected directly via `ArrayBuffer` and `DataView`, guaranteeing format authenticity without relying on misleading extensions.
                </p>
              </div>

              <div className="card" style={{ padding: "24px" }}>
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", backgroundColor: "var(--info-bg)", color: "var(--info)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "12px" }}>
                  <Zap size={18} />
                </div>
                <h4 style={{ fontSize: "16px", fontWeight: "700", marginBottom: "8px" }}>Zero Latency & Queue Times</h4>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
                  Unlike remote converters with queue limits, file size caps, and server lag, conversions process as fast as your hardware allows.
                </p>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <Link href="/" className="btn btn-primary btn-lg">
                <Sparkles size={16} />
                <span>Try the Converter Now</span>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

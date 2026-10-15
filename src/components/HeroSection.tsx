"use client";

import React from "react";

export function HeroSection() {
  return (
    <section style={{
      paddingTop: "clamp(28px, 5vw, 44px)",
      paddingBottom: "18px",
      textAlign: "center",
      position: "relative",
    }}>
      <div className="container" style={{ maxWidth: "760px" }}>
        <h1 style={{
          fontSize: "clamp(26px, 5vw, 42px)",
          fontWeight: "800",
          letterSpacing: "-0.03em",
          color: "var(--text-primary)",
          lineHeight: 1.2,
          marginBottom: "10px",
        }}>
          Identify & Convert Any Image
        </h1>

        <p style={{
          fontSize: "clamp(14px, 3vw, 16px)",
          color: "var(--text-secondary)",
          lineHeight: 1.5,
          maxWidth: "540px",
          margin: "0 auto",
        }}>
          Instant format identification and lossless conversion. 100% client-side and private.
        </p>
      </div>
    </section>
  );
}

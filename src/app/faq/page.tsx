import React from "react";
import type { Metadata } from "next";
import { Navbar } from "../../components/Navbar";
import { FAQ } from "../../components/FAQ";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Frequently Asked Questions - PixelShift",
  description: "Find answers to frequently asked questions about image format identification and privacy.",
};

export default function FAQPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}

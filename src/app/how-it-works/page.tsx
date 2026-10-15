import React from "react";
import type { Metadata } from "next";
import { Navbar } from "../../components/Navbar";
import { HowItWorks } from "../../components/HowItWorks";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "How It Works - PixelShift",
  description: "Learn how to easily identify and convert image formats in four simple steps.",
};

export default function HowItWorksPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}

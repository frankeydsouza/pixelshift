import React from "react";
import type { Metadata } from "next";
import { Navbar } from "../../components/Navbar";
import { Features } from "../../components/Features";
import { Footer } from "../../components/Footer";

export const metadata: Metadata = {
  title: "Features & Privacy - PixelShift",
  description: "Learn about PixelShift's deep binary magic byte format detection, zero-upload local privacy guarantee, and custom format encoders.",
};

export default function FeaturesPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <Features />
      </main>
      <Footer />
    </div>
  );
}

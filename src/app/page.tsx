import React from "react";
import { Navbar } from "../components/Navbar";
import { HeroSection } from "../components/HeroSection";
import { ImageConverter } from "../components/ImageConverter";
import { Footer } from "../components/Footer";

export default function Home() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <main style={{ flex: 1 }}>
        <HeroSection />
        <ImageConverter />
      </main>
      <Footer />
    </div>
  );
}

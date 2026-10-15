import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PixelShift - Intelligent Image Format Identifier & Converter",
  description: "Instant in-browser image format identification and lossless conversion. Convert PNG, JPG, WebP, AVIF, BMP, ICO, SVG, TIFF, and GIF with zero server uploads and total privacy.",
  keywords: ["image converter", "format identifier", "convert png to jpg", "convert webp to png", "ico generator", "bmp converter", "client-side image converter"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body>{children}</body>
    </html>
  );
}

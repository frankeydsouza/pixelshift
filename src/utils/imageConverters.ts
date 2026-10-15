export interface ConversionOptions {
  targetFormat: string; // "PNG" | "JPEG" | "WEBP" | "AVIF" | "BMP" | "ICO" | "GIF" | "SVG" | "TIFF"
  quality: number; // 0.1 to 1.0 (for JPEG, WEBP, AVIF)
  scale: number; // 0.1 to 3.0 (default 1.0)
  customWidth?: number;
  customHeight?: number;
  maintainAspectRatio: boolean;
  backgroundColor?: string; // e.g. "#FFFFFF" or "transparent"
  icoSize?: number; // 16, 32, 48, 64, 128, 256
}

export interface ConversionResult {
  blob: Blob;
  dataUrl: string;
  sizeBytes: number;
  formattedSize: string;
  width: number;
  height: number;
  targetFormat: string;
  fileName: string;
  mimeType: string;
}

export const TARGET_FORMATS = [
  { id: "PNG", label: "PNG", ext: "png", mime: "image/png", tag: "Lossless", badgeColor: "blue", desc: "Best for graphics, screenshots, transparency" },
  { id: "JPEG", label: "JPG / JPEG", ext: "jpg", mime: "image/jpeg", tag: "Smallest", badgeColor: "amber", desc: "Best for photos and social media sharing" },
  { id: "WEBP", label: "WebP", ext: "webp", mime: "image/webp", tag: "Modern Web", badgeColor: "emerald", desc: "Next-gen web format, 30% smaller than JPG" },
  { id: "AVIF", label: "AVIF", ext: "avif", mime: "image/avif", tag: "Ultra High", badgeColor: "violet", desc: "Maximum compression efficiency standard" },
  { id: "BMP", label: "BMP", ext: "bmp", mime: "image/bmp", tag: "Raw Bitmap", badgeColor: "slate", desc: "Uncompressed Windows standard raster" },
  { id: "ICO", label: "ICO", ext: "ico", mime: "image/x-icon", tag: "Favicon", badgeColor: "indigo", desc: "Browser favicon and application shortcut" },
  { id: "SVG", label: "SVG", ext: "svg", mime: "image/svg+xml", tag: "Scalable", badgeColor: "teal", desc: "Scalable Vector wrapper with responsive viewBox" },
  { id: "TIFF", label: "TIFF", ext: "tiff", mime: "image/tiff", tag: "Publishing", badgeColor: "stone", desc: "Standard for print, archives, and high-fidelity" },
  { id: "GIF", label: "GIF", ext: "gif", mime: "image/gif", tag: "Universal", badgeColor: "cyan", desc: "Universal 8-bit palette graphics" },
];

/**
 * Loads an image from a URL or Blob into an HTMLImageElement
 */
export function loadImageElement(source: string | Blob): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    const src = typeof source === "string" ? source : URL.createObjectURL(source);

    img.onload = () => resolve(img);
    img.onerror = (e) => reject(new Error("Failed to load image into memory: " + e));
    img.src = src;
  });
}

/**
 * Encodes raw canvas RGBA ImageData into a true 24-bit / 32-bit BMP file buffer.
 */
function encodeBMP(ctx: CanvasRenderingContext2D, width: number, height: number, hasAlpha: boolean): Blob {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  const bytesPerPixel = hasAlpha ? 4 : 3;
  // Each scanline must be padded to a multiple of 4 bytes
  const rowSize = Math.floor((bytesPerPixel * width + 3) / 4) * 4;
  const pixelArraySize = rowSize * height;
  const fileSize = 54 + pixelArraySize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  // --- BMP HEADER (14 bytes) ---
  view.setUint16(0, 0x424d, false); // "BM" signature
  view.setUint32(2, fileSize, true); // File size
  view.setUint16(6, 0, true); // Reserved
  view.setUint16(8, 0, true); // Reserved
  view.setUint32(10, 54, true); // Offset to pixel data (54 bytes)

  // --- DIB HEADER / BITMAPINFOHEADER (40 bytes) ---
  view.setUint32(14, 40, true); // DIB Header size (40)
  view.setInt32(18, width, true); // Image width
  view.setInt32(22, height, true); // Image height (positive = bottom-to-top)
  view.setUint16(26, 1, true); // Planes = 1
  view.setUint16(28, bytesPerPixel * 8, true); // Bits per pixel (24 or 32)
  view.setUint32(30, 0, true); // Compression = 0 (BI_RGB, uncompressed)
  view.setUint32(34, pixelArraySize, true); // Image size
  view.setInt32(38, 2835, true); // Horizontal resolution (pixels/meter)
  view.setInt32(42, 2835, true); // Vertical resolution (pixels/meter)
  view.setUint32(46, 0, true); // Colors in palette
  view.setUint32(50, 0, true); // Important colors

  // --- PIXEL DATA (bottom to top scanlines) ---
  let offset = 54;
  for (let y = height - 1; y >= 0; y--) {
    let rowOffset = offset;
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const r = data[srcIdx];
      const g = data[srcIdx + 1];
      const b = data[srcIdx + 2];
      const a = data[srcIdx + 3];

      // BMP stores colors in BGR or BGRA order
      view.setUint8(rowOffset++, b);
      view.setUint8(rowOffset++, g);
      view.setUint8(rowOffset++, r);
      if (hasAlpha) {
        view.setUint8(rowOffset++, a);
      }
    }
    // Pad to 4-byte boundary
    const padding = rowSize - width * bytesPerPixel;
    for (let p = 0; p < padding; p++) {
      view.setUint8(rowOffset++, 0);
    }
    offset += rowSize;
  }

  return new Blob([buffer], { type: "image/bmp" });
}

/**
 * Creates a valid Windows ICO file by wrapping PNG data inside an ICONDIR header.
 */
async function encodeICO(canvas: HTMLCanvasElement, targetDim: number = 64): Promise<Blob> {
  const icoCanvas = document.createElement("canvas");
  icoCanvas.width = targetDim;
  icoCanvas.height = targetDim;
  const ctx = icoCanvas.getContext("2d");
  if (!ctx) throw new Error("Could not create canvas context for ICO");

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(canvas, 0, 0, targetDim, targetDim);

  // Convert to PNG blob
  const pngBlob = await new Promise<Blob>((resolve, reject) => {
    icoCanvas.toBlob((b) => (b ? resolve(b) : reject(new Error("ICO PNG conversion failed"))), "image/png");
  });

  const pngBytes = new Uint8Array(await pngBlob.arrayBuffer());
  const headerSize = 6;
  const dirEntrySize = 16;
  const totalSize = headerSize + dirEntrySize + pngBytes.length;

  const buffer = new ArrayBuffer(totalSize);
  const view = new DataView(buffer);

  // ICONDIR header
  view.setUint16(0, 0, true); // Reserved (must be 0)
  view.setUint16(2, 1, true); // Type 1 = ICO
  view.setUint16(4, 1, true); // 1 Image in this ICO

  // ICONDIRENTRY (Entry 0)
  view.setUint8(6, targetDim >= 256 ? 0 : targetDim); // Width (0 means 256)
  view.setUint8(7, targetDim >= 256 ? 0 : targetDim); // Height (0 means 256)
  view.setUint8(8, 0); // Palette count (0 if no palette)
  view.setUint8(9, 0); // Reserved
  view.setUint16(10, 1, true); // Color planes
  view.setUint16(12, 32, true); // Bits per pixel
  view.setUint32(14, pngBytes.length, true); // Size of image data
  view.setUint32(18, headerSize + dirEntrySize, true); // Offset to image data

  // Copy PNG bytes after headers
  const outBytes = new Uint8Array(buffer);
  outBytes.set(pngBytes, headerSize + dirEntrySize);

  return new Blob([buffer], { type: "image/x-icon" });
}

/**
 * Creates an uncompressed baseline TIFF file from canvas ImageData.
 */
function encodeTIFF(ctx: CanvasRenderingContext2D, width: number, height: number): Blob {
  const imgData = ctx.getImageData(0, 0, width, height);
  const data = imgData.data;

  // 3 channels RGB
  const pixelCount = width * height;
  const rawBytes = new Uint8Array(pixelCount * 3);
  let rawIdx = 0;
  for (let i = 0; i < data.length; i += 4) {
    rawBytes[rawIdx++] = data[i]; // R
    rawBytes[rawIdx++] = data[i + 1]; // G
    rawBytes[rawIdx++] = data[i + 2]; // B
  }

  const numEntries = 11;
  const ifdOffset = 8;
  const ifdSize = 2 + numEntries * 12 + 4;
  const valuesOffset = ifdOffset + ifdSize;
  // Extra storage for BitsPerSample (3 values of 16-bit = 6 bytes)
  const bitsPerSampleOffset = valuesOffset;
  const dataOffset = bitsPerSampleOffset + 8; // rounded
  const totalFileSize = dataOffset + rawBytes.length;

  const buffer = new ArrayBuffer(totalFileSize);
  const view = new DataView(buffer);

  // TIFF Header (Little Endian "II")
  view.setUint16(0, 0x4949, true); // 'II'
  view.setUint16(2, 42, true); // 42 magic
  view.setUint32(4, ifdOffset, true); // Offset to first IFD

  // Number of directory entries
  view.setUint16(ifdOffset, numEntries, true);
  let entryPos = ifdOffset + 2;

  const writeTag = (tag: number, type: number, count: number, value: number) => {
    view.setUint16(entryPos, tag, true);
    view.setUint16(entryPos + 2, type, true);
    view.setUint32(entryPos + 4, count, true);
    view.setUint32(entryPos + 8, value, true);
    entryPos += 12;
  };

  // Types: 3=SHORT, 4=LONG
  writeTag(256, 4, 1, width); // ImageWidth
  writeTag(257, 4, 1, height); // ImageLength
  writeTag(258, 3, 3, bitsPerSampleOffset); // BitsPerSample -> points to 8,8,8
  writeTag(259, 3, 1, 1); // Compression = None
  writeTag(262, 3, 1, 2); // PhotometricInterpretation = 2 (RGB)
  writeTag(273, 4, 1, dataOffset); // StripOffsets
  writeTag(277, 3, 1, 3); // SamplesPerPixel = 3
  writeTag(278, 4, 1, height); // RowsPerStrip = height
  writeTag(279, 4, 1, rawBytes.length); // StripByteCounts
  writeTag(282, 5, 1, 0); // XResolution placeholder
  writeTag(283, 5, 1, 0); // YResolution placeholder

  // Next IFD offset = 0
  view.setUint32(entryPos, 0, true);

  // Write BitsPerSample: 8, 8, 8 (3 x 16-bit)
  view.setUint16(bitsPerSampleOffset, 8, true);
  view.setUint16(bitsPerSampleOffset + 2, 8, true);
  view.setUint16(bitsPerSampleOffset + 4, 8, true);

  // Write image bytes
  const fullBytes = new Uint8Array(buffer);
  fullBytes.set(rawBytes, dataOffset);

  return new Blob([buffer], { type: "image/tiff" });
}

/**
 * Creates a clean Scalable Vector Graphic (SVG) wrapping the raster image with
 * standard responsive dimensions and viewBox.
 */
function encodeSVG(canvas: HTMLCanvasElement, width: number, height: number): Blob {
  const pngDataUrl = canvas.toDataURL("image/png");
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
  <defs>
    <filter id="crisp-render" color-interpolation-filters="sRGB">
      <feImage xlink:href="${pngDataUrl}" result="img" />
    </filter>
  </defs>
  <image width="${width}" height="${height}" href="${pngDataUrl}" preserveAspectRatio="xMidYMid meet" />
</svg>`;

  return new Blob([svgContent], { type: "image/svg+xml" });
}

/**
 * Main conversion function capable of handling any image format conversion.
 */
export async function convertImage(
  source: string | Blob,
  originalFileName: string,
  options: ConversionOptions
): Promise<ConversionResult> {
  const img = await loadImageElement(source);

  // Calculate target dimensions
  let targetWidth = img.naturalWidth || 800;
  let targetHeight = img.naturalHeight || 600;

  if (options.customWidth && options.customHeight) {
    targetWidth = options.customWidth;
    targetHeight = options.customHeight;
  } else if (options.scale && options.scale !== 1.0) {
    targetWidth = Math.round(targetWidth * options.scale);
    targetHeight = Math.round(targetHeight * options.scale);
  }

  // Ensure minimum dimensions
  targetWidth = Math.max(1, targetWidth);
  targetHeight = Math.max(1, targetHeight);

  // Setup canvas
  const canvas = document.createElement("canvas");
  canvas.width = targetWidth;
  canvas.height = targetHeight;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) {
    throw new Error("Unable to create canvas context for conversion");
  }

  // Fill background if needed (e.g. converting transparent image to JPEG, or user chosen bg)
  const isTargetLossyOrNonAlpha = options.targetFormat === "JPEG";
  if (options.backgroundColor && options.backgroundColor !== "transparent") {
    ctx.fillStyle = options.backgroundColor;
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  } else if (isTargetLossyOrNonAlpha) {
    // Default clean white fill for JPEG if no bg specified
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, targetWidth, targetHeight);
  }

  // Render high quality resized image
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

  let outputBlob: Blob;
  const targetInfo = TARGET_FORMATS.find((f) => f.id === options.targetFormat) || TARGET_FORMATS[0];
  let finalMime = targetInfo.mime;

  switch (options.targetFormat) {
    case "JPEG": {
      const q = Math.max(0.1, Math.min(1.0, options.quality || 0.92));
      outputBlob = await new Promise<Blob>((res, rej) => {
        canvas.toBlob((b) => (b ? res(b) : rej(new Error("JPEG export failed"))), "image/jpeg", q);
      });
      break;
    }
    case "WEBP": {
      const q = Math.max(0.1, Math.min(1.0, options.quality || 0.9));
      outputBlob = await new Promise<Blob>((res, rej) => {
        canvas.toBlob((b) => (b ? res(b) : rej(new Error("WebP export failed"))), "image/webp", q);
      });
      break;
    }
    case "AVIF": {
      try {
        const q = Math.max(0.1, Math.min(1.0, options.quality || 0.85));
        outputBlob = await new Promise<Blob>((res, rej) => {
          canvas.toBlob((b) => {
            if (b && b.type.includes("avif")) {
              res(b);
            } else {
              rej(new Error("AVIF not natively supported by browser canvas"));
            }
          }, "image/avif", q);
        });
      } catch {
        // Graceful fallback to WebP
        finalMime = "image/webp";
        outputBlob = await new Promise<Blob>((res, rej) => {
          canvas.toBlob((b) => (b ? res(b) : rej(new Error("WebP fallback export failed"))), "image/webp", 0.9);
        });
      }
      break;
    }
    case "BMP": {
      outputBlob = encodeBMP(ctx, targetWidth, targetHeight, true);
      break;
    }
    case "ICO": {
      const icoDim = options.icoSize || (targetWidth <= 256 ? Math.min(targetWidth, targetHeight) : 64);
      outputBlob = await encodeICO(canvas, icoDim);
      break;
    }
    case "SVG": {
      outputBlob = encodeSVG(canvas, targetWidth, targetHeight);
      break;
    }
    case "TIFF": {
      outputBlob = encodeTIFF(ctx, targetWidth, targetHeight);
      break;
    }
    case "GIF": {
      // Use standard canvas toBlob
      outputBlob = await new Promise<Blob>((res, rej) => {
        canvas.toBlob((b) => (b ? res(b) : rej(new Error("GIF export failed"))), "image/gif");
      });
      break;
    }
    case "PNG":
    default: {
      outputBlob = await new Promise<Blob>((res, rej) => {
        canvas.toBlob((b) => (b ? res(b) : rej(new Error("PNG export failed"))), "image/png");
      });
      break;
    }
  }

  // Generate target filename
  const baseName = originalFileName.replace(/\.[^/.]+$/, "");
  const outFileName = `${baseName}.${targetInfo.ext}`;
  const dataUrl = URL.createObjectURL(outputBlob);

  const k = 1024;
  const dm = 1;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = outputBlob.size === 0 ? 0 : Math.floor(Math.log(outputBlob.size) / Math.log(k));
  const formattedSize = `${parseFloat((outputBlob.size / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;

  return {
    blob: outputBlob,
    dataUrl,
    sizeBytes: outputBlob.size,
    formattedSize,
    width: targetWidth,
    height: targetHeight,
    targetFormat: options.targetFormat,
    fileName: outFileName,
    mimeType: finalMime,
  };
}

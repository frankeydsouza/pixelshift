export interface DetectedFormatInfo {
  format: string; // e.g. "PNG", "JPEG", "WEBP", "AVIF", "GIF", "BMP", "ICO", "TIFF", "SVG", "HEIC", "UNKNOWN"
  extension: string;
  mimeType: string;
  name: string;
  description: string;
  supportsAlpha: boolean;
  isLossless: boolean;
  commonUses: string;
}

export interface ImageMetadata {
  fileName: string;
  fileSizeBytes: number;
  formattedSize: string;
  detectedFormat: DetectedFormatInfo;
  width: number;
  height: number;
  aspectRatio: string;
  hasAlphaChannel: boolean;
  previewUrl: string;
}

export const FORMAT_CATALOG: Record<string, DetectedFormatInfo> = {
  PNG: {
    format: "PNG",
    extension: "png",
    mimeType: "image/png",
    name: "Portable Network Graphics",
    description: "Lossless raster format with support for full 8-bit alpha transparency. Ideal for screenshots, graphics, and logos.",
    supportsAlpha: true,
    isLossless: true,
    commonUses: "Logos, screenshots, UI graphics, transparent artwork",
  },
  JPEG: {
    format: "JPEG",
    extension: "jpg",
    mimeType: "image/jpeg",
    name: "Joint Photographic Experts Group",
    description: "Ubiquitous lossy compression standard tailored for high-color continuous-tone photography and digital scans.",
    supportsAlpha: false,
    isLossless: false,
    commonUses: "Photography, print media, social media, web images",
  },
  WEBP: {
    format: "WEBP",
    extension: "webp",
    mimeType: "image/webp",
    name: "WebP Modern Web Format",
    description: "Google's modern web image standard providing 25-35% superior compression compared to JPEG/PNG with alpha support.",
    supportsAlpha: true,
    isLossless: false,
    commonUses: "Web performance, responsive images, modern websites",
  },
  AVIF: {
    format: "AVIF",
    extension: "avif",
    mimeType: "image/avif",
    name: "AV1 Image File Format",
    description: "Cutting-edge next-gen image standard based on AV1 video codec. Exceptional compression at high fidelity.",
    supportsAlpha: true,
    isLossless: false,
    commonUses: "High-performance web apps, CDN optimization, HDR photos",
  },
  BMP: {
    format: "BMP",
    extension: "bmp",
    mimeType: "image/bmp",
    name: "Bitmap Image File",
    description: "Standard uncompressed raster graphics image format used natively in Windows. Zero compression artifacts.",
    supportsAlpha: true,
    isLossless: true,
    commonUses: "Legacy Windows apps, embedded systems, raw pixel analysis",
  },
  ICO: {
    format: "ICO",
    extension: "ico",
    mimeType: "image/x-icon",
    name: "Windows Icon Format",
    description: "Icon format supporting multiple embedded sizes and color depths. Essential for website favicons and application icons.",
    supportsAlpha: true,
    isLossless: true,
    commonUses: "Web browser favicons, desktop shortcuts, application icons",
  },
  GIF: {
    format: "GIF",
    extension: "gif",
    mimeType: "image/gif",
    name: "Graphics Interchange Format",
    description: "8-bit palette based format supporting 256 indexed colors. Universally supported across every browser and device.",
    supportsAlpha: true,
    isLossless: true,
    commonUses: "Simple graphics, animations, vintage web design",
  },
  SVG: {
    format: "SVG",
    extension: "svg",
    mimeType: "image/svg+xml",
    name: "Scalable Vector Graphics",
    description: "XML-based 2D vector graphics format that scales indefinitely without pixelation or quality loss.",
    supportsAlpha: true,
    isLossless: true,
    commonUses: "Vector icons, illustrations, scalable logos, responsive designs",
  },
  TIFF: {
    format: "TIFF",
    extension: "tiff",
    mimeType: "image/tiff",
    name: "Tagged Image File Format",
    description: "Industry-standard raster format for graphic artists, publishing, and archival document scanning.",
    supportsAlpha: true,
    isLossless: true,
    commonUses: "Print publishing, archival photography, high-res scanning",
  },
  HEIC: {
    format: "HEIC",
    extension: "heic",
    mimeType: "image/heic",
    name: "High Efficiency Image Container",
    description: "Apple iOS standard high-efficiency image container based on HEVC encoding.",
    supportsAlpha: true,
    isLossless: false,
    commonUses: "iPhone camera photos, modern Apple ecosystem storage",
  },
  UNKNOWN: {
    format: "UNKNOWN",
    extension: "img",
    mimeType: "application/octet-stream",
    name: "Unknown Image Format",
    description: "Generic binary image stream detected via MIME or file extension.",
    supportsAlpha: false,
    isLossless: false,
    commonUses: "Custom or unclassified graphics",
  },
};

export function formatBytes(bytes: number, decimals = 1): string {
  if (bytes <= 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  const i = Math.min(Math.floor(Math.log(bytes) / Math.log(k)), sizes.length - 1);
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(dm))} ${sizes[i]}`;
}

export function calculateAspectRatio(width: number, height: number): string {
  if (!width || !height) return "1:1";
  const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
  const divisor = gcd(width, height);
  const wRatio = width / divisor;
  const hRatio = height / divisor;

  // If simplified ratio is clean (e.g. 16:9, 4:3, 3:2, 1:1)
  if (wRatio <= 20 && hRatio <= 20) {
    return `${wRatio}:${hRatio}`;
  }
  return `${(width / height).toFixed(2)}:1`;
}

/**
 * Inspects the binary magic bytes (first 16-64 bytes) of a file to reliably
 * identify its true format regardless of the file extension.
 */
export async function identifyImageFormat(file: File): Promise<DetectedFormatInfo> {
  try {
    const slice = file.slice(0, 64);
    const buffer = await slice.arrayBuffer();
    const bytes = new Uint8Array(buffer);

    // 1. PNG: 89 50 4E 47 0D 0A 1A 0A
    if (
      bytes[0] === 0x89 &&
      bytes[1] === 0x50 &&
      bytes[2] === 0x4e &&
      bytes[3] === 0x47 &&
      bytes[4] === 0x0d &&
      bytes[5] === 0x0a &&
      bytes[6] === 0x1a &&
      bytes[7] === 0x0a
    ) {
      return FORMAT_CATALOG.PNG;
    }

    // 2. JPEG: FF D8 FF
    if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
      return FORMAT_CATALOG.JPEG;
    }

    // 3. GIF: 47 49 46 38 ('GIF87a' or 'GIF89a')
    if (
      bytes[0] === 0x47 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x38 &&
      (bytes[4] === 0x37 || bytes[4] === 0x39) &&
      bytes[5] === 0x61
    ) {
      return FORMAT_CATALOG.GIF;
    }

    // 4. WebP: RIFF ... WEBP (bytes 0-3 = "RIFF", bytes 8-11 = "WEBP")
    if (
      bytes[0] === 0x52 &&
      bytes[1] === 0x49 &&
      bytes[2] === 0x46 &&
      bytes[3] === 0x46 &&
      bytes[8] === 0x57 &&
      bytes[9] === 0x45 &&
      bytes[10] === 0x42 &&
      bytes[11] === 0x50
    ) {
      return FORMAT_CATALOG.WEBP;
    }

    // 5. BMP: 'BM' (0x42, 0x4D)
    if (bytes[0] === 0x42 && bytes[1] === 0x4d) {
      return FORMAT_CATALOG.BMP;
    }

    // 6. ICO: 00 00 01 00
    if (bytes[0] === 0x00 && bytes[1] === 0x00 && bytes[2] === 0x01 && bytes[3] === 0x00) {
      return FORMAT_CATALOG.ICO;
    }

    // 7. TIFF: II*. (0x49 0x49 0x2A 0x00) or MM.* (0x4D 0x4D 0x00 0x2A)
    if (
      (bytes[0] === 0x49 && bytes[1] === 0x49 && bytes[2] === 0x2a && bytes[3] === 0x00) ||
      (bytes[0] === 0x4d && bytes[1] === 0x4d && bytes[2] === 0x00 && bytes[3] === 0x2a)
    ) {
      return FORMAT_CATALOG.TIFF;
    }

    // 8. AVIF or HEIC: ISO Base Media (bytes 4-7 = "ftyp")
    if (
      bytes[4] === 0x66 &&
      bytes[5] === 0x74 &&
      bytes[6] === 0x79 &&
      bytes[7] === 0x70
    ) {
      const brandStr = String.fromCharCode(bytes[8], bytes[9], bytes[10], bytes[11]);
      if (brandStr === "avif" || brandStr === "avis") {
        return FORMAT_CATALOG.AVIF;
      }
      if (brandStr === "heic" || brandStr === "heix" || brandStr === "mif1") {
        return FORMAT_CATALOG.HEIC;
      }
    }

    // 9. SVG: Check text prefix for <svg or <?xml
    const textSample = new TextDecoder().decode(bytes.slice(0, 64)).trim().toLowerCase();
    if (textSample.includes("<svg") || textSample.includes("<?xml")) {
      return FORMAT_CATALOG.SVG;
    }
  } catch (err) {
    console.warn("Binary header inspection warning:", err);
  }

  // Fallback to MIME type or file extension
  const mime = file.type?.toLowerCase() || "";
  const ext = file.name.split(".").pop()?.toLowerCase() || "";

  if (mime.includes("png") || ext === "png") return FORMAT_CATALOG.PNG;
  if (mime.includes("jpeg") || mime.includes("jpg") || ext === "jpg" || ext === "jpeg") return FORMAT_CATALOG.JPEG;
  if (mime.includes("webp") || ext === "webp") return FORMAT_CATALOG.WEBP;
  if (mime.includes("avif") || ext === "avif") return FORMAT_CATALOG.AVIF;
  if (mime.includes("svg") || ext === "svg") return FORMAT_CATALOG.SVG;
  if (mime.includes("gif") || ext === "gif") return FORMAT_CATALOG.GIF;
  if (mime.includes("bmp") || ext === "bmp") return FORMAT_CATALOG.BMP;
  if (mime.includes("icon") || ext === "ico") return FORMAT_CATALOG.ICO;
  if (mime.includes("tiff") || ext === "tif" || ext === "tiff") return FORMAT_CATALOG.TIFF;

  return {
    ...FORMAT_CATALOG.UNKNOWN,
    extension: ext || "bin",
  };
}

/**
 * Loads image into memory to extract natural dimensions and sample alpha channel
 */
export async function extractImageMetadata(file: File): Promise<ImageMetadata> {
  const detectedFormat = await identifyImageFormat(file);
  const previewUrl = URL.createObjectURL(file);

  return new Promise((resolve) => {
    // For SVG or standard images
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      const width = img.naturalWidth || 800;
      const height = img.naturalHeight || 600;
      const aspectRatio = calculateAspectRatio(width, height);

      let hasAlphaChannel = detectedFormat.supportsAlpha;

      // Sample alpha channel if format supports transparency
      if (detectedFormat.supportsAlpha) {
        try {
          const canvas = document.createElement("canvas");
          canvas.width = Math.min(width, 64);
          canvas.height = Math.min(height, 64);
          const ctx = canvas.getContext("2d", { willReadFrequently: true });
          if (ctx) {
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            let hasTransparentPixels = false;
            for (let i = 3; i < imgData.data.length; i += 4) {
              if (imgData.data[i] < 255) {
                hasTransparentPixels = true;
                break;
              }
            }
            hasAlphaChannel = hasTransparentPixels;
          }
        } catch {
          // ignore canvas taint
        }
      }

      resolve({
        fileName: file.name,
        fileSizeBytes: file.size,
        formattedSize: formatBytes(file.size),
        detectedFormat,
        width,
        height,
        aspectRatio,
        hasAlphaChannel,
        previewUrl,
      });
    };

    img.onerror = () => {
      // Fallback if image cannot be rendered directly (e.g. raw TIFF/HEIC without codec)
      resolve({
        fileName: file.name,
        fileSizeBytes: file.size,
        formattedSize: formatBytes(file.size),
        detectedFormat,
        width: 0,
        height: 0,
        aspectRatio: "1:1",
        hasAlphaChannel: detectedFormat.supportsAlpha,
        previewUrl,
      });
    };

    img.src = previewUrl;
  });
}

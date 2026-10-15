// Pre-generated high-quality test images for instant 1-click testing
export interface SampleImage {
  name: string;
  description: string;
  format: string;
  dataUrl: string;
}

// Generate dynamic canvas-drawn sample images so they work without external network dependencies
export function generateSampleImage(type: "vector-badge" | "photo-scenery" | "transparent-logo"): { file: File; name: string } {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  if (type === "transparent-logo") {
    // 512x512 crisp transparent geometric logo
    canvas.width = 512;
    canvas.height = 512;

    // Draw transparent background with geometric emblem
    ctx.clearRect(0, 0, 512, 512);

    // Subtle ambient glow ring
    const radGlow = ctx.createRadialGradient(256, 256, 50, 256, 256, 220);
    radGlow.addColorStop(0, "rgba(59, 130, 246, 0.2)");
    radGlow.addColorStop(1, "rgba(59, 130, 246, 0)");
    ctx.fillStyle = radGlow;
    ctx.fillRect(0, 0, 512, 512);

    // Geometric hexagon shield
    ctx.save();
    ctx.translate(256, 256);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const x = 160 * Math.cos(angle);
      const y = 160 * Math.sin(angle);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();

    const hexGrad = ctx.createLinearGradient(-160, -160, 160, 160);
    hexGrad.addColorStop(0, "#1E293B");
    hexGrad.addColorStop(1, "#334155");
    ctx.fillStyle = hexGrad;
    ctx.fill();
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#475569";
    ctx.stroke();

    // Inner icon symbol
    ctx.fillStyle = "#F8FAFC";
    ctx.beginPath();
    ctx.arc(0, 0, 55, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#0F172A";
    ctx.beginPath();
    ctx.moveTo(-20, -25);
    ctx.lineTo(30, 0);
    ctx.lineTo(-20, 25);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    const dataUrl = canvas.toDataURL("image/png");
    const blob = dataURItoBlob(dataUrl);
    return {
      file: new File([blob], "geometric-logo-transparent.png", { type: "image/png" }),
      name: "geometric-logo-transparent.png",
    };
  } else if (type === "photo-scenery") {
    // 800x500 high-res gradient landscape photo
    canvas.width = 800;
    canvas.height = 500;

    // Sky gradient
    const sky = ctx.createLinearGradient(0, 0, 0, 350);
    sky.addColorStop(0, "#1e3a8a");
    sky.addColorStop(0.5, "#3b82f6");
    sky.addColorStop(1, "#93c5fd");
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, 800, 350);

    // Warm sun
    ctx.fillStyle = "#fef08a";
    ctx.beginPath();
    ctx.arc(600, 140, 60, 0, Math.PI * 2);
    ctx.fill();

    // Mountain 1 (distant)
    ctx.fillStyle = "#475569";
    ctx.beginPath();
    ctx.moveTo(100, 350);
    ctx.lineTo(320, 120);
    ctx.lineTo(540, 350);
    ctx.closePath();
    ctx.fill();

    // Mountain 2 (foreground)
    ctx.fillStyle = "#1e293b";
    ctx.beginPath();
    ctx.moveTo(350, 350);
    ctx.lineTo(550, 180);
    ctx.lineTo(780, 350);
    ctx.closePath();
    ctx.fill();

    // Lake / ground reflection
    const ground = ctx.createLinearGradient(0, 350, 0, 500);
    ground.addColorStop(0, "#0f172a");
    ground.addColorStop(1, "#020617");
    ctx.fillStyle = ground;
    ctx.fillRect(0, 350, 800, 150);

    const dataUrl = canvas.toDataURL("image/jpeg", 0.95);
    const blob = dataURItoBlob(dataUrl);
    return {
      file: new File([blob], "serene-mountains-photo.jpg", { type: "image/jpeg" }),
      name: "serene-mountains-photo.jpg",
    };
  } else {
    // Vector badge
    canvas.width = 400;
    canvas.height = 400;

    ctx.fillStyle = "#F1F5F9";
    ctx.fillRect(0, 0, 400, 400);

    // Crisp badge circle
    ctx.beginPath();
    ctx.arc(200, 200, 150, 0, Math.PI * 2);
    ctx.fillStyle = "#FFFFFF";
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#CBD5E1";
    ctx.stroke();

    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 26px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("HIGH QUALITY", 200, 190);
    ctx.font = "16px sans-serif";
    ctx.fillStyle = "#64748B";
    ctx.fillText("VECTOR / BADGE SAMPLE", 200, 225);

    const dataUrl = canvas.toDataURL("image/webp", 0.95);
    const blob = dataURItoBlob(dataUrl);
    return {
      file: new File([blob], "quality-badge-sample.webp", { type: "image/webp" }),
      name: "quality-badge-sample.webp",
    };
  }
}

function dataURItoBlob(dataURI: string): Blob {
  const byteString = atob(dataURI.split(",")[1]);
  const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

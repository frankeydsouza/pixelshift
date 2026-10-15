"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Upload,
  FileImage,
  ArrowRight,
  Download,
  Copy,
  Check,
  RefreshCw,
  Sliders,
  Maximize2,
  Trash2,
  Archive,
  Layers,
  Info,
  CheckCircle2,
  Eye,
  FileCheck,
  Sparkles,
} from "lucide-react";
import confetti from "canvas-confetti";
import JSZip from "jszip";
import {
  extractImageMetadata,
  formatBytes,
  ImageMetadata,
  FORMAT_CATALOG,
} from "../utils/imageDetector";
import {
  convertImage,
  TARGET_FORMATS,
  ConversionOptions,
  ConversionResult,
} from "../utils/imageConverters";
import { generateSampleImage } from "../utils/sampleImages";

interface ImageTask {
  id: string;
  file: File;
  metadata: ImageMetadata;
  targetFormat: string;
  options: ConversionOptions;
  isConverting: boolean;
  result: ConversionResult | null;
  error: string | null;
}

export function ImageConverter() {
  const [tasks, setTasks] = useState<ImageTask[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active task convenience
  const activeTask = tasks.find((t) => t.id === activeTaskId) || tasks[0] || null;

  // Process incoming files
  const processFiles = useCallback(async (files: File[]) => {
    if (!files.length) return;

    const newTasks: ImageTask[] = [];

    for (const file of files) {
      try {
        const metadata = await extractImageMetadata(file);

        // Smart default target: if source is JPG -> suggest PNG or WEBP; if source is PNG -> suggest WEBP or JPG
        let defaultTarget = "WEBP";
        if (metadata.detectedFormat.format === "WEBP") defaultTarget = "PNG";
        else if (metadata.detectedFormat.format === "JPEG") defaultTarget = "PNG";
        else if (metadata.detectedFormat.format === "PNG") defaultTarget = "WEBP";

        const task: ImageTask = {
          id: `${file.name}-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
          file,
          metadata,
          targetFormat: defaultTarget,
          options: {
            targetFormat: defaultTarget,
            quality: 0.9,
            scale: 1.0,
            maintainAspectRatio: true,
            backgroundColor: metadata.hasAlphaChannel ? "#FFFFFF" : "transparent",
            icoSize: 64,
          },
          isConverting: false,
          result: null,
          error: null,
        };
        newTasks.push(task);
      } catch (err) {
        console.error("Error inspecting file:", err);
      }
    }

    if (newTasks.length > 0) {
      setTasks((prev) => [...prev, ...newTasks]);
      setActiveTaskId(newTasks[0].id);
    }
  }, []);

  // Listen to clipboard paste (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const pastedFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.startsWith("image/")) {
          const file = items[i].getAsFile();
          if (file) {
            pastedFiles.push(
              new File([file], `clipboard-image-${Date.now()}.png`, { type: file.type })
            );
          }
        }
      }
      if (pastedFiles.length > 0) {
        processFiles(pastedFiles);
      }
    };

    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [processFiles]);

  // Drag and drop handlers
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(Array.from(e.dataTransfer.files));
    }
  };

  // Convert single task
  const runConversion = async (taskId: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, isConverting: true, error: null } : t))
    );

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    try {
      const result = await convertImage(task.file, task.file.name, {
        ...task.options,
        targetFormat: task.targetFormat,
      });

      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId ? { ...t, isConverting: false, result, error: null } : t
        )
      );

      // Trigger subtle celebratory confetti
      confetti({
        particleCount: 30,
        spread: 60,
        origin: { y: 0.8 },
        colors: ["#1E293B", "#2563EB", "#64748B"],
      });
    } catch (err: any) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === taskId
            ? { ...t, isConverting: false, error: err.message || "Conversion failed" }
            : t
        )
      );
    }
  };

  // Convert all tasks in batch
  const convertAllTasks = async () => {
    for (const task of tasks) {
      await runConversion(task.id);
    }
  };

  // Change target format for active task
  const handleFormatChange = (newFormat: string) => {
    if (!activeTask) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeTask.id
          ? {
              ...t,
              targetFormat: newFormat,
              options: { ...t.options, targetFormat: newFormat },
              result: null, // Reset previous conversion result for new format
            }
          : t
      )
    );
  };

  // Update options for active task
  const updateActiveOptions = (updates: Partial<ConversionOptions>) => {
    if (!activeTask) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === activeTask.id
          ? {
              ...t,
              options: { ...t.options, ...updates },
              result: null,
            }
          : t
      )
    );
  };

  // Copy converted image to clipboard
  const copyToClipboard = async (task: ImageTask) => {
    if (!task.result) return;
    try {
      if (task.result.mimeType === "image/png" || task.result.mimeType === "image/jpeg") {
        await navigator.clipboard.write([
          new ClipboardItem({ [task.result.mimeType]: task.result.blob }),
        ]);
      } else {
        // Fallback convert to PNG on the fly for clipboard compatibility
        const pngRes = await convertImage(task.result.blob, "clipboard.png", {
          targetFormat: "PNG",
          quality: 1,
          scale: 1,
          maintainAspectRatio: true,
        });
        await navigator.clipboard.write([
          new ClipboardItem({ "image/png": pngRes.blob }),
        ]);
      }
      setCopiedId(task.id);
      setTimeout(() => setCopiedId(null), 2200);
    } catch (err) {
      console.warn("Clipboard write failed:", err);
    }
  };

  // Download converted file
  const downloadResult = (task: ImageTask) => {
    if (!task.result) return;
    const a = document.createElement("a");
    a.href = task.result.dataUrl;
    a.download = task.result.fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download all as ZIP
  const downloadAllAsZip = async () => {
    const readyTasks = tasks.filter((t) => t.result);
    if (!readyTasks.length) return;

    setIsZipping(true);
    try {
      const zip = new JSZip();
      for (const t of readyTasks) {
        if (t.result) {
          zip.file(t.result.fileName, t.result.blob);
        }
      }
      const content = await zip.generateAsync({ type: "blob" });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(content);
      a.download = `pixelshift-converted-images-${Date.now()}.zip`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (err) {
      console.error("ZIP creation failed:", err);
    } finally {
      setIsZipping(false);
    }
  };

  // Remove task
  const removeTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
    if (activeTaskId === taskId) {
      const remaining = tasks.filter((t) => t.id !== taskId);
      setActiveTaskId(remaining.length > 0 ? remaining[0].id : null);
    }
  };

  // Clear all
  const clearAll = () => {
    setTasks([]);
    setActiveTaskId(null);
  };

  // Load sample image
  const loadSample = (type: "vector-badge" | "photo-scenery" | "transparent-logo") => {
    const sample = generateSampleImage(type);
    processFiles([sample.file]);
  };

  // Calculate size savings
  const calculateSavings = (task: ImageTask) => {
    if (!task.result) return null;
    const original = task.metadata.fileSizeBytes;
    const converted = task.result.sizeBytes;
    const diff = original - converted;
    const pct = Math.round((diff / original) * 100);
    return {
      diff,
      pct,
      isSmaller: diff > 0,
    };
  };

  return (
    <section id="converter" style={{ paddingBottom: "80px" }}>
      <div className="container">
        {/* Upload Zone / Dropzone */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            border: isDragging
              ? "2px solid var(--accent-primary)"
              : "2px dashed var(--border-medium)",
            borderRadius: "var(--radius-xl)",
            backgroundColor: isDragging ? "var(--bg-subtle)" : "var(--bg-surface)",
            padding: tasks.length === 0 ? "54px 28px" : "32px 28px",
            textAlign: "center",
            boxShadow: "var(--shadow-sm)",
            transition: "all 0.2s ease-in-out",
            position: "relative",
            marginBottom: "32px",
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,.png,.jpg,.jpeg,.webp,.avif,.bmp,.ico,.gif,.svg,.tiff,.tif,.heic"
            multiple
            style={{ display: "none" }}
            onChange={(e) => {
              if (e.target.files) {
                processFiles(Array.from(e.target.files));
                e.target.value = "";
              }
            }}
          />

          <div style={{ maxWidth: "560px", margin: "0 auto" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "16px",
                backgroundColor: "var(--bg-subtle)",
                color: "var(--text-primary)",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: "16px",
                border: "1px solid var(--border-light)",
              }}
            >
              <Upload size={24} strokeWidth={2} />
            </div>

            <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "8px" }}>
              {isDragging ? "Drop your images here" : "Drag & drop images to identify and convert"}
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-tertiary)", marginBottom: "20px" }}>
              Supports PNG, JPG, WebP, AVIF, BMP, ICO, SVG, TIFF, GIF, and HEIC • Or paste from clipboard (Ctrl+V)
            </p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-primary"
                style={{ padding: "10px 20px" }}
              >
                <FileImage size={16} />
                <span>Browse Files</span>
              </button>
            </div>

            {/* Quick Demo Samples */}
            {tasks.length === 0 && (
              <div style={{ marginTop: "28px", paddingTop: "20px", borderTop: "1px solid var(--border-light)" }}>
                <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "12px" }}>
                  Or try with an instant sample
                </span>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => loadSample("transparent-logo")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: "12px", borderRadius: "var(--radius-full)" }}
                  >
                    <span>⚡ Sample 1: Transparent PNG Logo</span>
                  </button>
                  <button
                    onClick={() => loadSample("photo-scenery")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: "12px", borderRadius: "var(--radius-full)" }}
                  >
                    <span>⚡ Sample 2: Scenery JPEG Photo</span>
                  </button>
                  <button
                    onClick={() => loadSample("vector-badge")}
                    className="btn btn-secondary btn-sm"
                    style={{ fontSize: "12px", borderRadius: "var(--radius-full)" }}
                  >
                    <span>⚡ Sample 3: WebP Vector Badge</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Multi-File Workspace Bar */}
        {tasks.length > 0 && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "20px",
            padding: "14px 20px",
            backgroundColor: "var(--bg-surface)",
            borderRadius: "var(--radius-lg)",
            border: "1px solid var(--border-light)",
            boxShadow: "var(--shadow-xs)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontWeight: "700", fontSize: "15px", color: "var(--text-primary)" }}>
                Uploaded Images ({tasks.length})
              </span>
              <span className="badge badge-neutral">
                {tasks.filter((t) => t.result).length} / {tasks.length} Converted
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={() => fileInputRef.current?.click()}
                className="btn btn-secondary btn-sm"
              >
                <Upload size={14} />
                <span>Add More</span>
              </button>

              <button
                onClick={convertAllTasks}
                className="btn btn-primary btn-sm"
                disabled={tasks.every((t) => t.isConverting)}
              >
                <RefreshCw size={14} className={tasks.some((t) => t.isConverting) ? "animate-spin" : ""} />
                <span>Convert All</span>
              </button>

              {tasks.some((t) => t.result) && (
                <button
                  onClick={downloadAllAsZip}
                  className="btn btn-secondary btn-sm"
                  disabled={isZipping}
                >
                  <Archive size={14} />
                  <span>{isZipping ? "Creating ZIP..." : "Download All as ZIP"}</span>
                </button>
              )}

              <button
                onClick={clearAll}
                className="btn btn-subtle btn-sm"
                title="Clear all images"
              >
                <Trash2 size={14} />
                <span>Clear</span>
              </button>
            </div>
          </div>
        )}

        {/* Thumbnail Selector Tabs for Multi-Images */}
        {tasks.length > 1 && (
          <div style={{
            display: "flex",
            gap: "12px",
            overflowX: "auto",
            paddingBottom: "12px",
            marginBottom: "24px",
          }}>
            {tasks.map((task) => {
              const isActive = task.id === activeTask?.id;
              return (
                <div
                  key={task.id}
                  onClick={() => setActiveTaskId(task.id)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 12px",
                    backgroundColor: isActive ? "var(--bg-surface)" : "var(--bg-subtle)",
                    border: isActive
                      ? "2px solid var(--accent-primary)"
                      : "1px solid var(--border-light)",
                    borderRadius: "var(--radius-md)",
                    cursor: "pointer",
                    minWidth: "220px",
                    transition: "all 0.15s ease",
                    boxShadow: isActive ? "var(--shadow-sm)" : "none",
                  }}
                >
                  <img
                    src={task.metadata.previewUrl}
                    alt={task.file.name}
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "6px",
                      objectFit: "cover",
                      border: "1px solid var(--border-light)",
                    }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      color: "var(--text-primary)",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}>
                      {task.file.name}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "2px" }}>
                      <span className="badge badge-neutral" style={{ fontSize: "10px", padding: "2px 6px" }}>
                        {task.metadata.detectedFormat.format}
                      </span>
                      <ArrowRight size={10} color="var(--text-muted)" />
                      <span className="badge badge-brand" style={{ fontSize: "10px", padding: "2px 6px" }}>
                        {task.targetFormat}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeTask(task.id);
                    }}
                    style={{ color: "var(--text-muted)", padding: "4px" }}
                    title="Remove"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Active Task Workspace */}
        {activeTask && (
          <div className="card" style={{ padding: "32px", marginBottom: "32px" }}>
            {/* 1. Identification Header Banner */}
            <div style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "20px",
              paddingBottom: "24px",
              borderBottom: "1px solid var(--border-light)",
              marginBottom: "28px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
                <div style={{
                  position: "relative",
                  width: "68px",
                  height: "68px",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid var(--border-medium)",
                  backgroundColor: "#F1F5F9",
                }}>
                  <img
                    src={activeTask.metadata.previewUrl}
                    alt={activeTask.file.name}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                    <span className="badge badge-neutral" style={{ backgroundColor: "#0F172A", color: "#FFFFFF", border: "none" }}>
                      IDENTIFIED FORMAT
                    </span>
                    <span style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-primary)" }}>
                      {activeTask.metadata.detectedFormat.name} ({activeTask.metadata.detectedFormat.format})
                    </span>
                  </div>
                  <p style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
                    Original File: <span style={{ color: "var(--text-secondary)", fontWeight: "500" }}>{activeTask.file.name}</span>
                  </p>
                </div>
              </div>

              {/* Detected Specs Badges */}
              <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
                <div className="badge badge-neutral" title="File Size">
                  <span>Size:</span>
                  <strong>{activeTask.metadata.formattedSize}</strong>
                </div>
                {activeTask.metadata.width > 0 && (
                  <>
                    <div className="badge badge-neutral" title="Dimensions">
                      <span>Dimensions:</span>
                      <strong>{activeTask.metadata.width} × {activeTask.metadata.height} px</strong>
                    </div>
                    <div className="badge badge-neutral" title="Aspect Ratio">
                      <span>Ratio:</span>
                      <strong>{activeTask.metadata.aspectRatio}</strong>
                    </div>
                  </>
                )}
                <div className={activeTask.metadata.hasAlphaChannel ? "badge badge-info" : "badge badge-neutral"}>
                  <Layers size={12} />
                  <span>{activeTask.metadata.hasAlphaChannel ? "Alpha Transparency Detected" : "Solid (No Alpha)"}</span>
                </div>
              </div>
            </div>

            {/* 2. Choose Target Format Selection Grid */}
            <div style={{ marginBottom: "28px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "16px" }}>
                <div>
                  <h4 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)" }}>
                    Select New Target Format
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
                    Choose any target format to convert this {activeTask.metadata.detectedFormat.format} file into:
                  </p>
                </div>
                <button
                  onClick={() => setShowAdvanced(!showAdvanced)}
                  className="btn btn-secondary btn-sm"
                  style={{ display: "flex", alignItems: "center", gap: "6px" }}
                >
                  <Sliders size={14} />
                  <span>{showAdvanced ? "Hide Adjustments" : "Tuning & Resize"}</span>
                </button>
              </div>

              {/* Format Cards Grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(170px, 1fr))",
                gap: "12px",
              }}>
                {TARGET_FORMATS.map((fmt) => {
                  const isSelected = activeTask.targetFormat === fmt.id;
                  const isSourceFormat = activeTask.metadata.detectedFormat.format === fmt.id;

                  return (
                    <button
                      key={fmt.id}
                      onClick={() => handleFormatChange(fmt.id)}
                      style={{
                        textAlign: "left",
                        padding: "14px",
                        borderRadius: "var(--radius-md)",
                        backgroundColor: isSelected ? "var(--bg-subtle)" : "var(--bg-surface)",
                        border: isSelected
                          ? "2px solid var(--accent-primary)"
                          : "1px solid var(--border-light)",
                        boxShadow: isSelected ? "var(--shadow-sm)" : "none",
                        transition: "all 0.15s ease",
                        cursor: "pointer",
                        position: "relative",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "6px" }}>
                        <span style={{ fontSize: "15px", fontWeight: "700", color: "var(--text-primary)" }}>
                          {fmt.label}
                        </span>
                        {isSelected && (
                          <div style={{
                            width: "18px",
                            height: "18px",
                            borderRadius: "50%",
                            backgroundColor: "var(--accent-primary)",
                            color: "#FFFFFF",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}>
                            <Check size={11} strokeWidth={3} />
                          </div>
                        )}
                      </div>

                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "6px" }}>
                        <span style={{
                          fontSize: "10px",
                          fontWeight: "700",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          backgroundColor: isSelected ? "var(--border-medium)" : "var(--bg-subtle)",
                          color: "var(--text-secondary)",
                        }}>
                          {fmt.tag}
                        </span>
                        {isSourceFormat && (
                          <span style={{ fontSize: "10px", color: "var(--text-tertiary)" }}>
                            (Current)
                          </span>
                        )}
                      </div>

                      <p style={{ fontSize: "11px", color: "var(--text-tertiary)", lineHeight: 1.35 }}>
                        {fmt.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Advanced Tuning Drawer (Resizing, Quality, Background Fill) */}
            {showAdvanced && (
              <div style={{
                backgroundColor: "var(--bg-subtle)",
                borderRadius: "var(--radius-md)",
                padding: "20px",
                marginBottom: "28px",
                border: "1px solid var(--border-light)",
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "24px",
              }}>
                {/* Quality Slider (for lossy formats) */}
                {["JPEG", "WEBP", "AVIF"].includes(activeTask.targetFormat) && (
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                      <label style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)" }}>
                        Compression Quality
                      </label>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--accent-primary)" }}>
                        {Math.round((activeTask.options.quality || 0.9) * 100)}%
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="5"
                      value={Math.round((activeTask.options.quality || 0.9) * 100)}
                      onChange={(e) => updateActiveOptions({ quality: Number(e.target.value) / 100 })}
                      style={{ width: "100%", accentColor: "var(--accent-primary)", cursor: "pointer" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "var(--text-tertiary)", marginTop: "4px" }}>
                      <span>Small File (10%)</span>
                      <span>Balanced (90%)</span>
                      <span>Max Fidelity (100%)</span>
                    </div>
                  </div>
                )}

                {/* Scale / Resize Preset */}
                <div>
                  <label style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)", display: "block", marginBottom: "8px" }}>
                    Output Dimensions Scale
                  </label>
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    {[
                      { label: "25%", val: 0.25 },
                      { label: "50%", val: 0.5 },
                      { label: "75%", val: 0.75 },
                      { label: "100%", val: 1.0 },
                      { label: "150%", val: 1.5 },
                      { label: "200%", val: 2.0 },
                    ].map((s) => {
                      const isCurr = (activeTask.options.scale || 1.0) === s.val;
                      return (
                        <button
                          key={s.label}
                          onClick={() => updateActiveOptions({ scale: s.val })}
                          className={`btn btn-sm ${isCurr ? "btn-primary" : "btn-secondary"}`}
                          style={{ padding: "4px 10px", fontSize: "12px" }}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                  {activeTask.metadata.width > 0 && (
                    <span style={{ display: "block", fontSize: "11px", color: "var(--text-tertiary)", marginTop: "6px" }}>
                      Resulting: {Math.round(activeTask.metadata.width * (activeTask.options.scale || 1))} × {Math.round(activeTask.metadata.height * (activeTask.options.scale || 1))} px
                    </span>
                  )}
                </div>

                {/* Background Fill (for transparent to JPG/BMP conversion) */}
                {activeTask.metadata.hasAlphaChannel && ["JPEG", "BMP"].includes(activeTask.targetFormat) && (
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)", display: "block", marginBottom: "8px" }}>
                      Background Fill Color
                    </label>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      {[
                        { label: "White", color: "#FFFFFF" },
                        { label: "Black", color: "#000000" },
                        { label: "Slate", color: "#0F172A" },
                        { label: "Gray", color: "#F1F5F9" },
                      ].map((bg) => (
                        <button
                          key={bg.label}
                          onClick={() => updateActiveOptions({ backgroundColor: bg.color })}
                          style={{
                            padding: "6px 12px",
                            borderRadius: "6px",
                            fontSize: "12px",
                            fontWeight: "600",
                            border: activeTask.options.backgroundColor === bg.color
                              ? "2px solid var(--accent-primary)"
                              : "1px solid var(--border-medium)",
                            backgroundColor: bg.color,
                            color: bg.color === "#000000" || bg.color === "#0F172A" ? "#FFFFFF" : "#0F172A",
                          }}
                        >
                          {bg.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ICO Size Selector */}
                {activeTask.targetFormat === "ICO" && (
                  <div>
                    <label style={{ fontSize: "13px", fontWeight: "600", color: "var(--text-primary)", display: "block", marginBottom: "8px" }}>
                      Icon Size Preset
                    </label>
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      {[16, 32, 48, 64, 128, 256].map((sz) => (
                        <button
                          key={sz}
                          onClick={() => updateActiveOptions({ icoSize: sz })}
                          className={`btn btn-sm ${(activeTask.options.icoSize || 64) === sz ? "btn-primary" : "btn-secondary"}`}
                          style={{ padding: "4px 8px", fontSize: "12px" }}
                        >
                          {sz}px
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. Convert Action Button */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "28px" }}>
              <button
                onClick={() => runConversion(activeTask.id)}
                disabled={activeTask.isConverting}
                className="btn btn-primary btn-lg"
                style={{ minWidth: "220px", gap: "10px" }}
              >
                <RefreshCw size={18} className={activeTask.isConverting ? "animate-spin" : ""} />
                <span>
                  {activeTask.isConverting
                    ? "Converting..."
                    : `Convert to ${activeTask.targetFormat}`}
                </span>
              </button>

              <span style={{ fontSize: "13px", color: "var(--text-tertiary)" }}>
                Instant client-side processing • Zero quality degradation
              </span>
            </div>

            {/* Error Message if any */}
            {activeTask.error && (
              <div style={{
                padding: "14px 18px",
                backgroundColor: "#FEF2F2",
                border: "1px solid #FCA5A5",
                borderRadius: "var(--radius-md)",
                color: "#991B1B",
                fontSize: "13px",
                marginBottom: "24px",
              }}>
                <strong>Conversion Notice:</strong> {activeTask.error}
              </div>
            )}

            {/* 5. Result Showcase & Live Comparison */}
            {activeTask.result && (
              <div className="animate-fade-in" style={{
                borderTop: "1px solid var(--border-light)",
                paddingTop: "28px",
              }}>
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "14px",
                  marginBottom: "20px",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      backgroundColor: "var(--success-bg)",
                      color: "var(--success)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}>
                      <CheckCircle2 size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: "16px", fontWeight: "700", color: "var(--text-primary)" }}>
                        Successfully Converted to {activeTask.result.targetFormat}
                      </h4>
                      <p style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                        Ready for instant download or clipboard copy
                      </p>
                    </div>
                  </div>

                  {/* Size Delta Badge */}
                  {(() => {
                    const savings = calculateSavings(activeTask);
                    if (!savings) return null;
                    return (
                      <div className={savings.isSmaller ? "badge badge-success" : "badge badge-neutral"} style={{ padding: "6px 12px", fontSize: "13px" }}>
                        <span>
                          {savings.isSmaller
                            ? `Reduced by ${savings.pct}% (${formatBytes(activeTask.metadata.fileSizeBytes)} → ${activeTask.result.formattedSize})`
                            : `Size: ${activeTask.result.formattedSize} (High Fidelity)`}
                        </span>
                      </div>
                    );
                  })()}
                </div>

                {/* Side-by-Side Comparison Container */}
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                  gap: "20px",
                  marginBottom: "24px",
                }}>
                  {/* Original Image Card */}
                  <div style={{
                    backgroundColor: "var(--bg-subtle)",
                    borderRadius: "var(--radius-md)",
                    border: "1px solid var(--border-light)",
                    padding: "16px",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--text-secondary)" }}>
                        Original ({activeTask.metadata.detectedFormat.format})
                      </span>
                      <span style={{ fontSize: "12px", color: "var(--text-tertiary)" }}>
                        {activeTask.metadata.formattedSize}
                      </span>
                    </div>
                    <div style={{
                      height: "240px",
                      borderRadius: "8px",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid var(--border-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}>
                      <img
                        src={activeTask.metadata.previewUrl}
                        alt="Original"
                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                      />
                    </div>
                  </div>

                  {/* Converted Image Card */}
                  <div style={{
                    backgroundColor: "var(--bg-subtle)",
                    borderRadius: "var(--radius-md)",
                    border: "2px solid var(--accent-primary)",
                    padding: "16px",
                    position: "relative",
                  }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                      <span style={{ fontSize: "13px", fontWeight: "700", color: "var(--accent-primary)" }}>
                        Converted Output ({activeTask.result.targetFormat})
                      </span>
                      <span style={{ fontSize: "12px", fontWeight: "700", color: "var(--accent-primary)" }}>
                        {activeTask.result.formattedSize}
                      </span>
                    </div>
                    <div style={{
                      height: "240px",
                      borderRadius: "8px",
                      backgroundColor: "#FFFFFF",
                      border: "1px solid var(--border-light)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      overflow: "hidden",
                    }}>
                      <img
                        src={activeTask.result.dataUrl}
                        alt="Converted"
                        style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                      />
                    </div>
                  </div>
                </div>

                {/* Download and Copy Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
                  <button
                    onClick={() => downloadResult(activeTask)}
                    className="btn btn-primary"
                    style={{ padding: "12px 24px", fontSize: "15px" }}
                  >
                    <Download size={16} />
                    <span>Download {activeTask.result.fileName}</span>
                  </button>

                  <button
                    onClick={() => copyToClipboard(activeTask)}
                    className="btn btn-secondary"
                    style={{ padding: "12px 20px" }}
                  >
                    {copiedId === activeTask.id ? <Check size={16} color="#166534" /> : <Copy size={16} />}
                    <span>{copiedId === activeTask.id ? "Copied to Clipboard!" : "Copy to Clipboard"}</span>
                  </button>

                  <a
                    href={activeTask.result.dataUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="btn btn-subtle"
                    style={{ padding: "12px 18px" }}
                  >
                    <Eye size={16} />
                    <span>Full Preview</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

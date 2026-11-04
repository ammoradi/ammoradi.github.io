import { useEffect, useRef, useState } from "react";
import { drawResumeCylinder } from "../utils/draw-resume-cylinder";

export function useResumeCylinder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const textureRef = useRef<HTMLCanvasElement | null>(null);
  const darkTextureRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0.13);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const positionRef = useRef(progress);
  positionRef.current = progress;

  function moveTo(value: number) {
    setProgress(Math.max(0, Math.min(1, value)));
  }

  useEffect(() => {
    const texture = new Image();
    texture.onload = () => {
      const image = document.createElement("canvas");
      image.width = texture.naturalWidth;
      image.height = texture.naturalHeight;
      const context = image.getContext("2d");
      if (!context) { setStatus("error"); return; }
      context.drawImage(texture, 0, 0);
      textureRef.current = image;
      const darkImage = document.createElement("canvas");
      darkImage.width = image.width;
      darkImage.height = image.height;
      const darkContext = darkImage.getContext("2d");
      if (!darkContext) { setStatus("error"); return; }
      const pixels = context.getImageData(0, 0, image.width, image.height);
      // Remove the white paper while preserving the printed colors and antialiasing.
      for (let i = 0; i < pixels.data.length; i += 4) {
        const white = Math.min(pixels.data[i], pixels.data[i + 1], pixels.data[i + 2]);
        const alpha = 255 - white;
        for (let channel = 0; channel < 3; channel++) {
          pixels.data[i + channel] = alpha ? (pixels.data[i + channel] - white) * 255 / alpha : 0;
        }
        pixels.data[i + 3] = pixels.data[i + 3] * alpha / 255;
      }
      darkContext.putImageData(pixels, 0, 0);
      darkTextureRef.current = darkImage;
      setStatus("ready");
    };
    texture.onerror = () => setStatus("error");
    texture.src = "/resume-preview.png";
    return () => { texture.onload = null; texture.onerror = null; };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || status !== "ready") return;
    let frame = 0;
    const draw = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const texture = document.documentElement.dataset.theme === "dark" ? darkTextureRef.current : textureRef.current;
        if (texture) drawResumeCylinder(canvas, texture, positionRef.current);
      });
    };
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    const themeObserver = new MutationObserver(draw);
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    draw();
    return () => { observer.disconnect(); themeObserver.disconnect(); cancelAnimationFrame(frame); };
  }, [status, progress]);

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    const wheel = (event: WheelEvent) => {
      if (event.ctrlKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
      const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? 400 : 1);
      const next = Math.max(0, Math.min(1, positionRef.current + delta / 1800));
      // Release page scrolling at either end of the résumé.
      if (next === positionRef.current) return;
      event.preventDefault();
      positionRef.current = next;
      setProgress(next);
    };
    surface.addEventListener("wheel", wheel, { passive: false });
    return () => surface.removeEventListener("wheel", wheel);
  }, []);

  return { canvasRef, surfaceRef, progress, moveTo, status };
}

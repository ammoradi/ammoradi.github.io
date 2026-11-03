import { useEffect, useRef, useState } from "react";
import { drawResumeCylinder } from "../utils/draw-resume-cylinder";

export function useResumeCylinder() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const textureRef = useRef<HTMLCanvasElement | null>(null);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const positionRef = useRef(0);
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
        if (textureRef.current) drawResumeCylinder(canvas, textureRef.current, positionRef.current);
      });
    };
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    draw();
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
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

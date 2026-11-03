import { useRef, type CSSProperties } from "react";
import { ArrowDown, ArrowUp, RotateCcw } from "lucide-react";
import { useResumeCylinder } from "../../hooks/use-resume-cylinder";
import "./resume-cylinder.css";

export function ResumeCylinder() {
  const { canvasRef, surfaceRef, progress, moveTo, status } = useResumeCylinder();
  const drag = useRef<{ y: number; progress: number; pointerId: number } | null>(null);
  const percent = Math.round(progress * 100);

  return (
    <div className="resume-cylinder">
      <div className="cylinder-intro">
        <span className="cylinder-edition">A résumé, inscribed.</span>
        <p>Inspired by the Cyrus Cylinder. A different way to unroll my story.</p>
      </div>
      <div
        ref={surfaceRef}
        className="cylinder-surface"
        role="slider"
        aria-label="Roll the résumé cylinder"
        aria-describedby="cylinder-help"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-valuetext={`${percent}% through the résumé`}
        aria-orientation="vertical"
        tabIndex={0}
        onKeyDown={(event) => {
          const step = event.key === "PageDown" || event.key === "PageUp" ? 0.2 : 0.06;
          if (["ArrowDown", "ArrowRight", "PageDown"].includes(event.key)) moveTo(progress + step);
          else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(event.key)) moveTo(progress - step);
          else if (event.key === "Home") moveTo(0);
          else if (event.key === "End") moveTo(1);
          else return;
          event.preventDefault();
        }}
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0) return;
          event.preventDefault();
          event.currentTarget.ownerDocument.getSelection()?.removeAllRanges();
          drag.current = { y: event.clientY, progress, pointerId: event.pointerId };
          event.currentTarget.setPointerCapture(event.pointerId);
          event.currentTarget.focus({ preventScroll: true });
        }}
        onPointerMove={(event) => {
          if (drag.current?.pointerId === event.pointerId) {
            moveTo(drag.current.progress + (drag.current.y - event.clientY) / 850);
          }
        }}
        onPointerUp={(event) => {
          drag.current = null;
          if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
        }}
        onPointerCancel={() => { drag.current = null; }}
        onLostPointerCapture={() => { drag.current = null; }}
      >
        <canvas ref={canvasRef} aria-hidden="true" />
        {status !== "ready" && <p className="cylinder-loading" role="status">{status === "error" ? "The cylinder couldn’t load. You can still open the PDF preview or download the résumé." : "Preparing the inscription…"}</p>}
      </div>
      <div className="cylinder-controls">
        <button type="button" aria-label="Roll toward résumé beginning" disabled={progress === 0} onClick={() => moveTo(progress - 0.12)}><ArrowUp size={18} /></button>
        <label className="cylinder-position">
          <span>Roll to explore <span>{String(percent).padStart(2, "0")}%</span></span>
          <input type="range" min="0" max="100" value={percent} style={{ "--slider-progress": `${percent}%` } as CSSProperties} aria-label="Résumé position" onChange={(event) => moveTo(Number(event.target.value) / 100)} />
        </label>
        <button type="button" aria-label="Roll toward résumé end" disabled={progress === 1} onClick={() => moveTo(progress + 0.12)}><ArrowDown size={18} /></button>
        <button type="button" aria-label="Reset cylinder" disabled={progress === 0} onClick={() => moveTo(0)}><RotateCcw size={16} /></button>
      </div>
      <p className="cylinder-help" id="cylinder-help">Drag upward or scroll to roll · Arrow keys to explore<br /><span>Prefer a flat page? Switch to PDF preview above.</span></p>
    </div>
  );
}

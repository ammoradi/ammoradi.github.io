// Project the résumé around clay, then taper its ends into a barrel silhouette.
// Keeping the PDF preview as the texture gives both views the same source.
export function drawResumeCylinder(
  canvas: HTMLCanvasElement,
  texture: HTMLCanvasElement,
  progress: number,
) {
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (!width || !height) return;
  const density = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = Math.round(width * density);
  canvas.height = Math.round(height * density);
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  ctx.scale(density, density);

  const left = width * 0.07;
  const bodyWidth = width * 0.86;
  const radius = Math.min(height * 0.38, width * 0.22) * 1.05;
  const center = height * 0.46;
  const sourceWidth = texture.width - 160;
  const scale = sourceWidth / (bodyWidth * 0.91);
  const sourceCenter = 230 + progress * (texture.height - 480);
  // Render the inscription once before bending it along the barrel's length.
  const clay = document.createElement("canvas");
  clay.width = canvas.width;
  clay.height = canvas.height;
  const surface = clay.getContext("2d");
  if (!surface) return;
  surface.scale(density, density);
  const step = 1 / density;
  const isDark = document.documentElement.dataset.theme === "dark";
  const addEdgeFade = (shading: CanvasGradient, vertical = false) => {
    shading.addColorStop(0, "#00000000");
    shading.addColorStop(isDark ? (vertical ? 0.82 : 0.70) : 0.84, "#00000000");
    shading.addColorStop(isDark ? (vertical ? 0.90 : 0.84) : 0.90, isDark ? "#00000008" : "#00000002");
    shading.addColorStop(isDark ? (vertical ? 0.97 : 0.94) : 0.96, isDark ? "#0000001c" : "#00000009");
    shading.addColorStop(1, isDark ? "#00000030" : "#00000010");
  };
  for (let row = -radius; row <= radius; row += step) {
    const normalized = Math.max(-0.999, Math.min(0.999, row / radius));
    const angle = Math.asin(normalized);
    const bulge = Math.cos(angle);
    const inset = (1 - bulge) * bodyWidth * 0.035;
    const x = left + inset;
    const span = bodyWidth - inset * 2;
    const y = center + row;
    surface.fillStyle = "#fff";
    surface.fillRect(x, y, span, step + 0.05);

    const sourceY = sourceCenter + angle * radius * scale;
    if (sourceY >= 0 && sourceY < texture.height - 1) {
      // Preserve the body's coverage instead of making the paper rectangle more opaque.
      surface.globalCompositeOperation = "source-atop";
      surface.drawImage(texture, 80, sourceY, sourceWidth, Math.min(step * scale / Math.max(bulge, 0.12), texture.height - sourceY), x + span * 0.045, y, span * 0.91, step + 0.05);
      surface.globalCompositeOperation = "source-over";
    }
    const sideFadeDepth = radius * 0.5;
    surface.globalAlpha = 0.8;
    for (const [edge, inside] of [[x, x + sideFadeDepth], [x + span, x + span - sideFadeDepth]]) {
      const shading = surface.createLinearGradient(inside, 0, edge, 0);
      addEdgeFade(shading);
      surface.fillStyle = shading;
      surface.fillRect(Math.min(edge, inside), y, sideFadeDepth, step);
    }
    surface.globalAlpha = 1;
  }

  surface.globalCompositeOperation = "source-atop";
  // Keep decorative wedge impressions near the ends, clear of the reading area.
  // Project them with the résumé so they roll and taper with the clay.
  const impressions = [
    new Path2D("M-4-3 L1-2 L-4-1 Z M-4 1 L1 2 L-4 3 Z M2-4 L4-4 L3 4 Z"),
    new Path2D("M-4-4 L-2-4 L-3 3 Z M0-3 L4-2 L0-1 Z M0 1 L4 2 L0 3 Z"),
    new Path2D("M-4-3 L1-2 L-4-1 Z M-2 0 L3 1 L-2 2 Z M2-4 L4-3 L3 0 Z"),
  ];
  // Body-text baselines in the résumé preview are about 37 source pixels apart.
  const spacing = 37 / (radius * scale);
  const rotation = sourceCenter / (radius * scale);
  const markSize = Math.min(9, bodyWidth * 0.016) / 8;
  const columns = Array.from({ length: 70 }, (_, column) => {
    const fromEdge = Math.min(column, 69 - column);
    return {
      margin: column < 35 ? 0.0165 + fromEdge * 0.014 : 0.9835 - fromEdge * 0.014,
      edgeOpacity: fromEdge < 4 ? 1 - fromEdge * 0.22 : 0,
    };
  });
  surface.save();
  surface.fillStyle = "#64584b";
  for (let index = Math.ceil((rotation - 1.45) / spacing); index * spacing < rotation + 1.45; index++) {
    const angle = index * spacing - rotation;
    const bulge = Math.cos(angle);
    const inset = (1 - bulge) * bodyWidth * 0.035;
    const span = bodyWidth - inset * 2;
    const y = center + Math.sin(angle) * radius;
    // Use the PDF's blank top and bottom margins for short patterned bands.
    const sourceLine = index * 37;
    const endOpacity = Math.min(1, Math.max(0, (55 - sourceLine) / 74, (sourceLine - (texture.height - 90)) / 74));
    for (const [column, { margin, edgeOpacity }] of columns.entries()) {
      const opacity = Math.max(edgeOpacity, endOpacity);
      if (!opacity) continue;
      const impression = impressions[((index + column) % impressions.length + impressions.length) % impressions.length];
      surface.save();
      surface.globalAlpha = 0.20 * bulge * opacity;
      surface.translate(left + inset + span * margin, y);
      surface.scale(markSize, markSize * bulge);
      surface.fill(impression);
      surface.restore();
    }
  }
  surface.restore();

  for (const direction of [-1, 1]) {
    const edge = center + direction * radius;
    const shading = surface.createLinearGradient(0, center, 0, edge);
    addEdgeFade(shading, true);
    surface.fillStyle = shading;
    surface.fillRect(0, Math.min(center, edge), width, radius + step);
  }

  // Keep the reading band level while tapering the shoulders around it.
  const bandTop = Math.round((center - radius * 0.45) * density);
  const bandBottom = Math.round((center + radius * 0.45) * density);
  const top = bandTop / density;
  const bottom = bandBottom / density;
  for (let column = Math.floor(left * density) - 2; column < (left + bodyWidth) * density + 2; column++) {
    const x = column / density;
    const position = Math.max(-1, Math.min(1, ((x - left) / bodyWidth) * 2 - 1));
    const profile = 1 - 0.32 * position * position;
    const shoulderScale = (profile - 0.45) / 0.55;
    const taperedTop = top * (1 - shoulderScale);
    const taperedBottom = bottom + (clay.height / density - bottom) * shoulderScale;
    ctx.drawImage(clay, column, 0, 1, bandTop, x, taperedTop, step + 0.05, top - taperedTop);
    ctx.drawImage(clay, column, bandTop, 1, bandBottom - bandTop, x, top, step + 0.05, bottom - top);
    ctx.drawImage(clay, column, bandBottom, 1, clay.height - bandBottom, x, bottom, step + 0.05, taperedBottom - bottom);
  }
}

// Shared binary-search image compression core, used by every /image/ tool
// variant (custom-only, preset-based, and the fixed-target pages). Kept in
// one place so all of them compress identically — only the surrounding UI
// (which target(s) are offered) differs per page.

const MIN_QUALITY = 0.05;
const MAX_QUALITY = 0.92;
const MIN_DIMENSION = 80;
const SCALE_STEP = 0.85;
const MAX_DIMENSION_PASSES = 12;
const QUALITY_SEARCH_STEPS = 8;

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${Math.round(bytes)} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function loadImage(file: File): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Could not read this image file.'));
    img.src = URL.createObjectURL(file);
  });
}

function canvasToBlob(img: HTMLImageElement, width: number, height: number, quality: number): Promise<Blob | null> {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  // Fill white first so transparent PNGs don't turn black when flattened to JPEG.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, width, height);
  ctx.drawImage(img, 0, 0, width, height);
  return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg', quality));
}

async function searchQuality(img: HTMLImageElement, width: number, height: number, targetBytes: number): Promise<Blob> {
  let lo = MIN_QUALITY;
  let hi = MAX_QUALITY;
  let best: Blob | null = null;
  for (let i = 0; i < QUALITY_SEARCH_STEPS; i++) {
    const mid = (lo + hi) / 2;
    const blob = await canvasToBlob(img, width, height, mid);
    if (!blob) break;
    if (blob.size <= targetBytes) {
      best = blob;
      lo = mid;
    } else {
      hi = mid;
    }
  }
  if (best) return best;
  return (await canvasToBlob(img, width, height, MIN_QUALITY))!;
}

export interface CompressResult {
  blob: Blob;
  width: number;
  height: number;
  reachedTarget: boolean;
}

export async function compressToTarget(file: File, targetBytes: number): Promise<CompressResult> {
  const img = await loadImage(file);
  let width = img.naturalWidth;
  let height = img.naturalHeight;

  let blob = await searchQuality(img, width, height, targetBytes);
  let pass = 0;
  while (blob.size > targetBytes && Math.max(width, height) > MIN_DIMENSION && pass < MAX_DIMENSION_PASSES) {
    width = Math.max(MIN_DIMENSION, Math.round(width * SCALE_STEP));
    height = Math.max(MIN_DIMENSION, Math.round(height * SCALE_STEP));
    blob = await searchQuality(img, width, height, targetBytes);
    pass++;
  }

  URL.revokeObjectURL(img.src);
  return { blob, width, height, reachedTarget: blob.size <= targetBytes };
}

export function isSupportedImage(file: File): boolean {
  return /^image\/(jpeg|png|webp)$/.test(file.type);
}

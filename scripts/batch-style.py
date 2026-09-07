#!/usr/bin/env python3
"""
Batch-apply a muted documentary field-photography grade to a folder of images,
and unify them toward a common color/tone target so they read as one set even
when the sources come from very different visual worlds (camera photos,
screenshots, scans, etc).

Look: subdued natural colors, slightly warm and earthy, reduced saturation,
softened highlights, restrained contrast, dusty greens/blues, warm off-whites,
deep neutral shadows. Skin tones and photographic realism are preserved --
this is a subtle grade, not a vintage/sepia/cinematic filter.

Unification works in two passes per image:
  1. Match each image's per-channel mean/std and average saturation toward a
     fixed target (statistics transfer, a la Reinhard color transfer). This
     pulls wildly different exposures/color casts/saturation levels toward
     the same baseline before the look is applied, which is what makes a mixed
     folder feel like one shoot instead of nine independent edits.
  2. Apply the shared warm/muted tone curve on top as the final "look".

Usage:
    python3 scripts/batch-style.py public/shots/about
    python3 scripts/batch-style.py public/shots/about -o public/shots/about/styled
    python3 scripts/batch-style.py public/shots/about --strength 0.7 --grain
    python3 scripts/batch-style.py in_dir -o out_dir --unify-strength 0.8

Requires: Pillow (pip install Pillow)
"""

import argparse
import math
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageEnhance

EXTENSIONS = {".png", ".jpg", ".jpeg", ".tif", ".tiff", ".webp"}

# Target stats for the unification pass -- every image is pulled toward these
# before the grade is applied. Kept close to natural-photo averages (R > G > B
# just for a mild warm bias) so this pass homogenizes exposure/color/contrast
# across sources without itself flattening the image -- the muted "look" is a
# separate, independently-tunable step (see apply_documentary_grade strength).
TARGET_MEAN = (128.0, 123.0, 117.0)
TARGET_STD = (55.0, 53.0, 50.0)
TARGET_SATURATION = 90.0  # 0-255 scale (HSV S channel)

# How far a per-channel std ratio can push the contrast, clamped so that
# bimodal/high-dynamic-range sources (e.g. a bright subject against near-
# black water) don't get stretched into blown highlights and crushed blacks.
STATS_RATIO_RANGE = (0.6, 1.6)


def soft_clip(v: float, lo: float = 0.0, hi: float = 255.0, knee: float = 24.0) -> float:
    """Clamp to [lo, hi] with a smooth exponential roll-off inside `knee` of
    each edge, instead of a hard cut -- avoids posterized/blown-out patches
    on high-contrast source images."""
    if v < lo + knee:
        d = (lo + knee) - v
        return (lo + knee) - knee * (1 - math.exp(-d / knee))
    if v > hi - knee:
        d = v - (hi - knee)
        return (hi - knee) + knee * (1 - math.exp(-d / knee))
    return v


def channel_mean_std(band: Image.Image) -> tuple:
    hist = band.histogram()
    total = sum(hist)
    if total == 0:
        return 128.0, 50.0
    mean = sum(i * c for i, c in enumerate(hist)) / total
    var = sum(((i - mean) ** 2) * c for i, c in enumerate(hist)) / total
    return mean, var ** 0.5


def blended_stats_lut(mean: float, std: float, target_mean: float,
                       target_std: float, strength: float) -> list:
    """LUT that linearly blends the identity mapping with a full statistics
    match (x - mean) * target_std/std + target_mean, by `strength`."""
    std = max(std, 1e-3)
    ratio = max(STATS_RATIO_RANGE[0], min(STATS_RATIO_RANGE[1], target_std / std))
    scale = (1 - strength) + strength * ratio
    offset = strength * (target_mean - mean * ratio)
    return [round(soft_clip(x * scale + offset)) for x in range(256)]


def match_statistics(rgb: Image.Image, strength: float) -> Image.Image:
    bands = []
    for band, t_mean, t_std in zip(rgb.split(), TARGET_MEAN, TARGET_STD):
        mean, std = channel_mean_std(band)
        bands.append(band.point(blended_stats_lut(mean, std, t_mean, t_std, strength)))
    return Image.merge("RGB", bands)


def match_saturation(rgb: Image.Image, strength: float) -> Image.Image:
    hsv = rgb.convert("HSV")
    h, s, v = hsv.split()
    mean, _ = channel_mean_std(s)
    mean = max(mean, 1.0)
    factor = 1 + (TARGET_SATURATION / mean - 1) * strength
    factor = max(0.4, min(1.6, factor))
    s = s.point(lambda x: max(0, min(255, round(x * factor))))
    return Image.merge("HSV", (h, s, v)).convert("RGB")


def channel_lut(lift: float, white_point: float, offset: float) -> list:
    lut = []
    for x in range(256):
        y = lift + (white_point - lift) * (x / 255.0) + offset
        lut.append(round(soft_clip(y)))
    return lut


def apply_documentary_grade(img: Image.Image, strength: float = 1.0,
                             unify: bool = True, unify_strength: float = 0.7,
                             grain: bool = False, grain_amount: float = 6.0) -> Image.Image:
    """Apply the muted documentary field-photography look. `strength` scales
    the whole effect from 0 (no change) to 1 (default) and beyond."""

    has_alpha = img.mode in ("RGBA", "LA")
    alpha = img.split()[-1] if has_alpha else None
    rgb = img.convert("RGB")

    if unify:
        rgb = match_statistics(rgb, unify_strength * strength)
        rgb = match_saturation(rgb, unify_strength * strength)

    # Restrained contrast + softened highlights: compress the tonal range
    # toward a lifted black point and a lowered white point.
    lift = 10 * strength
    white_point = 255 - (255 - 244) * strength

    # Warm, dusty color grade: gently push red up, keep green near-neutral,
    # pull blue down. Kept small so skin tones stay natural.
    r_offset = 6 * strength
    g_offset = 1 * strength
    b_offset = -7 * strength

    r, g, b = rgb.split()
    r = r.point(channel_lut(lift, white_point, r_offset))
    g = g.point(channel_lut(lift, white_point, g_offset))
    b = b.point(channel_lut(lift, white_point, b_offset))
    rgb = Image.merge("RGB", (r, g, b))

    # Reduced saturation -- dusty rather than desaturated to gray.
    sat_factor = 1 - 0.18 * strength
    rgb = ImageEnhance.Color(rgb).enhance(sat_factor)

    if grain:
        noise = Image.effect_noise(rgb.size, grain_amount)
        noise_rgb = Image.merge("RGB", (noise, noise, noise))
        textured = ImageChops.overlay(rgb, noise_rgb)
        rgb = Image.blend(rgb, textured, 0.12 * strength)

    if has_alpha:
        rgb.putalpha(alpha)
        return rgb
    return rgb


def process_folder(input_dir: Path, output_dir: Path, strength: float,
                    unify: bool, unify_strength: float,
                    grain: bool, grain_amount: float, jpeg_quality: int) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    files = sorted(p for p in input_dir.iterdir() if p.suffix.lower() in EXTENSIONS)

    if not files:
        print(f"No images found in {input_dir}")
        return

    for path in files:
        try:
            with Image.open(path) as img:
                styled = apply_documentary_grade(img, strength, unify, unify_strength,
                                                  grain, grain_amount)
                out_path = output_dir / path.name
                save_kwargs = {}
                if path.suffix.lower() in (".jpg", ".jpeg"):
                    save_kwargs = {"quality": jpeg_quality, "optimize": True}
                styled.save(out_path, **save_kwargs)
                print(f"  {path.name} -> {out_path.relative_to(output_dir.parent)}")
        except Exception as e:
            print(f"  SKIPPED {path.name}: {e}", file=sys.stderr)


def main():
    parser = argparse.ArgumentParser(description=__doc__,
                                      formatter_class=argparse.RawDescriptionHelpFormatter)
    parser.add_argument("input", type=Path, help="Folder of source images")
    parser.add_argument("-o", "--output", type=Path, default=None,
                         help="Output folder (default: <input>/styled)")
    parser.add_argument("--strength", type=float, default=0.55,
                         help="Muted-grade strength, 0-2 (default: 0.55, lighter touch)")
    parser.add_argument("--no-unify", action="store_true",
                         help="Skip the cross-image statistics matching pass "
                              "(apply the grade to each image independently)")
    parser.add_argument("--unify-strength", type=float, default=0.7,
                         help="How hard to pull images toward the common target "
                              "stats, 0-1 (default: 0.7)")
    parser.add_argument("--grain", action="store_true",
                         help="Add a very subtle film-grain texture")
    parser.add_argument("--grain-amount", type=float, default=6.0,
                         help="Grain noise sigma when --grain is set (default: 6.0)")
    parser.add_argument("--jpeg-quality", type=int, default=92,
                         help="JPEG save quality (default: 92)")
    args = parser.parse_args()

    if not args.input.is_dir():
        parser.error(f"{args.input} is not a directory")

    output_dir = args.output or (args.input / "styled")
    if output_dir.resolve() == args.input.resolve():
        parser.error("Output folder must differ from the input folder")

    print(f"Styling images in {args.input} -> {output_dir} "
          f"(strength={args.strength}, unify={not args.no_unify})")
    process_folder(args.input, output_dir, args.strength, not args.no_unify,
                    args.unify_strength, args.grain, args.grain_amount, args.jpeg_quality)


if __name__ == "__main__":
    main()

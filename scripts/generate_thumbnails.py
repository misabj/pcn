import json
import math
import os
import random
from pathlib import Path

from PIL import Image, ImageDraw, ImageEnhance, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
OUT_DIR = ROOT / "public" / "projects"
LOCALES_DIR = ROOT / "src" / "locales"
FONT_PATH = ROOT / "public" / "fonts" / "CenturyGothicPaneuropeanRegular.ttf"

SIZE = (1200, 900)

PROJECTS = [
    {"name": "Smashburger", "category": "webapps"},
    {"name": "Realestate", "category": "websites"},
    {"name": "DotConnection", "category": "websites"},
    {"name": "Portfolio", "category": "websites"},
    {"name": "Parem", "category": "webapps"},
    {"name": "RadiSad", "category": "websites"},
    {"name": "Zamah media", "category": "webapps"},
    {"name": "Mondo 33", "category": "webapps"},
    {"name": "Magic Crystals", "category": "websites"},
    {"name": "Jarac", "category": "websites"},
    {"name": "E Commerce", "category": "websites"},
    {"name": "Marko Fizio", "category": "websites"},
]


def slugify(name: str) -> str:
    return "".join(c.lower() for c in name if c.isalnum()) + ".jpg"


def hsl_to_rgb(h: float, s: float, l: float) -> tuple[int, int, int]:
    """Convert HSL (0-1) to RGB (0-255)."""
    c = (1 - abs(2 * l - 1)) * s
    x = c * (1 - abs((h * 6) % 2 - 1))
    m = l - c / 2
    h6 = h * 6
    if h6 < 1:
        r, g, b = c, x, 0
    elif h6 < 2:
        r, g, b = x, c, 0
    elif h6 < 3:
        r, g, b = 0, c, x
    elif h6 < 4:
        r, g, b = 0, x, c
    elif h6 < 5:
        r, g, b = x, 0, c
    else:
        r, g, b = c, 0, x
    return (
        int((r + m) * 255),
        int((g + m) * 255),
        int((b + m) * 255),
    )


def palette_for(idx: int, category: str) -> list[tuple[int, int, int]]:
    """Generate 2-3 accent colors for a project."""
    base_hue = (idx * 0.12 + (0.05 if category == "webapps" else 0.62)) % 1.0
    colors = []
    for offset in [0, 0.18, -0.12]:
        h = (base_hue + offset) % 1.0
        colors.append(hsl_to_rgb(h, 0.78, 0.68))
    return colors


def radial_gradient(size: tuple[int, int], center: tuple[float, float], radius: int,
                    color: tuple[int, int, int], max_alpha: int) -> Image.Image:
    """Create a soft radial gradient on a transparent RGBA layer."""
    layer = Image.new("RGBA", size, (0, 0, 0, 0))
    draw = ImageDraw.Draw(layer)
    cx, cy = center
    for r in range(radius, 0, -2):
        alpha = int(max_alpha * (r / radius) ** 1.4)
        draw.ellipse(
            [cx - r, cy - r, cx + r, cy + r],
            fill=(*color, alpha),
        )
    return layer


def add_noise(img: Image.Image, amount: int = 6) -> Image.Image:
    """Add very subtle monochromatic noise."""
    noise = Image.effect_noise((img.width // 4, img.height // 4), 128).convert("L")
    noise = noise.resize(img.size, Image.Resampling.BILINEAR)
    noise = ImageEnhance.Brightness(noise).enhance(amount / 128)
    noise_col = Image.merge("RGB", [noise, noise, noise])
    return Image.blend(img, noise_col, 0.03)


def initials(name: str) -> str:
    parts = name.split()
    if len(parts) == 1:
        return (parts[0][0] + parts[0][1]).upper()
    return "".join(p[0] for p in parts[:2]).upper()


def generate_thumbnail(project: dict, idx: int) -> Image.Image:
    name = project["name"]
    category = project["category"]
    colors = palette_for(idx, category)

    img = Image.new("RGB", SIZE, "#050505")

    # Base dark gradient
    base = Image.new("RGB", SIZE, "#050505")
    draw = ImageDraw.Draw(base)
    for y in range(SIZE[1]):
        t = y / SIZE[1]
        r = int(12 + t * 16)
        g = int(12 + t * 16)
        b = int(14 + t * 18)
        draw.line([(0, y), (SIZE[0], y)], fill=(r, g, b))
    img = Image.blend(img, base, 0.6)

    # Colored mesh blobs
    random.seed(idx)
    for i, color in enumerate(colors):
        cx = random.randint(150, SIZE[0] - 150)
        cy = random.randint(100, SIZE[1] - 100)
        radius = random.randint(400, 700)
        layer = radial_gradient(SIZE, (cx, cy), radius, color, 170)
        layer = layer.filter(ImageFilter.GaussianBlur(radius=55))
        img = Image.alpha_composite(img.convert("RGBA"), layer).convert("RGB")

    # Subtle vignette
    vignette = Image.new("L", SIZE, 0)
    vdraw = ImageDraw.Draw(vignette)
    vdraw.ellipse([-SIZE[0] // 2, -SIZE[1] // 2, SIZE[0] * 1.5, SIZE[1] * 1.5], fill=115)
    vignette = vignette.filter(ImageFilter.GaussianBlur(radius=250))
    img = Image.composite(img, Image.new("RGB", SIZE, "#000000"), vignette)

    # Very subtle grid
    grid = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(grid)
    step = 80
    for x in range(0, SIZE[0], step):
        gdraw.line([(x, 0), (x, SIZE[1])], fill=(255, 255, 255, 8))
    for y in range(0, SIZE[1], step):
        gdraw.line([(0, y), (SIZE[0], y)], fill=(255, 255, 255, 8))
    img = Image.alpha_composite(img.convert("RGBA"), grid).convert("RGB")

    # Large faint initials
    try:
        font = ImageFont.truetype(str(FONT_PATH), 320)
    except Exception:
        font = ImageFont.load_default()
    text = initials(name)
    bbox = ImageDraw.Draw(Image.new("RGBA", (1, 1))).textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (SIZE[0] - tw) // 2
    ty = (SIZE[1] - th) // 2
    text_layer = Image.new("RGBA", SIZE, (0, 0, 0, 0))
    tdraw = ImageDraw.Draw(text_layer)
    tdraw.text((tx, ty), text, font=font, fill=(255, 255, 255, 55))
    text_layer = text_layer.filter(ImageFilter.GaussianBlur(radius=4))
    img = Image.alpha_composite(img.convert("RGBA"), text_layer).convert("RGB")

    # Fine noise
    from PIL import ImageEnhance
    img = add_noise(img, 5)

    return img


def update_locales():
    for lang_file in LOCALES_DIR.glob("*.json"):
        data = json.loads(lang_file.read_text(encoding="utf-8"))
        projects = data.get("portfolio", {}).get("projects", [])
        for i, project in enumerate(projects):
            project["image"] = f"/projects/{slugify(PROJECTS[i]['name'])}"
        lang_file.write_text(json.dumps(data, indent=4, ensure_ascii=False) + "\n", encoding="utf-8")


def main():
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    for i, project in enumerate(PROJECTS):
        img = generate_thumbnail(project, i)
        out_path = OUT_DIR / slugify(project["name"])
        img.save(out_path, "JPEG", quality=90)
        print(f"Saved {out_path}")
    update_locales()
    print("Locales updated.")


if __name__ == "__main__":
    main()

"""Gera public/og-image.png (1200x630), a imagem de prévia em links compartilhados.

Uso: python scripts/build_og_image.py
"""
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont, ImageOps

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "public" / "og-image.png"
AVATAR = ROOT / "src" / "assets" / "filipi.jpg"
FONTS = Path("C:/Windows/Fonts")

W, H = 1200, 630
BG = (9, 12, 16)
FG = (237, 240, 245)
MUTED = (139, 148, 158)
ACCENT = (59, 130, 246)
LINE = (33, 38, 45)


def font(name: str, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(FONTS / name), size)


img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img)

# Grade sutil de fundo
for x in range(0, W, 60):
    d.line([(x, 0), (x, H)], fill=(14, 18, 24))
for y in range(0, H, 60):
    d.line([(0, y), (W, y)], fill=(14, 18, 24))

pad = 72
d.text((pad, 92), "PORTFÓLIO // 2026", font=font("consolab.ttf", 22), fill=ACCENT)
d.text((pad, 150), "Filipi Soares", font=font("segoeuib.ttf", 92), fill=FG)
d.text((pad, 262), "Desenvolvedor Full Stack", font=font("segoeui.ttf", 44), fill=MUTED)
d.rectangle([pad, 348, pad + 96, 352], fill=ACCENT)
d.text(
    (pad, 384),
    "React · TypeScript · Python · FastAPI\nFlask · Node.js · PostgreSQL · IA",
    font=font("consola.ttf", 28),
    fill=FG,
    spacing=14,
)
d.line([(pad, H - 96), (W - pad, H - 96)], fill=LINE, width=2)
d.text((pad, H - 72), "github.com/filipiss", font=font("consola.ttf", 24), fill=MUTED)

# Foto com cantos arredondados à direita
size = 330
photo = ImageOps.fit(Image.open(AVATAR).convert("RGB"), (size, size))
mask = Image.new("L", (size, size), 0)
ImageDraw.Draw(mask).rounded_rectangle([0, 0, size, size], radius=18, fill=255)
px, py = W - pad - size, 110
d.rounded_rectangle([px - 4, py - 4, px + size + 4, py + size + 4], radius=22, outline=ACCENT, width=3)
img.paste(photo, (px, py), mask)

OUT.parent.mkdir(exist_ok=True)
img.save(OUT, optimize=True)
print(f"OK: {OUT} ({OUT.stat().st_size // 1024} kB)")

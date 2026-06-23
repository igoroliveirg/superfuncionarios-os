// Normaliza a cor de marca do cliente para uso seguro no tema ESCURO da landing.
// Retorna { accent, accent2, grad } (hex) ou null se a cor não serve como
// acento (branco/preto/cinza/inválida) — aí o chamador usa um default do nicho.

const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n))

function parseHex(hex) {
  if (typeof hex !== 'string') return null
  let h = hex.trim().replace(/^#/, '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (!/^[0-9a-f]{6}$/i.test(h)) return null
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16))
}

function rgbToHsl([r, g, b]) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b)
  const l = (max + min) / 2
  let h = 0, s = 0
  if (max !== min) {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    if (max === r) h = (g - b) / d + (g < b ? 6 : 0)
    else if (max === g) h = (b - r) / d + 2
    else h = (r - g) / d + 4
    h /= 6
  }
  return [h * 360, s, l]
}

function hslToHex(h, s, l) {
  h = ((h % 360) + 360) % 360 / 360
  const hue = (p, q, t) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  let r, g, b
  if (s === 0) { r = g = b = l } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s
    const p = 2 * l - q
    r = hue(p, q, h + 1 / 3); g = hue(p, q, h); b = hue(p, q, h - 1 / 3)
  }
  const to = (x) => Math.round(x * 255).toString(16).padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`
}

export function safeAccent(hex) {
  const rgb = parseHex(hex)
  if (!rgb) return null
  const [h, s] = rgbToHsl(rgb)
  if (s < 0.12) return null // cinza/branco/preto: não serve de acento
  return {
    accent: hslToHex(h, clamp(s, 0.5, 0.95), clamp(rgbToHsl(rgb)[2], 0.46, 0.6)),
    accent2: hslToHex(h, clamp(s + 0.05, 0.5, 0.98), clamp(rgbToHsl(rgb)[2] - 0.12, 0.34, 0.5)),
    grad: hslToHex(h, clamp(s, 0.45, 0.9), clamp(rgbToHsl(rgb)[2] + 0.14, 0.6, 0.72)),
  }
}

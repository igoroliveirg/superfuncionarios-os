// Extrai a cor de marca REAL do site (não adivinha). Server-side.
// Prioridade: <meta name="theme-color"> (cor declarada) → cor saturada
// dominante no HTML/CSS inline + 1ª folha de estilo. null se nada utilizável.

const normalize = (u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`)

function toHex(str) {
  if (!str) return null
  let s = String(str).trim().toLowerCase()
  const rgb = s.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/)
  if (rgb) {
    const h = rgb.slice(1, 4).map((n) => Math.min(255, +n).toString(16).padStart(2, '0')).join('')
    return `#${h}`
  }
  s = s.replace(/^#/, '')
  if (s.length === 3) s = s.split('').map((c) => c + c).join('')
  return /^[0-9a-f]{6}$/.test(s) ? `#${s}` : null
}

function hsl(hex) {
  const [r, g, b] = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2
  let s = 0
  if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min) }
  return [s, l]
}

// cinza/branco/preto não servem de acento
const isNeutral = (hex) => { const [s, l] = hsl(hex); return s < 0.2 || l > 0.92 || l < 0.08 }

function absolutize(href, base) {
  try { return new URL(href, base).href } catch { return null }
}

export async function extractBrandColor(url) {
  const target = normalize(url)
  let html = ''
  try {
    const r = await fetch(target, { headers: { 'User-Agent': 'Mozilla/5.0 SFOS-bot' } })
    html = await r.text()
  } catch { return null }

  // 1) theme-color declarado (sinal mais confiável)
  const tc = html.match(/<meta[^>]+name=["']theme-color["'][^>]*content=["']([^"']+)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']+)["'][^>]*name=["']theme-color["']/i)
  const themed = tc && toHex(tc[1])
  if (themed && !isNeutral(themed)) return themed

  // 2) cor saturada dominante no CSS (HTML inline + 1ª folha de estilo)
  let css = html
  const links = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi)].slice(0, 1)
  for (const m of links) {
    const href = absolutize(m[1], target)
    if (!href) continue
    try { const r = await fetch(href); css += '\n' + await r.text() } catch { /* ignora */ }
  }

  const freq = new Map()
  const add = (hex) => { if (hex && !isNeutral(hex)) freq.set(hex, (freq.get(hex) || 0) + 1) }
  for (const m of css.matchAll(/#[0-9a-fA-F]{3,6}\b/g)) add(toHex(m[0]))
  for (const m of css.matchAll(/rgba?\([^)]*\)/g)) add(toHex(m[0]))

  let best = null, max = 0
  for (const [hex, n] of freq) if (n > max) { max = n; best = hex }
  return best
}

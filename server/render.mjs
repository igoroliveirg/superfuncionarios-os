// Renderiza o site (headless) e lê a IDENTIDADE real do DOM: cor de marca a
// partir do ESTILO COMPUTADO de botões/CTAs (não de print — print pega cor de
// imagem) + tema claro/escuro do fundo do body. 100% automático.
// Sem Playwright (ex.: Vercel) ou site que não carrega → null → fallback heurístico.

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
const normalize = (u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`)

function rgbHsl(r, g, b) {
  r /= 255; g /= 255; b /= 255
  const max = Math.max(r, g, b), min = Math.min(r, g, b), l = (max + min) / 2
  let s = 0
  if (max !== min) { const d = max - min; s = l > 0.5 ? d / (2 - max - min) : d / (max + min) }
  return [s, l]
}
function parseRgb(str) {
  const m = String(str || '').match(/rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)(?:[,\s/]+([\d.]+))?/i)
  if (!m) return null
  if (m[4] !== undefined && parseFloat(m[4]) < 0.5) return null // transparente
  return [+m[1], +m[2], +m[3]]
}
const toHex = ([r, g, b]) => '#' + [r, g, b].map((x) => Math.min(255, x).toString(16).padStart(2, '0')).join('')

// cor de marca = bg de botão/CTA saturado mais frequente (peso 3 p/ bg, 1 p/ texto)
export function pickBrand(entries) {
  const freq = new Map()
  for (const [c, w] of entries || []) {
    const rgb = parseRgb(c); if (!rgb) continue
    const [s, l] = rgbHsl(...rgb)
    if (s < 0.25 || l > 0.92 || l < 0.08) continue // neutro
    const hex = toHex(rgb)
    freq.set(hex, (freq.get(hex) || 0) + w)
  }
  let best = null, max = 0
  for (const [h, n] of freq) if (n > max) { max = n; best = h }
  return best
}
export function themeFromBg(bgStr) {
  const rgb = parseRgb(bgStr); if (!rgb) return null
  return rgbHsl(...rgb)[1] >= 0.5 ? 'light' : 'dark'
}

// roda no contexto da página
const EXTRACT = () => {
  const els = Array.from(document.querySelectorAll('a,button,[class*="btn"],[class*="Button"],[class*="cta"],[class*="Cta"]')).slice(0, 600)
  const c = {}
  for (const el of els) {
    const r = el.getBoundingClientRect()
    if (r.width < 10 || r.height < 8) continue
    const cs = getComputedStyle(el)
    c[cs.backgroundColor] = (c[cs.backgroundColor] || 0) + 3
    c[cs.color] = (c[cs.color] || 0) + 1
  }
  return { entries: Object.entries(c), bg: getComputedStyle(document.body).backgroundColor }
}

const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('t')), ms))])

// browser único, reusado entre requests (evita cold start a cada análise)
let browserP = null
async function getBrowser() {
  let chromium
  try { ({ chromium } = await import('playwright')) } catch { return null }
  if (!browserP) browserP = chromium.launch({ headless: true }).catch(() => { browserP = null; return null })
  return browserP
}

// pré-aquece o chromium no boot do servidor (1ª análise já sai rápida)
export function prewarm() { getBrowser() }

export async function renderStyle(url) {
  const browser = await getBrowser()
  if (!browser) return null
  let ctx
  try {
    ctx = await browser.newContext({ userAgent: UA, viewport: { width: 1280, height: 800 } })
    const work = (async () => {
      const page = await ctx.newPage()
      await page.goto(normalize(url), { waitUntil: 'domcontentloaded', timeout: 8000 }).catch(() => {})
      await page.waitForTimeout(1200) // deixa o SPA pintar
      const data = await withTimeout(page.evaluate(EXTRACT), 3000).catch(() => null)
      if (!data) return null
      const theme = themeFromBg(data.bg)
      if (theme === null && (!data.entries || !data.entries.length)) return null // não carregou
      return { color: pickBrand(data.entries), theme: theme || 'light' }
    })()
    // cap rígido: site blindado (Zuppy) nunca trava o demo → null → fallback
    return await Promise.race([work, new Promise((res) => setTimeout(() => res(null), 9000))])
  } catch { browserP = null; return null } // browser pode ter caído → reseta
  finally { try { await ctx?.close() } catch { /* noop */ } }
}

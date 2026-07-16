// Extrai a IDENTIDADE visual real do site (cor de marca + tema claro/escuro).
// Server-side. Não adivinha: lê HTML/CSS de verdade.

const normalize = (u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`)
const NAMED = { white: '#ffffff', black: '#000000' }
// UA de navegador real: "SFOS-bot" era barrado por anti-bot antes de ler a cor
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'

function toHex(str) {
  if (!str) return null
  let s = String(str).trim().toLowerCase()
  if (NAMED[s]) return NAMED[s]
  const rgb = s.match(/^rgba?\(\s*(\d+)[,\s]+(\d+)[,\s]+(\d+)/)
  if (rgb) return '#' + rgb.slice(1, 4).map((n) => Math.min(255, +n).toString(16).padStart(2, '0')).join('')
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

const isNeutral = (hex) => { const [s, l] = hsl(hex); return s < 0.2 || l > 0.92 || l < 0.08 }

function absolutize(href, base) { try { return new URL(href, base).href } catch { return null } }

// fetch direto com UA de navegador real
async function fetchDirect(target) {
  try {
    const r = await fetch(target, { headers: { 'User-Agent': UA } })
    if (r.ok === false) return null // 4xx/5xx (ex.: 403 anti-bot) → tenta Jina
    const html = await r.text()
    return html && html.trim() ? html : null
  } catch { return null }
}

// fallback anti-bot: Jina Reader renderiza server-side e devolve o HTML (passa
// por bloqueios que barram fetch/chromium; foi assim que pegamos o texto do site)
async function fetchViaJina(target) {
  try {
    const headers = { 'X-Return-Format': 'html' }
    if (process.env.JINA_API_KEY) headers.Authorization = `Bearer ${process.env.JINA_API_KEY}`
    const r = await fetch(`https://r.jina.ai/${target}`, { headers })
    if (r.ok === false) return null
    const html = await r.text()
    return html && html.trim() ? html : null
  } catch { return null }
}

async function load(url) {
  const target = normalize(url)
  let html = await fetchDirect(target)
  if (!html) html = await fetchViaJina(target) // site anti-bot → tenta via Jina
  if (!html) return null
  let css = html
  const links = [...html.matchAll(/<link[^>]+rel=["']stylesheet["'][^>]*href=["']([^"']+)["']/gi)].slice(0, 1)
  for (const m of links) {
    const href = absolutize(m[1], target)
    if (!href) continue
    try { const r = await fetch(href, { headers: { 'User-Agent': UA } }); css += '\n' + await r.text() } catch { /* ignora */ }
  }
  return { target, html, css }
}

function pickColor(css) {
  const freq = new Map()
  const add = (hex) => { if (hex && !isNeutral(hex)) freq.set(hex, (freq.get(hex) || 0) + 1) }
  // theme-color tem peso extra (sinal de marca)
  const tc = css.match(/theme-color["'][^>]*content=["']([^"']+)["']/i)
  const themed = tc && toHex(tc[1])
  if (themed && !isNeutral(themed)) return themed
  for (const m of css.matchAll(/#[0-9a-fA-F]{3,6}\b/g)) add(toHex(m[0]))
  for (const m of css.matchAll(/rgba?\([^)]*\)/g)) add(toHex(m[0]))
  let best = null, max = 0
  for (const [hex, n] of freq) if (n > max) { max = n; best = hex }
  return best
}

// tema do site: 'light' | 'dark'. Default 'light' (a maioria dos sites de
// marca é clara); só vira 'dark' quando o fundo é claramente escuro.
function pickTheme(html, css) {
  const cs = html.match(/<meta[^>]+name=["']color-scheme["'][^>]*content=["']([^"']+)["']/i)
  if (cs) { const v = cs[1].toLowerCase(); if (/dark/.test(v) && !/light/.test(v)) return 'dark'; if (/light/.test(v) && !/dark/.test(v)) return 'light' }
  const bg = css.match(/\b(?:body|html|:root)[^{}]*\{[^}]*?background(?:-color)?\s*:\s*([^;}]+)/i)
  const bgHex = bg && toHex(bg[1].trim().split(/\s+/)[0])
  if (bgHex) return hsl(bgHex)[1] >= 0.5 ? 'light' : 'dark'
  let light = 0, dark = 0
  for (const m of css.matchAll(/#[0-9a-fA-F]{3,6}\b/g)) {
    const h = toHex(m[0]); if (!h) continue
    const [s, l] = hsl(h)
    if (s < 0.15) { if (l > 0.85) light++; else if (l < 0.12) dark++ }
  }
  if (dark > light * 1.2) return 'dark'
  return 'light'
}

export async function extractBrandStyle(url) {
  const r = await load(url)
  if (!r) return { color: null, theme: 'dark' }
  return { color: pickColor(r.css), theme: pickTheme(r.html, r.css) }
}

// compat: só a cor (usado em testes/legado)
export async function extractBrandColor(url) {
  return (await extractBrandStyle(url)).color
}

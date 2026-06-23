// Scrape do site do cliente → markdown/texto limpo pra alimentar o prompt.
// Primário: Jina Reader (renderiza SPA). Fallback: fetch + Readability/jsdom.
// Server-side apenas. Conteúdo é tratado como DADO não-confiável a jusante.

const MAX = 50000

const normalize = (u) => (/^https?:\/\//i.test(u) ? u : `https://${u}`)

export async function scrapeSite(url) {
  const target = normalize(url)
  try {
    const headers = { Accept: 'text/markdown' }
    if (process.env.JINA_API_KEY) headers.Authorization = `Bearer ${process.env.JINA_API_KEY}`
    const r = await fetch(`https://r.jina.ai/${target}`, { headers })
    if (r.ok) {
      const md = (await r.text()).trim()
      if (md.length > 50) return md.slice(0, MAX)
    }
  } catch { /* cai no fallback */ }
  return await fallback(target)
}

async function fallback(target) {
  try {
    const r = await fetch(target, { headers: { 'User-Agent': 'Mozilla/5.0 SFOS-bot' } })
    const html = await r.text()
    const { JSDOM } = await import('jsdom')
    const { Readability } = await import('@mozilla/readability')
    const dom = new JSDOM(html, { url: target }) // script-exec/remote OFF (default)
    const art = new Readability(dom.window.document).parse()
    const text = (art?.textContent || dom.window.document.body?.textContent || '').replace(/\s+/g, ' ').trim()
    return text.slice(0, MAX)
  } catch { return '' }
}

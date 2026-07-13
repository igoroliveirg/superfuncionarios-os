import OpenAI from 'openai'

const MODEL = 'gpt-image-2'

// formato do criativo → tamanho suportado pelo gpt-image-2
export function sizeFor(format) {
  if (format === 'story') return '1024x1536' // retrato ~9:16
  return '1024x1024'                          // feed / post / default
}

// Prompt do criativo: visual PURO do negócio do cliente, sem texto nos pixels.
// Ancorado em nicho + oferta + cor da marca. Regra herdada do generate.mjs:
// nunca falar de "Super Funcionários"; o material é do cliente.
export function buildImagePrompt({ niche, empresa, oferta, brandColor, hook, format }) {
  const shape = format === 'story' ? 'story vertical 9:16' : 'post quadrado 1:1'
  const cor = brandColor ? `Paleta puxando a cor da marca ${brandColor}.` : ''
  return [
    `Imagem publicitária premium para ${empresa}, do segmento de ${niche}.`,
    `Oferta em destaque: ${oferta}.`,
    hook ? `Clima/conceito: ${hook}.` : '',
    `Formato ${shape}. Fotografia/render de alta qualidade, iluminação de estúdio, composição limpa com espaço negativo.`,
    'SEM TEXTO, sem letras, sem logotipo, sem legenda dentro da imagem. Apenas o visual.',
    cor,
  ].filter(Boolean).join(' ')
}

// contador de sessão do processo (cap de custo por execução do servidor)
let _count = 0
const CAP = Number(process.env.SFOS_IMAGE_CAP || 40)

export async function generateImage({ niche, empresa, oferta, brandColor, hook, format = 'feed', quality = 'medium', refImages = null }) {
  if (!process.env.OPENAI_API_KEY) return null
  if (_count >= CAP) { console.warn(`[image] cap de ${CAP} imagens atingido; pulando`); return null }
  const prompt = buildImagePrompt({ niche, empresa, oferta, brandColor, hook, format })
  const size = sizeFor(format)
  try {
    const client = new OpenAI()
    _count += 1
    const res = refImages && refImages.length
      ? await client.images.edit({ model: MODEL, image: refImages, prompt, size, quality, n: 1 })
      : await client.images.generate({ model: MODEL, prompt, size, quality, n: 1 })
    const b64 = res?.data?.[0]?.b64_json
    if (!b64) return null
    return { b64, format, alt: `Criativo de ${empresa}: ${oferta}` }
  } catch (e) {
    console.warn('[image] falhou:', e?.message || e)
    return null
  }
}

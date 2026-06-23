# Super Funcionários OS — Demo real via Banco de Nichos

**Data:** 2026-06-23
**Status:** aprovado (design) — pronto para plano de implementação
**Autor:** Igor + Claude

## 1. Objetivo

Transformar o `superfuncionarios-os` (hoje 100% estático) numa **demonstração comercial real**: o vendedor cola o site do cliente na primeira tela, a IA **identifica o nicho** e a demo é exibida já adaptada — nome da empresa, oferta e cor da marca do cliente — seguindo um fluxo pré-definido por nicho.

Princípios travados com o Igor:
- **Bulletproof no palco** > geração 100% ao vivo. Conteúdo curado por nicho, não alucina.
- **Output instantâneo.** A única chamada de IA é a identificação do nicho (no onboarding); o conteúdo das 5 janelas é pré-escrito + hidratado, sem espera.
- **Mínima personalização real:** empresa, oferta, cor da marca. O resto vem do pacote do nicho.
- **Semente do produto:** handlers no formato de função Vercel desde já; persistência fica para depois.
- **Meta/GA/CRM e métricas do Analista continuam mockup crível** (fora de escopo agora).

## 2. Estado atual (resumo)

- React 18.3.1 + Vite 5.4.11, sem backend, sem `.env`, zero chamadas a LLM.
- 5 agentes (`pesquisa`, `copywriter`, `construtor`, `conteudo`, `metricas`) com **todo o conteúdo hardcoded** como `const`s locais dentro de cada componente em `src/employees.jsx`.
- `SCRIPTS` (`employees.jsx`) = `greeting` + `turns:[{chip,reply}]` por agente; a seção `i` do output aparece quando `step > i`.
- Onboarding em `App.jsx`: `Shell` controla `phase` (`boot→connect→site→analyze→desktop`) e `site` (string). `SiteScreen` captura a URL → `AnalyzeScreen` roda animação fake de 5 passos (~3,75s) → `desktop`.
- `site` é passado adiante mas **só exibido** (chrome do navegador, cabeçalhos). Nunca é buscado/analisado.

## 3. Arquitetura: Banco de Nichos + Hidratação

```
Onboarding (SiteScreen) → POST /api/identify { url }
   └─ servidor: scrape (Jina Reader, fallback local) → Claude Haiku
        → { niche, empresa, oferta, primaryColor, confidence }
   └─ AnalyzeScreen mostra a animação que já existe enquanto a chamada roda
Shell guarda { niche, vars } → resolvePack(niche, vars) → pack hidratado
   └─ Desktop → Window → EmployeeContent(pack) → 5 janelas instantâneas
```

Uma chamada de IA por demo (identificação). Todo o resto é dado local.

### 3.1 Modelo de dados

Um **pacote-base** com tokens + **overrides por nicho** (mínimos) + **variáveis do cliente** injetadas na hidratação.

```js
// src/niches/base.js — todo o conteúdo atual de employees.jsx, com tokens {empresa}/{oferta}
export const BASE_PACK = {
  pesquisa:   { persona, dores, medos, desejos, objecoes, schwartzLevel, fontes },
  copywriter: { headlineBefore, headlineAfter, lead, bullets, cta, angles, perguntas, funil },
  metricas:   { FUNNEL, STAGE_COST, TREND, CHANNELS, CREATIVES, PAGE, PAGE_SECTIONS, CONTENT, FINAL },
  construtor: { blocos, ticker, depoimentos, countdown, hero:{badge,pre,h1,sub,cta}, includes, offer },
  conteudo:   { pilares, ganchos, posts, legenda, tags, reels, igUser },
  scripts:    { /* greeting + turns por agente, com tokens */ },
}

// src/niches/<nicho>.js — SÓ os campos que mudam para o nicho (override raso)
export const CLINICAS = {
  label: 'Clínicas & estética',
  accentDefault: '#ff6f91',
  pesquisa:   { persona: {…}, dores: […], desejos: […] },
  copywriter: { headlineAfter: '…', angles: […] },
  construtor: { hero: { h1: '…' }, offer: {…} },
  conteudo:   { pilares: […], tags: […] },
}

// src/niches/index.js
export const NICHES = { generico, infoprodutos, clinicas, ecommerce, servicos, agencias }
export function resolvePack(nicheId, vars) {
  const merged = deepMerge(BASE_PACK, NICHES[nicheId] ?? {})   // override raso por agente
  return interpolate(merged, vars)                              // {empresa}/{oferta}/{cor}
}
```

**Regra:** um nicho é um override pequeno (~40–80 linhas), não um pacote de 600 linhas. "Alterar o mínimo" = trocar persona, 2–3 dores/desejos, headline/ângulos, hero da landing, pilares e hashtags. O resto herda do base.

### 3.2 Variáveis do cliente (extraídas ao vivo)

```
vars = { empresa, oferta, primaryColor, segmento }
```

- `empresa` → cabeçalhos, chrome da URL, handle do feed, copy.
- `oferta` → copy e oferta da landing.
- `primaryColor` → **só a landing do Construtor** (a página do cliente) e acentos pontuais. **A identidade neon dos 5 agentes do OS fica fixa.**
- Interpolação por token simples (`{empresa}`) em strings; cor por prop.

## 4. API — `POST /api/identify`

Lógica única e agnóstica de framework, reusada por dev e produção:
- `server/identify.mjs` — handler central: recebe `url`, faz scrape + chamada Claude, retorna o objeto.
- `vite.config.js` (plugin `configureServer`) — middleware dev que serve `/api/identify` em `npm run dev` (porta 5180, mesmo origin, sem 2º processo).
- `api/identify.js` — função serverless Vercel que importa o mesmo handler (semente do produto).

**Request:** `{ url: string }`
**Response:** `{ niche: string, empresa: string, oferta: string, primaryColor: string, segmento: string, confidence: number }`

**Chamada Claude:** modelo `claude-haiku-4-5` (rápido/barato), `thinking` desligado, `max_tokens` pequeno, saída JSON validada contra schema. System prompt fixa a autoridade; o conteúdo do site entra como **DATA não-confiável** entre delimitadores (mitiga prompt injection). Lista de nichos válidos passada no prompt; fora da lista → `generico`.

### 4.1 Ingestão de site

- **Primária:** Jina Reader — `GET https://r.jina.ai/<url>` (renderiza SPA, devolve markdown limpo). Chave opcional em header, server-side.
- **Fallback:** `fetch(url)` + `@mozilla/readability` + `jsdom` (script-exec e remote-fetch OFF). Sanitizar com DOMPurify.
- Cortar para ~30–50k chars (título, meta, H1/H2, hero/sobre/serviços/preços). Converter para markdown.

## 5. Wiring do frontend (mudanças mínimas na UI)

- `Shell` (App.jsx): novo estado `niche` e `vars`. `SiteScreen.onAnalyze(url)` dispara `POST /api/identify`; `AnalyzeScreen` roda a animação atual como cobertura; ao retornar, grava `{niche, vars}` e vai para `desktop`. Erro/timeout → `generico` (ou override manual).
- `resolvePack(niche, vars)` resolvido uma vez e passado via prop/context: `Desktop → Window → EmployeeContent`.
- `employees.jsx`: cada componente de agente passa a **ler de `pack`** em vez de `const`s locais. JSX, animações e `step`-gating ficam idênticos — muda só a fonte do dado. `SCRIPTS` vira `pack.scripts`.
- Sem rotas novas; sem mudança visual estrutural.

## 6. Nichos v1

`generico` (fallback) + 5:
1. **infoprodutos** — mentorias, cursos, educação online.
2. **clinicas** — odonto, estética, harmonização, derma, saúde.
3. **ecommerce** — loja virtual / D2C.
4. **servicos** — advocacia, contabilidade, arquitetura (serviço profissional local).
5. **agencias** — agências e consultorias B2B.

Cada override define: persona do cliente do nicho, 2–3 dores/desejos, headline + ângulos de copy, hero/oferta da landing, pilares e hashtags de conteúdo, `accentDefault`. Métricas herdam números do base (continuam mockup).

## 7. Resiliência de demo

- **Override manual de nicho:** hash `#niche=clinicas` ou seletor discreto na `SiteScreen` para o vendedor cravar o nicho no palco.
- **Cache:** memoizar resultado por URL; pré-cachear 1–2 URLs conhecidas.
- **Timeout → genérico:** se a identificação passar do tempo da animação ou falhar, cai para `generico` sem travar.
- Chave nunca no browser; nunca em var `VITE_*`.

## 8. Fora de escopo (agora)

- OAuth real Meta/GA/CRM e métricas ao vivo do Analista → seguem **mockup crível** (os `ConnectCard`/`setTimeout` permanecem).
- Persistência/banco, multi-tenant, login, billing.
- Publicação real da landing do Construtor.
- Geração ao vivo de copy/conteúdo (substituída pelo banco de nichos).

## 9. Modelos Claude

- Identificação de nicho: `claude-haiku-4-5` (rápido, barato, JSON estruturado). Sem sufixo de data no id.

## 10. Estrutura de arquivos (nova/alterada)

```
.env / .env.example            # ANTHROPIC_API_KEY, JINA_API_KEY (server-side)
vite.config.js                 # + plugin de middleware /api/identify (dev)
api/identify.js                # função serverless Vercel (prod)
server/identify.mjs            # handler central (scrape + Claude)
server/scrape.mjs              # Jina + fallback Readability/jsdom
src/niches/base.js             # BASE_PACK (conteúdo atual tokenizado)
src/niches/<nicho>.js          # overrides por nicho (6 arquivos)
src/niches/index.js            # NICHES + resolvePack + deepMerge + interpolate
src/employees.jsx              # agentes lendo de `pack` (refactor de dados)
src/App.jsx                    # Shell: estado niche/vars + chamada /api/identify
```

## 11. Verificação

- `npm run build` passa; `npm run dev` sobe UI + `/api/identify` na 5180.
- `/api/identify` responde JSON válido para URLs reais dos 5 nichos (classificação correta) e cai para `generico` em URL ambígua/erro.
- Chave **não** aparece no bundle do cliente (`grep` no `dist`); `.env` ignorado pelo git.
- Cada nicho renderiza as 5 janelas com empresa/oferta/cor injetados, sem regressão visual nem de animação.
- Fluxo de palco: colar URL → animação → desktop adaptado, < tempo da animação no caminho feliz.

## 12. Riscos

- **Prompt injection** do site do cliente → conteúdo como DATA delimitada, autoridade no system prompt, jsdom travado.
- **Site JS-pesado/Wi-Fi ruim** → Jina primário, timeout→genérico, URLs pré-cacheadas.
- **Vazamento de chave** → só `process.env` no servidor; nunca `VITE_*`; `.env` no `.gitignore`.
- **Deriva demo↔produto** → handlers já no formato Vercel; cards estruturados (gráficos/persona) herdam do base para manter coerência.
```

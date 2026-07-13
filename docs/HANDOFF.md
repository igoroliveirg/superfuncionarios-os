# Handoff — Super Funcionários OS (demo comercial real)

**Estado:** funcional, no ar local, sincronizado com o GitHub.
**Repo:** `github.com/igoroliveirg/superfuncionarios-os` (privado) · branch `main` · último commit `27b9794`.
**Local:** `/Users/igor/superfuncionarios-os` · `npm run dev` → `http://localhost:5180`.
**Stack:** React 18 + Vite 5 · backend = middleware no Vite dev (`/api/identify`) + função Vercel (`api/identify.js`).
**Testes:** 40 (vitest) · `npm run test`. **Build:** `npm run build`.

## O que é
O OS deixou de ser estático e virou **demo comercial real**: o vendedor cola a URL do cliente na 1ª tela; a IA identifica o **nicho**, extrai **nome da empresa, oferta, cor da marca e tema (claro/escuro)** do site; as 5 janelas aparecem na hora com conteúdo do nicho hidratado. Tudo automático.

## Fluxo (ponta a ponta)
1. **Onboarding** (`src/App.jsx` → `Shell`): `boot → connect → site → analyze → desktop`.
2. `SiteScreen` envia a URL → `POST /api/identify`.
3. **`server/identify.mjs`** roda em **paralelo** (latência ~2-3s warm):
   - `scrapeSite` (`server/scrape.mjs`): Jina Reader + fallback Readability/jsdom → texto p/ o classificador.
   - `renderStyle` (`server/render.mjs`): chromium headless lê a **cor do botão/CTA** (estilo computado) + **tema do fundo do body**. Fonte primária de cor/tema.
   - `extractBrandStyle` (`server/brandcolor.mjs`): heurístico HTML/CSS (`theme-color`, cor dominante, bg do body). **Fallback** quando o site não carrega.
   - Haiku (`claude-haiku-4-5`) classifica nicho + extrai empresa/oferta (tool forçada).
   - Retorna `{ niche, empresa, oferta, primaryColor, theme, ... }`. Cor do render preferida; heurístico complementa.
4. **`finalize`** (App.jsx): aguarda até 15s, aplica overrides de palco (ver abaixo), grava `niche` + `vars`.
5. **`resolvePack(niche, vars)`** (`src/niches/index.js`): `deepMerge(BASE_PACK, override do nicho)` + `interpolate` dos tokens `{empresa}`/`{oferta}`/`{cor}`/`{theme}`.
6. As 5 janelas leem do `pack`. A landing do **Construtor** é tematizada por `safeAccent(cor||accentDefault)` e fica clara/escura via classe `.lp.is-light`.

## Nichos (dados, não código)
Registrados: `generico, infoprodutos, clinicas, ecommerce, servicos, agencias, app, imobiliaria`.
- `src/niches/base.js` = **BASE_PACK** (todo o conteúdo SF; é o genérico).
- Cada nicho = override **pequeno** em `src/niches/<nicho>.js` (persona, copy, landing, conteúdo). Só sobrescreve o que difere; o resto herda do base.
- **Adicionar um nicho** (≈110 linhas de copy + 4 de fiação): criar `src/niches/<x>.js` → `+1 import`/`+1 linha` em `index.js` → `+1 id`/`+1 hint` em `server/niches.shared.mjs`. O teste `resolve` cobre sozinho. Copy deve passar pela skill `/human` (concreta, sem travessão).

## Cor + tema (identidade visual)
- `renderStyle` é primário: lê a cor real do botão (`pickBrand`, **filtra o verde do WhatsApp** `#25d366`/`#4dc247`/`#34af23`) + tema do `body` (`themeFromBg`). Browser **único reusado** + `prewarm()` no boot do dev (1ª análise não sofre cold start).
- `safeAccent` (`src/niches/color.js`) normaliza a cor pro tema escuro/claro (cinza/branco/preto → null → cai no `accentDefault` do nicho).
- A cor vira CSS vars `--lp-accent`/`--lp-accent-2`/`--lp-grad` na landing. Tema claro = bloco `.lp.is-light` no `styles.css`.

## Overrides de palco (emergência, via hash da URL)
Pra sites que a auto-detecção não pega (raros, blindados):
`localhost:5180/#niche=imobiliaria&theme=light&color=0d9488` — força nicho, tema e cor manualmente. O **padrão é 100% automático**; isso é só rede de segurança.

## Testar rápido (auto, sem override)
- `todoist.com` → app · vermelho `#e34432` · claro
- `linear.app` → app · roxo `#5e6ad2` · **escuro** (detecta o site dark)
- `cyrela.com.br` → imobiliária · nome "Cyrela" injetado

## Limitações conhecidas / gotchas
- **Sites blindados (ex.: `zuppy.com.br`):** recusam `fetch`, Jina, chromium headless E Chrome real (anti-bot). Cor/tema **não saem por nenhuma ferramenta** — caem no default do nicho. Limite técnico real da web; usar overrides de palco.
- **Vercel:** o `renderStyle` (Playwright) não roda em produção serverless → cai no heurístico. App deploya; render é local-first.
- **`ANTHROPIC_API_KEY`** está no `.env` (gitignored). Foi colada no chat nesta sessão → considerar **rotacionar**. `JINA_API_KEY` vazio (modo keyless do Jina). Custo por demo: ~1 chamada Haiku (centavos).
- **iFood e delivery** classificam como `app` (discutível). Nuance do classificador, não bug.
- Aviso "something prevents Vite server from exiting" no vitest é cosmético (40 testes passam).
- O render por **print de página** foi testado e **revertido** (pegava cor de imagem). O atual lê **estilo computado do botão** — não voltar pro print.

## Docs do design
- Spec: `docs/superpowers/specs/2026-06-23-banco-de-nichos-design.md`
- Plano: `docs/superpowers/plans/2026-06-23-banco-de-nichos.md`

## Próximos passos possíveis (não feitos)
- Mais nichos (restaurante, academia, automotivo, beleza...).
- Outputs estruturados reais (persona/gráficos/calendário via JSON do Claude) — hoje ilustrativos.
- Integrações reais Meta/GA/CRM (hoje mockup crível, proposital).
- Persistência (Supabase) se virar produto, não só ferramenta de sala.
- Conectar o repo na Vercel p/ deploy automático.

## Chat ao vivo + imagem real (jul/2026)

Duas camadas novas por cima da demo, ambas **aditivas e com queda suave** (sem chave, sem rede ou com `#noimg` cai no criativo CSS de hoje; a demo nunca trava):

- **Imagem real nos criativos e posts.** Os criativos do Construtor (story 9:16 + feed 1:1) e o post herói do Criador viram imagem gerada de verdade pelo `gpt-image-2` (OpenAI), ancorada em nicho + oferta + cor da marca. Imagem **pura, sem texto nos pixels**; a copy fica em legenda. Pré-geradas no "Analisando" (3 imagens: feed, story, post) e sobrepostas no pack sem tocar nos arrays.
- **Modo Conversa.** Toggle **Demo / Conversa** no header do chat, nos 5 funcionários. Em Conversa você digita e fala de verdade com o funcionário (Claude **Sonnet**, `claude-sonnet-5`). Construtor e Criador têm a ferramenta `gerar_imagem`: peça um criativo e ele gera na hora (balão de imagem com "gerado agora").

**Backend novo:** `server/image.mjs` (gpt-image-2) e `server/chat.mjs` (loop do Claude + tool), expostos por `/api/image` e `/api/chat` (middleware do Vite + funções Vercel `api/image.js`/`api/chat.js`). São relays puros, rodam no serverless da Vercel.

**Chave:** `OPENAI_API_KEY` no `.env` (server-side, sem `VITE_`). Reusa `ANTHROPIC_API_KEY` no chat.

**Overrides de palco:** `#noimg` desliga toda geração de imagem; `#hq` sobe a qualidade pra `high` (padrão `medium`, ~3 centavos/imagem). Cap de imagens por sessão em `server/image.mjs` (`SFOS_IMAGE_CAP`, default 40).

**Custo/latência:** `medium` na demo (~3 centavos, mais rápido). Sem streaming: o loop de ferramenta roda inteiro no servidor e a UI simula digitação com o `<Typewriter>`.

**Testes:** +12 (image + chat), suíte em 78 no total. `npm run test` verde, `npm run build` limpo.

**Spec/plano:** `docs/superpowers/specs/2026-07-13-chat-ao-vivo-e-imagem-real-design.md` e `docs/superpowers/plans/2026-07-13-chat-ao-vivo-e-imagem-real.md`.

## Ajustes v2 (jul/2026, tarde)

Seis mudanças pedidas pelo Igor, todas verificadas rodando:

1. **Anúncio com texto POR CIMA da imagem** (nunca imagem pura). A foto do `gpt-image-2` vira fundo com scrim; a copy fica sobreposta. Vale nos criativos do Construtor e no balão do chat (a tool `gerar_imagem` agora exige `headline`).
2. **Construtor virou "Construtor de Anúncios":** removidos o vídeo e a página de venda. Só os criativos. `pack.construtor` mantém os dados antigos (resolve.test usa `hero`); código morto do page-builder (`VideoArtifact` etc.) ficou sem uso, dá pra limpar.
3. **Abre direto no 1º agente (Pesquisa)**, não no hub. Fechar a janela revela o hub.
4. **Configurações + criar agente** (engrenagem no chrome): escolhe 1 de 5 fotos pré-definidas (`public/avatars/a1..a5.png`, robôs no estilo da casa), nomeia, descreve o papel. O agente entra no launcher e abre conversável na hora (Claude Sonnet, descrição = system prompt). Só na sessão (sem persistência).
5. **Conversa vira visual no painel central.** Tool `mostrar_no_painel` (persona / lista / barras / tabela / kpis) em todos os agentes: a IA escolhe o formato e o resultado renderiza na tela central (não só texto no chat). `ChatPanel` passou a receber `mode`/`live` do pai (Window/CustomAgentWindow); `LivePanels` renderiza os specs.
6. **Tudo ancorado no site** segue como alicerce (imagem, chat, agentes recebem nicho/empresa/oferta/cor).

Testes: 80 no total. Novas fotos em `public/avatars/`. Overrides de palco: `#noimg`, `#hq` (imagem); `#niche`, `#theme`, `#color` (identidade).

# Plano de Implementação — Super Funcionários OS v2

**Artefatos ricos + esteira + contador de economia**, portados da spec `gdia-landing-page-v2` (PR #89, `public/os-spec/real/`) para a nossa versão de produção em React.

## Contexto

A spec do PR #89 é um **mockup estático** (HTML/CSS/JS, exemplo fixo "Clínica Vértice", sem personalização). Ela não roda em produção, mas mostra um OS muito mais **rico em artefatos e narrativa** do que o nosso.

Nossa produção (`superfuncionarios-os`) já está **à frente na personalização** (o `server/generate.mjs` lê qualquer site) e **já tem a mecânica base** que a spec usa: janela macOS com rail de chat + canvas, onde o artefato é revelado por `step` (o índice do turn da conversa). Ou seja, o "motor de produção" da spec (clicar → produzir → revelar) já existe aqui como "avançar a conversa → revelar seção".

**Objetivo:** trazer a riqueza de artefato e a narrativa da spec para os componentes React, **alimentados pela personalização que já temos**. Combinar as duas forças.

## Como o prod funciona hoje (reaproveitar, não reescrever)

- `src/employees.jsx:9` — `EMPLOYEES`: metadados dos 5 agentes (id, name, role, code, cor).
- `src/employees.jsx:1116` — `EmployeeContent` despacha para `Pesquisador`, `Redator`, `Analista`, `Construtor`, `CriadorDeConteudo`.
- Cada componente lê `pack.<seção>` e **revela conteúdo por `step`** (ex.: Construtor `showHero = step > 1`). O `step` avança quando o usuário clica nos chips do chat.
- `src/App.jsx:314` — `Window`: chat (`useAgentChat(pack.scripts[emp.id])`) + `EmployeeContent step={chat.step}`.
- `src/App.jsx:653` — `Desktop`: janelas + dock dos 5 + botão Apresentar.
- `src/App.jsx` — `pack = mergePack(resolvePack(niche, vars), gen)`; `gen` vem de `/api/generate`.
- `src/styles.css` — folha única.

**Regra de ouro para cada item novo:** o dado entra (1) no `BASE_PACK` (`src/niches/base.js`) como molde/fallback **e** (2) no schema da seção em `server/generate.mjs` para personalizar. O render lê `pack.<...>` com gate por `step`. Nunca quebrar o fallback (o `mergePack` herda do molde quando a IA omite).

---

## Onda 1 — O Construtor ampliado + Contador de economia + Esteira

Maior impacto. Entrega o "uau" da spec.

### 1A · Renomear o agente 3 → "O Construtor"
- `src/employees.jsx:30-32` — `name: 'O Construtor'`, `code: 'AG.CONSTRUTOR'`, `role: 'Criativos (design e vídeo) e páginas no ar'`.
- `src/employees.jsx:695` — `<h2>` "Construtor de páginas" → "O Construtor".
- `src/niches/base.js:139` (comentário) e `scripts.construtor.greeting` → falar de **criativos (design e vídeo) e páginas** (texto da spec, `3-construtor-criativos.html:99`).
- Conferir `src/presentation.jsx` (usa `SCRIPTS`/EMPLOYEES) para o nome não destoar.

### 1B · Dados: `designs` + `video` no pack
- `src/niches/base.js` → `construtor`: acrescentar
  - `designs`: `{ brand, hook, sub, cta, variacoes: ['A','B','C'], formatos: ['story 9:16','feed 1:1'] }`
  - `video`: `{ modulos: [{nm:'Avatar', by:'HeyGen'},{nm:'Voz', by:'ElevenLabs'},{nm:'Legenda palavra a palavra', by:'auto-sync'},{nm:'Corte story/feed', by:'ffmpeg'}], timeline:['hook','corpo','cta'], duracao:'22s', captionWords: [...], formatos:['story','feed'] }`
  - manter `page` (hero/offer/etc. já existem).
- `server/generate.mjs` → `SECTIONS.construtor`: adicionar `designs` e `video`. O `hook`/`sub`/`cta` saem da copy do site; `captionWords` = `hook.split(' ')` (derivar no `normalize()`, não pedir à IA). Personalizado por cliente.
- **Escopo honesto:** a spec cita pipeline real (Playwright + ElevenLabs + HeyGen + ffmpeg). Aqui v2 = **artefato visual fiel** renderizado a partir da copy (igual à spec, que também é mockup). Pipeline de render real = projeto à parte (ver "Fora de escopo").

### 1C · Render: blocos Designs + Vídeo no `Construtor`
- `src/employees.jsx` (componente `Construtor`, ~660-930): adicionar dois blocos antes da página:
  - **Designs:** criativo story 9:16 + feed 1:1 (brand, hook, sub, CTA) + variações A/B/C + "Exportar PNG (4 formatos)".
  - **Vídeo:** player (avatar, **legenda palavra-a-palavra animada**, timeline hook/corpo/cta, toggle story/feed, "Exportar MP4") + lista "Como foi montado" (HeyGen/ElevenLabs/ffmpeg).
- CSS: portar de `3-construtor-criativos.html` (`<style>` linhas 8-87) para `src/styles.css`. Já é tema claro e bate com o nosso design system.
- Gate por `step`: Designs `step>0`, Vídeo `step>1`, Página desloca para `step>2+`. Atualizar `scripts.construtor.turns` (Designs → Vídeo → Página → publicar) em `base.js` e no schema de `generate.mjs` (já dobramos script por seção).

### 1D · Contador de economia persistente
- Novo `src/savings.jsx`: porta a lógica de `os.js` (linhas 4-18).
  - `localStorage 'sf-os-savings'`, base `{ money: 47000, hours: 320 }`; `people(h) = max(1, round(h/176*3.3))`; BRL `Intl.NumberFormat`.
  - `addSavings(money, hours)` + hook `useSavings()` (estado + persist).
  - Componente `<SavingsBar equivalencia="..." />`.
- Render no rodapé de cada painel em `EmployeeContent` (e/ou no chrome do `Desktop`). A cada conclusão de step, chamar `addSavings(...)` com valores por agente (campos `data-money`/`data-hours` da spec viram constantes por agente em `EMPLOYEES` ou no pack).
- Texto de equivalência por agente (pesquisa: "uma pesquisa de agência: R$8.000 e 2 semanas"; construtor: "designer + editor + dev: 3 contratações"; analista: "+R$62k/mês que vazavam").

### 1E · Esteira (handoff explícito)
- Ao fim de cada artefato, afixar "**Enviar pro próximo (<próximo agente>) →**". O clique abre a janela do próximo agente (o `Desktop`/`Window` já têm `onOpen`). Ordem = `EMPLOYEES`.
- Narrativa "não são 5 chats, é uma esteira" no `Desktop`/dashboard (texto da spec `index.html:151`).

### Testes Onda 1
- `test/util.test.js` / novo `test/generate.test.js`: `construtor` agora traz `designs`+`video`; `mergePack` continua herdando molde quando omitido.
- Novo `test/savings.test.js`: `add` / `people` / formatação / persistência (mock `localStorage`).

---

## Onda 2 — Motor de produção visível + Analista que fecha o ciclo

### 2A · Motor de produção visível
- Hoje o artefato aparece ao avançar o step. Adicionar uma micro-animação por artefato: **barra de progresso + log de passos nomeando ferramentas** ("avatar HeyGen | voz ElevenLabs | legenda | corte ffmpeg") antes de revelar a seção.
- Implementar como wrapper `ProduceStage` (porta `produce()` de `os.js:20-33`) ou estender `src/chat.jsx`. Os passos vêm de um campo `steps` por turn do script (já temos script por seção em `generate.mjs`).

### 2B · Analista que fecha o ciclo
- `src/niches/base.js` `metricas` + `generate.mjs`: adicionar
  - `leak`: `{ stage, lostPerMonth, reason, expectedPct, actualPct }`
  - `action`: `{ items: [{ who: 'Rotina'|'Copywriter'|'Pesquisador', text }] }`
- Render (`Analista`, `src/employees.jsx`): etapa do funil que vaza **destacada em vermelho** (classe `.leak`), caixa "**−R$X/mês**", ação **atribuída a outros agentes**, botão "**Disparar correção**" → reinicia a esteira (reabre/realça os agentes citados). Porta CSS de `5-analista.html:8-31`.

### Testes Onda 2
- `generate`/`util`: `metricas.leak` e `action` presentes/herdados.
- Render: etapa leak recebe classe vermelha; botão dispara estado "esteira reiniciada".

---

## Onda 3 — Pesquisador (ângulos rankeados) + entrada/dashboard

### 3A · Ângulos rankeados no Pesquisador
- `base.js` `pesquisa` + `generate.mjs`: `angulos: [{ rank, nome, score, why }]` (4).
- Render (`Pesquisador`): lista ordenada por `score` com barra (`.meter`) + "Enviar pro Copywriter →". Porta CSS `1-pesquisador.html:34-40`.

### 3B · Conectar contas de IA + dashboard radial (opcional, maior esforço)
- `src/App.jsx` onboarding: tela "**Conecte suas contas de IA (OpenAI/Claude)**" (só UI; "sua conta, seus créditos") entre connect e site. Porta `index.html:94-103`.
- Dashboard em **hub radial** (5 avatares ao redor de um centro) como visão alternativa do desktop. Porta `index.html:13-27,130-160`. Maior esforço visual; avaliar valor vs. o desktop atual.

---

## Fora de escopo (decisões)

- **Pipeline real de design/vídeo** (Playwright/HeyGen/ElevenLabs/ffmpeg): a spec só renderiza mockup; mantemos mockup fiel agora. Render real = projeto separado (infra, custo, chaves de API). **Sinalizar ao time.**
- **Dados "Clínica Vértice"** da spec: ignorar — usamos a personalização do `generate.mjs`.
- **Tema:** a spec é tema claro; o prod já segue claro/escuro do site do cliente. Manter o nosso.

## Ordem e esforço

| Item | Arquivos | Esforço | Impacto |
|---|---|---|---|
| 1A rename | employees.jsx, base.js | XS | médio |
| 1B dados designs/vídeo | base.js, generate.mjs | M | alto |
| 1C render designs/vídeo | employees.jsx, styles.css | L | alto |
| 1D contador | savings.jsx, employees.jsx | M | alto |
| 1E esteira | App.jsx, employees.jsx | M | alto |
| 2A motor visível | chat.jsx, employees.jsx | M | médio |
| 2B analista leak | base.js, generate.mjs, employees.jsx | M | alto |
| 3A ângulos | base.js, generate.mjs, employees.jsx | S | médio |
| 3B conectar IA + radial | App.jsx, styles.css | L | médio |

## Verificação end-to-end

1. `npm run build` + `npm test` (suíte + novos testes verdes).
2. `npm run dev` → analisar `nubank.com.br`:
   - Construtor entrega **Designs + Vídeo + Página** personalizados; contador sobe a cada artefato; "Enviar pro próximo" abre o agente seguinte; Analista mostra **vazamento em vermelho** + "Disparar correção".
3. Deploy de **preview** na Vercel (`vercel deploy`, sem `--prod`) para validar com o time antes de promover a produção.

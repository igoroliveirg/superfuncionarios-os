# Plano: 10x da experiência visual dos outputs (demo sobre Zoom)

Data: 2026-06-23. Alvo: Super Funcionários OS. Origem: grill-me + painel de design de 3 propostas com crítica adversária de Zoom (workflow `wf_8f3bff3c-1f0`).

## Decisões travadas (entrada)

1. **Canal:** demo conduzida por vendedor sobre Zoom/screen-share comprimido. O codec (H.264 baseline) come gradiente fino, blur, micro-movimento e `requestAnimationFrame` a 60fps. Ele encoda limpo: bloco de cor chapada, troca de estado discreta, frame estático.
2. **Foco:** os 5 outputs dos funcionários. São a prova de que o produto faz trabalho real.
3. **Alavanca:** o artefato se constrói ao vivo. O ato de criar é o wow.
4. **Metáfora:** blueprint preenche. O artefato surge como esqueleto e renderiza no real brandado. Unificada nos 5. Materialização/blur proibida.

## Veredito do painel

Base: a proposta do `BuildBlock` único (4 estados, fila sequencial real, números quantizados). Foi a mais cirúrgica e a única que ataca a raiz do problema do Zoom. Três enxertos:

1. Da proposta de engenharia: gatilho de performance via **toggle manual "Modo demo"**, não auto-detecção. O vendedor liga antes de compartilhar.
2. Da proposta de vitrine: a grade do Instagram enche em **3 ondas de 3 tiles** (não 9 tiles a 400ms = 3,6s), com "preencher tudo" no clique.
3. Conserto que nenhuma das 3 tratou certo: a linha de tendência do Analista **não tem** `vector-effect:non-scaling-stroke` (verificado). Sem isso o traço-on treme em fullscreen.

## A tese técnica (por que isto é 10x sobre Zoom)

Hoje a demo tem o pior perfil possível pro canal: 24 `backdrop-filter` (blur até 60px), 19 animações `infinite`, typewriter char-a-char, `CountUp` por rAF a 60fps, partículas. Sobre Zoom isso vira mingau e derruba o framerate de quem compartilha. O prospect vê o "build" pular em saltos estáticos e perde o gradual.

O plano troca a gramática inteira de movimento por uma que o codec encoda limpo, e transforma cada `hold` em frame de bitrate quase zero que o vendedor narra por cima.

## A primitiva: `<BuildBlock>`

Vive em `src/chat.jsx`, ao lado de `Section`. Substitui o trio atual (`Section` + `.reveal`/`.building` + `Typewriter`/`CountUp` ad-hoc) e vira a linguagem única dos 5.

Máquina de 4 estados por bloco (`useReducer`): `idle → skeleton → fill → locked`.

- **skeleton:** esqueleto wireframe em 1 cor sólida (`--bb-bone` = `#e7e7ec`, sem gradiente). Silhueta da persona, retângulos de barra vazios, número como `--`, imagem como caixa cinza com selo do nicho. Entra com `opacity` 0 para 1 em 280ms. Sem translate de sub-pixel.
- **fill:** o esqueleto é preenchido de uma vez por tipo. Texto de linha inteira (`.bb-ink-on`, troca `bone → ink` em 360ms, nunca char-a-char). Barras por custom prop. Número por `<Tally>`.
- **locked:** borda 2px sólida da cor do cliente entra (`.is-locked`, sem glow pulsante). O bloco congela. Nenhuma turn futura re-anima.

Sub-componentes (mesma primitiva, garantem consistência):

- `<BB.Line>` texto/headline brandado, reveal de linha inteira.
- `<BB.Bars rows snap>` barras com snap-lock.
- `<BB.Tally to>` número quantizado.
- `<BB.Image src fallbackNiche>` troca placeholder por artefato brandado.
- `<BB.Grid tiles cadence waves>` popula tile a tile, em ondas.

Todos leem `--bb-accent`/`--bb-ink`/`--bb-bone` do contexto. A cor do cliente entra em 1 frame nos 5, sem cada funcionário reimplementar. A curva é sempre a mesma (`--e-quart`), sempre `opacity`/`transform`/custom-prop. É isso que faz os 5 parecerem 1 produto. `Section` continua só como gate de step (`show={step>i}`); `BuildBlock` cuida do COMO o conteúdo nasce.

## A gramática nova (substituições de movimento)

| Hoje (morre no Zoom) | Vira | Por quê |
|---|---|---|
| Typewriter char-a-char | `BB.Line` (linha inteira, 360ms) | caret pisca em stutter; linha inteira é 1 transição limpa |
| `CountUp` rAF 60fps | `<Tally>`: `setInterval` 110ms, 5 ticks (0/40/70/90/100%) e crava o final | a 8fps o rAF estica e borra; 5 frames discretos sobrevivem, e o valor final é cravado mesmo se um tick cair |
| barras `scaleX .building` | `BB.Bars` snap-lock: cresce a 80% (380ms), hold 180ms, **trava** | scaleX estica sub-pixel em fullscreen; o lock dá o "peso" |
| `freshPulse` glow opacity (chat L877) | **borda 2px sólida** na cor da marca (`.is-locked`) | glow de opacity some sob bitrate baixo; borda sólida não |
| auto-scroll rAF em loop (chat L295-305, App L332) | 1 `scrollTo` no `STREAM_DONE` | paint contínuo compete com o vsync do encoder nos holds |
| trend-line `stroke-dasharray:2000` (Analista) | traço-on quantizado (5 passos) + `vector-effect:non-scaling-stroke` + `stroke-width≥3px` | **não existe hoje**; sem isso o tracejado vira shimmer serrilhado em fullscreen |

Nota: o `fill` é discreto, não contínuo. Onde o painel propôs `width`/flash de brightness, trocar por reveal de linha inteira + a borda `is-locked` como marca de conclusão. Some o reflow por frame e o flash sub-frame (que a 8fps vira 1 frame branco feio).

## Contrato de performance ("Modo demo")

- **Toggle manual `.zoom-mode`** no menubar, ancorado no `presenting` (hash + gesto) que já existe em `App.jsx:735` e na slide-control de `presentation.jsx:536`. Gatilho primário. Nunca depender de `getDisplayMedia` (não é observável). O vendedor liga antes de compartilhar.
- Em `.zoom-mode` (estender o fallback que já existe em `styles.css:812-816`):
  - matar os 19 `infinite`: `auroraDrift`(351), `satFloat`(749), `particleFloat`(189), `ringSpin`(97), `stageBreathe`(76), `corePulse`(707), `workPulse`(964), `eeSpin`(969), `dotPulse`(923), `twBlink`(861), `depthDrift`(171), `pubPulse`(1630/1954) e os demais, via `animation:none !important`.
  - matar `backdrop-filter` na janela ativa: estender o `.window.genie-anim{backdrop-filter:none}`(776) para `.zoom-mode .window, .zoom-mode .titlebar, .zoom-mode .chat-panel`. Fundo vira opaco (`#f9f9fb`) com gradiente estático.
  - parar o specular rAF do cursor (`--px`/`--py`).
  - `will-change` só no bloco em `fill` (a fila adiciona e remove). Cuidar pra não deixar camada órfã.
- Budget por beat: no máximo **1** `BuildBlock` em `fill`, **0** blur, **0** `infinite`. Resultado: H.264 baseline segura 30fps no encode, e os holds viram frame estático.

## Ritmo (1 foco por beat)

Fila sequencial via contexto `BuildSequence` (não stagger paralelo `var(--sd)`/`--bd`/`--d`). Cada `<BuildBlock beat={n}>` só inicia o `fill` quando o anterior travou.

Timeline por beat (~1,4s, dentro do range 1,2-1,8s travado): skeleton 280ms, fill 360-560ms por tipo, hold 600ms (o vendedor narra), lock 200ms, libera o próximo. `prefers-reduced-motion` e `.zoom-mode` pulam skeleton/fill e vão direto pro `locked` se preciso priorizar framerate.

## Legibilidade (sobreviver à compressão)

1. Números a 1,4x: `KPI-big`, `insight-v`, `angle-score`, `pillar-share`, `obj-pct` ganham `font-size: max(atual*1.4, 1.6rem)`.
2. Nada crítico sub-1rem: subir `cal-time`, `ig-time`, `fn-l`, `reel-time`, `src-name` (hoje ~12px) pro mínimo 16px.
3. Contraste: texto/label/número que usa `accent` (neon claro) sobre branco passa pra `ink` (variante escura, já AA). Neon fica só em glow/borda/dot.
4. Em `BB.Bars`, barra preenchida = cor sólida + borda 1px `ink`, nunca `box-shadow` blur (que o codec come).

## Mudança por funcionário

- **Criador de Conteúdo (vitrine):** grade IG vira `<BB.Grid>` em 3 ondas de 3 tiles (cadence ~600ms/onda), "preencher tudo" no clique. `FeedPreview` troca o hardcoded `/deck/post-spacex.webp`(L918) por `<BB.Image src={pack.conteudo.feedThumb} fallbackNiche>`. `pillar-fill`/`hook-ret-fill` viram `BB.Bars` snap. `CountUp`(L954-985) vira `Tally`, começa só depois da barra travar. Legenda(L1076) vira `BB.Line` parágrafo a parágrafo. `cal-thumb` gradiente fino vira cor sólida do cliente.
- **Construtor:** landing vira sequência hero(beat0), prova(beat1), oferta(beat2), publish(beat3), cada um skeleton/fill/lock. Hero deixa o Typewriter e vira `BB.Line`. Viewport escuro `#0e0a18` vira gradiente estático da `brandColor` (`safeAccent` já resolve em L681-684). Feed usa `BB.Image`. Após publish, `.is-locked` congela o preview (badge "no ar" estático).
- **Analista (logo atrás da vitrine):** as 9 seções gated ficam. SVG trend-line vira traço-on quantizado (5 passos) + o conserto `non-scaling-stroke`. Funil/canais viram `BB.Bars` snap sem `box-shadow` glow. KPI/ROI `CountUp` vira `Tally`. Tabela de criativos vira `BB.Grid` de thumbs brandados. `is-fresh` glow vira borda `is-locked`.
- **Pesquisador:** `persona.nome` Typewriter(L153) vira `BB.Line`. `persona-av` gradiente vira cor sólida do cliente. `src-fill`/`obj-fill`/`sw-soph` viram `BB.Bars` snap (hoje scaleX inline + `box-shadow` glow em L194, que borra). `CountUp`(12480, scores, pct) vira `Tally`. Cards Dores/Medos/Desejos revelam linha inteira por beat, sem stagger `--od`/`--td` paralelo.
- **Redator:** `headlineAfter` Typewriter em 2 lugares(L258,265) vira 1 `BB.Line`. `angle-fill`/`fn-fill` `.building` scaleX vira `BB.Bars` snap. `angle-score` `CountUp` vira `Tally`. Ad-doc fundo branco genérico vira mockup com `brandColor` (`themed.accent` já existe). Bullets stagger `--bd` viram reveal de linha por beat.

## Faseamento

- **Fase 0 (primitiva + canal):** `<BuildBlock>` + sub-componentes em `chat.jsx`; o toggle `.zoom-mode` + kill-switch de performance; o conserto `non-scaling-stroke` na trend-line. Nada visual muda pros 5 ainda.
- **Fase 1 (vitrine):** aplicar só no Criador de Conteúdo (grade IG em ondas). **Validar no Zoom real com o Modo demo ligado** antes de seguir.
- **Fase 2:** Construtor e Analista.
- **Fase 3:** Pesquisador e Redator.

Justificativa: `employees.jsx` ~50KB e `styles.css` ~136KB. Refatorar os 5 de uma vez é risco alto de regressão no modo Apresentação. As 3 propostas convergiram nesse faseamento.

## Verificação (como saber que deu 10x)

- Capturar o build sob captura throttled (CPU 4x slowdown + cap 24fps no Playwright/DevTools) ou gravação de tela real de uma call de teste.
- Checklist objetivo: lê nítido a 720p/24fps; framerate estável durante o build (sem queda no encode); 1 foco animando por beat; nenhum texto crítico sub-1rem; cada hold vira frame estático; o `Tally` conta sem borrar; a trend-line não treme em fullscreen.
- Não-regressão: `npm run test` (40) e `npm run build` passam; modo Apresentação intacto com o toggle desligado.

## Riscos e modos de falha (projetado contra)

- **Toggle esquecido:** se o vendedor compartilha sem ligar o Modo demo, os infinite e o blur voltam. Mitigar: deixar o toggle muito visível e, em Apresentação, ligar `.zoom-mode` por padrão.
- **Tally a fps muito baixo:** a 5-8fps reais, os 5 ticks podem virar 2-3 frames. O valor final é cravado, então nunca para errado; o pior caso é "pular" em vez de contar. Aceitável e melhor que o rAF borrado.
- **Camada `will-change` órfã:** a fila precisa remover `will-change` no `lock`. Sem isso, camada viva = repaint que derruba fps.
- **Tile lento na vitrine:** resolvido com 3 ondas + "preencher tudo" no clique, pro vendedor nunca narrar sobre esqueleto.
- **Algum `infinite` escapar do kill-switch:** o hold deixa de ser estático. A lista de linhas acima tem que ser exaustiva; verificar com `grep infinite` dentro do escopo da janela ativa.

## O que NÃO fazer

- Materialização/blur como linguagem de build.
- Manter typewriter, partículas ou specular ligados no Modo demo.
- Refatorar os 5 outputs de uma vez.
- Depender de auto-detecção de screen-share (`getDisplayMedia`).
- Marcar conclusão por flash de brightness (sub-frame). Usar a borda `is-locked`.

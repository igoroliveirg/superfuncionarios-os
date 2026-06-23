# Super Funcionários OS

Mockup de frontend do "sistema operacional" dos 5 super funcionários — pra tangibilizar a entrega pro empresário.

## Rodar

```bash
cd ~/superfuncionarios-os
npm install
npm run dev
```

Abre em `http://localhost:5180`.

## Fluxo

1. **Conectar IA** — conecta OpenAI e Claude via OAuth (modelo Hermes / Open Design): roda na assinatura do próprio empresário.
2. **Site da empresa** — digita a URL; o app "lê" o site.
3. **Análise** — animação de treino dos funcionários.
4. **Área de trabalho** — desktop estilo macOS: dock com os 5 robôs, janelas arrastáveis com a interface personalizada de cada um.

## Os 5 funcionários (cor neon de assinatura)

| Robô | Cor | Interface |
|---|---|---|
| O Pesquisador | rosa | Pesquisa de mercado (dores/medos/desejos + frases reais) |
| O Redator que Filtra | roxo | Editor de copy (antes/depois, variações, perguntas do form) |
| O Analista de Verba | ciano | Painel de métricas (custo por contato/reunião/venda, gráfico, tabela) |
| O Construtor de Páginas | laranja | Builder com preview ao vivo da landing |
| O Social Media | verde | Calendário de conteúdo (7 posts agendados) |

Conteúdo demo populado com a própria Imersão Super Funcionários.

## Stack

React + Vite. Imagens dos robôs em `public/agentes/` (vindas de `~/Desktop/robos-gdia`).
Só frontend — sem backend, dados mockados em `src/employees.jsx`.

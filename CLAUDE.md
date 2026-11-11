# Site de conteúdo — Skyfit Santa Isabel

Site estático (sem build) com o plano mensal dos criadores da Skyfit Santa Isabel: o Reels de cada um, a data, os Stories, o cupom e um checklist. Feito para celular primeiro. Segue o padrão do site da AMK Design (`Downloads/AMK SITE`).

- No ar: https://skyfit-santaisabel.vercel.app (Vercel publica sozinha a cada push em `main`)
- Repositório: https://github.com/lkswp/skyfit-santaisabel
- Painel do gestor: `/painel` (senha na variável `PAINEL_SENHA` da Vercel)

## Onde fica cada coisa
- `data/plano.js` — **tudo o que muda de um mês para o outro**: oferta, combinado, semanas de Stories e, por criador, data do Reels, cupom, leitura do perfil, roteiro e ideias de Stories. O site e o painel leem daqui.
- `index.html`, `assets/css/site.css`, `assets/js/app.js` — a página. GSAP, ScrollTrigger e Lenis ficam em `assets/vendor/`.
- `painel.html` — painel do gestor.
- `api/checklist.js`, `api/painel.js`, `api/_lib.js` — funções da Vercel; gravam o checklist no Postgres (Neon), tabela `checklist_mes` com chave (mês, criador, tarefa).

## Virar o mês
1. Pesquisar o Instagram de cada criador (posts recentes, o que engajou) e o perfil `@skyfitsantaisabel` para confirmar a oferta do mês.
2. Reescrever `data/plano.js`: `mes` (ex. `2026-12`), `mesNome`, `mesIndex`, `oferta`, `semanas` e cada pessoa. O checklist começa zerado porque a chave inclui o mês.
3. Criador novo: acrescentar o `slug` em `SLUGS` de `api/_lib.js`.
4. Título e descrição do `index.html`, se citarem o mês.
5. Mostrar ao Lucas antes do push: o site no ar é o que os criadores abrem.

## Direção visual (manter)
- Preto, osso e o vermelho da Skyfit (`#E3141C`) só como sinal: preço, data, botão principal, foco.
- Uma família só: Archivo variável; o eixo de largura (`wdth`) faz o papel de display.
- Um momento orquestrado na abertura (em novembro: o preço caindo até 9,90). Agenda horizontal presa ao scroll em tela grande, lista vertical no celular.
- Evitar: bullets, blocos de três cards, rótulos em caixa alta sobre títulos, gradientes coloridos, imagem gerada por IA, seta em botão.
- Textos diretos, em português do Brasil, falando com o criador.

## Regras de conteúdo combinadas com o Lucas
- Foco em matrícula: todo conteúdo termina com o cupom e uma chamada clara.
- Um Reels por criador, cada um em uma data diferente. Stories podem coincidir.
- Não prometer preço, horário ou resultado que a academia não confirmou; conferir a regra da oferta no perfil oficial.
- Nada de política.
- As animações rodam mesmo com "reduzir movimento" ligado (pedido do cliente). `?motion=off` desliga para teste.

## Testar
Abrir `index.html` por um servidor local. Sem as funções da Vercel o checklist salva só no aparelho (cai no `localStorage`).

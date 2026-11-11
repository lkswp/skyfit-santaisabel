/* Skyfit Santa Isabel — plano de conteúdo do mês.
   Tudo o que aparece no site e no painel sai daqui. Para virar o mês, troque este arquivo. */

window.SKY_PLANO = {
  mes: "2026-11",            // chave do checklist no banco (cada mês começa zerado)
  mesNome: "Novembro",
  ano: 2026,
  mesIndex: 10,              // 0 = janeiro
  instagram: "skyfitsantaisabel",

  oferta: {
    nome: "Black Sky",
    preco: "9,90",
    frase: "Primeiro mês por R$ 9,90",
    fim: "2026-11-30T23:59:59-03:00",
    fimTexto: "30/11",
    regras: [
      ["Preço", "R$ 9,90 no primeiro mês"],
      ["Plano", "Recorrente, exclusivo da unidade"],
      ["Fidelidade", "3 meses"],
      ["Depois", "Segue a mensalidade normal do plano"],
      ["Inclui", "Musculação ilimitada, avaliação física, treino personalizado e aulas coletivas"],
      ["Validade", "Até 30 de novembro"],
      ["Como entrar", "Na recepção ou pelo direct da @skyfitsantaisabel"]
    ],
    cuidado: "Fale sempre “primeiro mês por R$ 9,90”. Nunca “R$ 9,90 por mês”: quem entender errado vai reclamar na recepção."
  },

  manifesto: "Dois vídeos anunciam a Black Sky. Os outros três mostram o que nenhum preço mostra: como é treinar aqui. É a soma dos cinco que traz aluno novo.",

  combinado: [
    ["O objetivo é matrícula", "Todo conteúdo termina dizendo o que a pessoa faz agora: usar o seu cupom, chamar no direct ou passar na recepção."],
    ["Um Reels por pessoa, cada um num dia", "Ninguém posta no dia do outro. Assim a Skyfit tem vídeo novo circulando o mês inteiro."],
    ["Stories toda semana", "No mínimo duas sequências por semana, sempre com o cupom falado e escrito na tela."],
    ["A oferta entra nos Stories de todos", "No Reels, só o Alan e o Caio anunciam a Black Sky. Nos Stories, todo mundo pode e deve falar dela."],
    ["Regra da oferta sempre completa", "Primeiro mês por R$ 9,90, plano recorrente, fidelidade de 3 meses, vale até 30/11."],
    ["Aprovação antes de postar", "Mande o Reels até um dia antes da sua data. Marque @skyfitsantaisabel e, se der, poste em collab."]
  ],

  semanas: [
    ["Semana 1", "12 a 15/11"],
    ["Semana 2", "16 a 22/11"],
    ["Semana 3", "23 a 30/11"]
  ],

  pessoas: [
    {
      slug: "alan-news",
      nome: "Alan Fernandes",
      curto: "Alan",
      arroba: "alannews",
      seguidores: "22,1 mil",
      cupom: "ALAN10",
      dia: 16, semana: "segunda",
      black: true,
      nicho: "Notícia local de Santa Isabel com humor, cerca de 3 milhões de visualizações por mês.",
      leitura: [
        "Você já está fazendo Black Friday no formato de notícia para outros anunciantes este mês (autoescolas, LuxFibra). O público aceita oferta quando ela chega como plantão.",
        "O perfil cresceu para 22,1 mil seguidores e segue sendo o de maior alcance dentro de Santa Isabel.",
        "Por isso você abre o mês: é quem consegue fazer a cidade inteira saber da Black Sky em um dia."
      ],
      tom: "Repórter da cidade, com a vinheta e o bordão de sempre. A oferta é a notícia.",
      reels: {
        titulo: "Plantão: mensalidade de R$ 9,90 é flagrada em Santa Isabel",
        formato: "Paródia de plantão, 30 a 45 segundos",
        tela: "URGENTE: preço suspeito é flagrado em academia de Santa Isabel",
        venda: "Transforma a oferta em notícia da cidade e já explica a regra inteira no vídeo, para ninguém chegar na recepção achando outra coisa.",
        gancho: "Sirene, texto vermelho na tela: “URGENTE: preço suspeito é flagrado em academia de Santa Isabel”.",
        cenas: [
          ["A denúncia", "Você na fachada, de microfone, sério: “Faaaaala minha rapaziada… a redação recebeu uma denúncia. Tem academia cobrando R$ 9,90 no primeiro mês.”"],
          ["A investigação", "Entra e “interroga” a recepção: “Confere essa informação?”. A recepcionista confirma e explica: plano recorrente, fidelidade de 3 meses, depois segue a mensalidade normal."],
          ["A perícia", "Passa pela estrutura apontando como perito: musculação, aula coletiva, avaliação física. “Tudo incluso. A reportagem conferiu.”"],
          ["O prazo", "Fecha na câmera: “O caso prescreve dia 30 de novembro. Quem quiser se entregar, é na recepção ou no direct. Fala que veio pelo {CUPOM}.”"]
        ],
        onde: "Fachada, recepção, salão de musculação e sala de aulas coletivas.",
        chamada: "“Marca aqui quem está devendo uma matrícula” e o cupom {CUPOM}.",
        legenda: "🚨 PLANTÃO ALAN NEWS: primeiro mês por R$ 9,90 na @skyfitsantaisabel. É plano recorrente, com fidelidade de 3 meses, e depois segue a mensalidade normal. Vale até 30/11. Passa na recepção ou chama no direct e fala que veio pelo {CUPOM}. Marca quem está devendo uma matrícula 👇",
        dica: "Use a mesma vinheta dos seus plantões de verdade. A regra completa precisa aparecer falada e escrita: é o que evita reclamação depois."
      },
      stories: [
        ["Boletim da Black Sky", "Toda semana, em tom de notícia: quantos dias faltam para a oferta acabar.", "“Atualização do plantão: faltam X dias. Primeiro mês por R$ 9,90. Cupom {CUPOM}.”"],
        ["Repórter treinando", "Você treinando de verdade, do jeito que der, com narração de jornal.", "“O repórter foi a campo. Se eu consigo, você consegue. {CUPOM}.”"],
        ["Pergunta do povo", "Caixinha: “O que te impede de começar?”. Responda duas ou três gravando na academia.", "“Dúvida respondida. Agora é com você: {CUPOM}.”"],
        ["Entrevista relâmpago", "Uma pergunta para um aluno: “Há quanto tempo treina e o que mudou?”.", "“Ouviu o morador? Primeiro mês por R$ 9,90 até dia 30. {CUPOM}.”"],
        ["Última chamada", "Nos últimos três dias do mês, plantão de encerramento.", "“Últimas horas da Black Sky. Depois não adianta ligar pra redação. {CUPOM}.”"]
      ]
    },
    {
      slug: "gisele-grenza",
      nome: "Gisele Grenza",
      curto: "Gisele",
      arroba: "giselegrenza",
      seguidores: "78,1 mil",
      cupom: "GISELE10",
      dia: 19, semana: "quinta",
      black: false,
      nicho: "Beleza com propósito, fé, emagrecimento e rotina. Dona da Grenza Cosmetics.",
      leitura: [
        "O vídeo da sua primeira aula de Jump (“não consegui acompanhar todos os passos, o importante é começar”) trouxe 18 comentários. Quando você mostra que também erra, as seguidoras respondem.",
        "O post sobre chegar ao peso ideal e agora manter teve 234 curtidas e 56 comentários. Sua história já passou da fase do “antes e depois” e virou rotina, o que convence mais.",
        "Seu público é de mulheres que querem começar e têm vergonha. Você é a prova de que dá para entrar sem saber nada."
      ],
      tom: "Acolhedor e bem-humorado. Você ri de si mesma e chama as seguidoras para errar junto.",
      reels: {
        titulo: "Testei tudo o que eu tinha vergonha de fazer na academia",
        formato: "Desafio em três tentativas, 40 a 60 segundos",
        tela: "Tudo o que eu tinha vergonha de fazer na academia (testei)",
        venda: "A maior trava de quem não treina é a vergonha de errar na frente dos outros. Você erra na frente de 78 mil pessoas, ri, e mostra que tem professor do lado.",
        gancho: "Você na porta de uma sala de aula coletiva, falando baixo: “Hoje eu vou fazer tudo o que eu tinha vergonha de fazer aqui.”",
        cenas: [
          ["A confissão", "Texto na tela com as três vergonhas: aula de Jump, um aparelho que você nunca usou e treinar na área de peso livre."],
          ["O Jump", "Você errando os passos, rindo, a turma seguindo normal. Texto: “ninguém parou para me olhar”."],
          ["O aparelho", "O professor ajusta o aparelho e te ensina o movimento. Você acerta na terceira tentativa e comemora."],
          ["O convite", "Na câmera: “Ninguém aqui começou sabendo. Vem errar comigo. Usa o {CUPOM}.”"]
        ],
        onde: "Sala de aulas coletivas, salão de musculação com um professor e área de peso livre.",
        chamada: "“Comenta qual era a sua vergonha” e o cupom {CUPOM}.",
        legenda: "Eu tinha vergonha de tudo isso. Testei e descobri que ninguém estava olhando 😅 O importante é começar, do seu jeito e no seu tempo. Me conta nos comentários qual é a sua vergonha e vem começar comigo na @skyfitsantaisabel com o cupom {CUPOM} 🤍",
        dica: "Não regrave para ficar bonito. O erro é o que faz a seguidora pensar “se ela pode, eu também posso”."
      },
      stories: [
        ["Aula nova da semana", "Cada semana, teste uma aula coletiva diferente e conte como foi.", "“Fiz, errei, amei. As aulas estão no plano. Cupom {CUPOM}.”"],
        ["Black Sky para as amigas", "Fala direta: o primeiro mês está por R$ 9,90 e é a hora de trazer aquela amiga.", "“Primeiro mês por R$ 9,90 até dia 30. Marca a amiga e usem o {CUPOM}.”"],
        ["Rotina de manutenção", "Como você treina agora que chegou ao peso ideal.", "“Chegar foi uma fase. Manter é rotina. Vem criar a sua: {CUPOM}.”"],
        ["Caixinha da vergonha", "“Qual é a sua vergonha na academia?” Responda com carinho, gravando lá.", "“Agora você já sabe que não é só você. {CUPOM}.”"],
        ["Versículo e treino", "Você treinando com um versículo na tela.", "“Cuidar do corpo também é gratidão. Te espero lá: {CUPOM}.”"]
      ]
    },
    {
      slug: "paola-igarasi",
      nome: "Paola Igarasi",
      curto: "Paola",
      arroba: "paolaigarasi",
      seguidores: "16,4 mil",
      cupom: "PAOLA10",
      dia: 22, semana: "domingo",
      black: false,
      nicho: "Nanopigmentação, sobrancelhas, maquiagem e lifestyle.",
      leitura: [
        "Você acabou de postar o “Manual de sobrevivência ao El Niño”. É um formato seu, novo, e combina com o que mais funciona no perfil: humor de situação.",
        "Os posts do casamento da Larissa passaram de 440 curtidas. Seu público gosta de te ver com as amigas.",
        "Você também está com a sua Black Beauty no ar, então o Reels da Skyfit não fala de preço: fala do primeiro dia de academia, que é onde a maioria trava."
      ],
      tom: "Amiga engraçada que já passou por isso e te entrega o mapa.",
      reels: {
        titulo: "Manual de sobrevivência do primeiro dia de academia",
        formato: "Regras em cartela, no formato do seu manual, 30 a 45 segundos",
        tela: "MANUAL DE SOBREVIVÊNCIA: primeiro dia de academia",
        venda: "O medo do primeiro dia segura mais gente do que o preço. O manual desmonta esse medo, regra por regra, com humor.",
        gancho: "Cartela na tela, igual à do seu manual do El Niño: “MANUAL DE SOBREVIVÊNCIA: primeiro dia de academia”.",
        cenas: [
          ["Regra 1", "“Ninguém está olhando para você.” Corta para todo mundo olhando o próprio celular ou o espelho."],
          ["Regra 2", "“Você não precisa saber o nome de nenhum aparelho.” Você aponta para um aparelho, faz cara de dúvida, e o professor aparece e resolve."],
          ["Regra 3", "“Leva uma amiga. E água, porque esse calor não perdoa.” Você e a amiga chegando juntas, garrafinha na mão."],
          ["Regra 4", "“O segundo dia é mais fácil que o primeiro. Mas só existe segundo dia se tiver primeiro.” Na câmera: “Usa o {CUPOM} e vem.”"]
        ],
        onde: "Salão de musculação, um aparelho com professor e a entrada da academia com a amiga.",
        chamada: "“Manda para a amiga que vive dizendo que vai começar” e o cupom {CUPOM}.",
        legenda: "MANUAL DE SOBREVIVÊNCIA: primeiro dia de academia 🔥 Salva para não esquecer e manda para a amiga que vive dizendo que vai começar. Te espero na @skyfitsantaisabel com o cupom {CUPOM} 💪",
        dica: "Mantenha a mesma cartela e o mesmo ritmo do manual do El Niño. Quem viu o primeiro reconhece na hora e assiste até o fim."
      },
      stories: [
        ["Do estúdio para o treino", "Você saindo do estúdio e chegando na Skyfit.", "“Atendi o dia todo, agora é a minha vez. Vem também: {CUPOM}.”"],
        ["Black Sky em dupla", "Você e a amiga: o primeiro mês está por R$ 9,90, hora de começar juntas.", "“Primeiro mês por R$ 9,90 até dia 30. Chama a sua dupla. {CUPOM}.”"],
        ["Regra bônus do manual", "Uma regra nova por semana, no mesmo estilo do Reels.", "“Regra bônus: quem começa em novembro não promete nada em janeiro. {CUPOM}.”"],
        ["Enquete da desculpa", "“Qual é a sua desculpa?” com quatro opções. Responda a mais votada.", "“A mais votada foi essa. Olha como se resolve. {CUPOM}.”"],
        ["Treino no calor", "Pós-treino, suada, rindo do calor.", "“Sobrevivi ao El Niño e ao treino. Sua vez: {CUPOM}.”"]
      ]
    },
    {
      slug: "vitoria-duarte",
      nome: "Vitória Duarte",
      curto: "Vitória",
      arroba: "vitoriamoraisduarte",
      seguidores: "8,7 mil",
      cupom: "VITORIA10",
      cupomPendente: true,
      nova: true,
      dia: 25, semana: "quarta",
      black: false,
      nicho: "Estrategista de marketing para beleza, sócia do Estúdio V1. Mãe e empresária.",
      leitura: [
        "Seu vídeo do treino estilo Hyrox na Skyfit, montado pelo Eduardo, teve 114 curtidas e 21 comentários. É o seu conteúdo de treino que mais gerou conversa.",
        "No post sobre ser mãe e empresária você escreveu que achava que treinar era “luxo para quem tem tempo sobrando”. Essa frase é o melhor argumento de venda do mês.",
        "Seu público é de mulheres que empreendem e não têm agenda. Você fala a língua delas e já treina aqui, então nada precisa ser encenado."
      ],
      tom: "Direta e inspiradora, com a estética que o seu perfil já tem. Sem romantizar: é sobre dar conta.",
      reels: {
        titulo: "40 minutos: o treino de quem não tem tempo",
        formato: "Um dia corrido com cronômetro na tela, 40 a 60 segundos",
        tela: "Onde cabe um treino nessa agenda?",
        venda: "“Não tenho tempo” é a desculpa mais comum entre mulheres que trabalham e têm filhos. Você mostra, com relógio na tela, que o treino cabe em 40 minutos e ainda sustenta o resto do dia.",
        gancho: "Print da sua agenda lotada na tela. Texto: “Onde cabe um treino nessa agenda?”",
        cenas: [
          ["A agenda", "Cortes rápidos da manhã: filho, notebook, reunião, estúdio. Sem música calma: é correria mesmo."],
          ["O relógio", "Você entra na Skyfit e um cronômetro de 40:00 começa a correr no canto da tela."],
          ["O treino", "O treino estilo Hyrox com o Eduardo, cortado no ritmo do cronômetro: esteira, avanço, burpee, kettlebell."],
          ["A virada", "Cronômetro zera. Você de volta ao dia: “Não é luxo de quem tem tempo. É o que me sustenta para dar conta de tudo. Usa o {CUPOM}.”"]
        ],
        onde: "Sua rotina fora da academia (casa, estúdio) e o salão da Skyfit com o Eduardo.",
        chamada: "“Manda para a amiga que diz que não tem tempo” e o cupom {CUPOM}.",
        legenda: "Por muito tempo eu achei que treinar era luxo de quem tem tempo sobrando. Hoje são 40 minutos que sustentam todo o resto do meu dia. Manda para aquela amiga que diz que não tem tempo e vem treinar comigo na @skyfitsantaisabel com o cupom {CUPOM} 🔥",
        dica: "O cronômetro na tela é o que prova o argumento. Deixe ele visível do começo ao fim do treino."
      },
      stories: [
        ["Treino da semana", "Um bloco do treino com o Eduardo, com o tempo total na tela.", "“40 minutos e pronto. Cabe na sua agenda também. {CUPOM}.”"],
        ["Black Sky para quem empreende", "Fala de estrategista: o primeiro mês por R$ 9,90 é o menor risco possível para testar.", "“Primeiro mês por R$ 9,90 até dia 30. É o teste mais barato que existe. {CUPOM}.”"],
        ["Bastidor de mãe", "O que você faz para conseguir sair de casa e treinar.", "“Não é fácil, mas é possível. Te mostro como: {CUPOM}.”"],
        ["Caixinha da agenda", "“Qual é o seu maior obstáculo para treinar?” Responda como estrategista.", "“Problema de agenda se resolve com prioridade. Começa por aqui: {CUPOM}.”"],
        ["Antes da reunião", "Pós-treino, já arrumada para o trabalho.", "“Treino feito antes das 9. O dia rende outro tanto. {CUPOM}.”"]
      ]
    },
    {
      slug: "caio-tanaka",
      nome: "Caio Tanaka",
      curto: "Caio",
      arroba: "caio_tanaka5",
      seguidores: "4,3 mil",
      cupom: "TANAKA10",
      dia: 27, semana: "sexta",
      black: true,
      nicho: "Humor fit e paternidade. Pai do Takeshi e do Hiroshi.",
      leitura: [
        "Seus três vídeos fixados seguem sendo os de humor com referência de filme: Romanos (1.624 curtidas), Forrest Gump (970) e a história de amor na academia (628).",
        "Você já fez “Black Friday criminosa” para outra loja este mês. Para a Skyfit o personagem precisa ser outro, senão o público mistura as duas.",
        "Seu Reels cai na sexta-feira da Black Friday, a três dias do fim da oferta. É o vídeo da urgência."
      ],
      tom: "Comédia de cinema. A piada carrega a oferta e o prazo.",
      reels: {
        titulo: "Missão impossível: treinar por R$ 9,90",
        formato: "Sketch de espião, 30 a 45 segundos",
        tela: "Sua missão, caso aceite…",
        venda: "É o vídeo do prazo: sai na Black Friday, com a oferta acabando em três dias. A paródia de espião entrega preço, regra e data sem parecer anúncio.",
        gancho: "Seu celular toca no vestiário. Voz de agente secreto: “Sua missão, caso aceite…”",
        cenas: [
          ["A mensagem", "A voz continua: “…treinar pagando R$ 9,90 no primeiro mês. Esta oferta se autodestruirá em três dias.”"],
          ["A infiltração", "Você atravessando a academia como espião: rolando no chão, escondido atrás de aparelho, enquanto todo mundo treina normal e te ignora."],
          ["A senha", "Chega na recepção e sussurra: “{CUPOM}.” A recepcionista responde em voz normal: “É só fazer a matrícula, moço. Plano recorrente, fidelidade de 3 meses.”"],
          ["A autodestruição", "Na câmera, tirando os óculos escuros: “Missão cumprida. A sua acaba dia 30.”"]
        ],
        onde: "Vestiário, salão de musculação e recepção.",
        chamada: "“Marca o agente que vai aceitar a missão” e o cupom {CUPOM}.",
        legenda: "Sua missão, caso aceite: treinar na @skyfitsantaisabel pagando R$ 9,90 no primeiro mês 🕶️ Plano recorrente, fidelidade de 3 meses, depois segue a mensalidade normal. Esta oferta se autodestrói dia 30/11. Marca o agente que vai aceitar e usa o {CUPOM}.",
        dica: "Poste na sexta, dia 27, de manhã. Quanto mais gente treinando normal ao fundo, mais engraçado fica você rolando no chão."
      },
      stories: [
        ["Contagem do agente", "Todo dia da última semana: quantos dias faltam, em tom de missão.", "“Faltam X dias para a autodestruição. Primeiro mês por R$ 9,90. {CUPOM}.”"],
        ["Pai de dois, sem desculpa", "Você chegando com cara de sono. Texto: “dormi 3 horas e o treino está pago”.", "“Se eu arrumei tempo, você arruma. {CUPOM}.”"],
        ["Que tipo você é", "Continue a série do seu carrossel “qual dessas pessoas você é na academia”.", "“Descobre o seu tipo treinando. {CUPOM}.”"],
        ["Bastidor da missão", "Erros de gravação do Reels.", "“O filme estreia sexta. A oferta acaba dia 30. {CUPOM}.”"],
        ["Desculpa negada", "Leia uma desculpa de seguidor e desmonte com humor.", "“Desculpa negada. Te vejo lá: {CUPOM}.”"]
      ]
    }
  ]
};

# Skyfit Santa Isabel · Conteúdo de Outubro

Site com o plano de conteúdo dos criadores, o checklist salvo no banco de dados e o painel do gestor.

- `index.html` → o site (cada criador tem o próprio link: `/#alan-news`, `/#gisele-grenza`, `/#paola-igarasi`, `/#lucas-lemos`, `/#caio-tanaka`)
- `painel.html` → painel do gestor, em `/painel` (pede senha)
- `api/checklist.js` → salva e lê o checklist de cada criador
- `api/painel.js` → entrega o progresso de todos pro painel (só com a senha)

## Como subir (uns 10 minutos)

### 1. GitHub
1. Crie uma conta em github.com (se ainda não tiver).
2. Clique em **New repository**, dê o nome `skyfit-santaisabel` e deixe **Private**. Clique em **Create repository**.
3. Na tela seguinte, clique em **uploading an existing file**.
4. Arraste **todo o conteúdo desta pasta** (os arquivos e a pasta `api`) e clique em **Commit changes**.

### 2. Vercel
1. Entre em vercel.com com a conta do GitHub (**Continue with GitHub**).
2. Clique em **Add New → Project**, escolha o repositório `skyfit-santaisabel` e clique em **Deploy**. Não precisa mudar nenhuma configuração.

### 3. Banco de dados (Postgres da Vercel)
1. No projeto, vá em **Storage → Create Database → Neon (Postgres)** e siga com o plano grátis.
2. Na hora de conectar, marque o projeto `skyfit-santaisabel`. A Vercel cria a variável `DATABASE_URL` sozinha.
3. A tabela do checklist é criada automaticamente na primeira marcação.

### 4. Senha do painel
1. Em **Settings → Environment Variables**, crie `PAINEL_SENHA` com a senha que você quiser.
2. Vá em **Deployments**, clique nos três pontinhos do último deploy e em **Redeploy** (pra valer o banco e a senha).

### 5. Nome do link
Em **Settings → Domains**, troque o endereço pra algo como `skyfit-santaisabel.vercel.app`.

## Como usar
- Mande pra cada criador o link com o final dele, ex.: `https://skyfit-santaisabel.vercel.app/#caio-tanaka`
- Você acompanha tudo em `https://skyfit-santaisabel.vercel.app/painel`
- Pra atualizar o site, é só subir o `index.html` novo no GitHub (**Add file → Upload files**). A Vercel publica sozinha.

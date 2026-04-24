# 💜 Sistema de Divulgação e Calendário de Eventos - Meninas Digitais (UTFPR-CP)

Plataforma web desenvolvida para centralizar a divulgação do cronograma de atividades e eventos do projeto de extensão Meninas Digitais, atuando como um catálogo digital interativo com painel administrativo.

## 🛠 Tecnologias Utilizadas
- **Front-end:** React + Vite + TypeScript
- **Roteamento:** React Router DOM
- **Back-end/Banco de Dados:** Supabase (PostgreSQL + Auth)
- **Gerenciador de Pacotes:** npm (Node.js)

---

## 🚀 Como configurar o projeto na sua máquina

Siga o passo a passo abaixo para rodar o projeto localmente e deixar o seu ambiente idêntico ao do resto da equipe:

### 1. Pré-requisitos
Certifique-se de ter o **Node.js** instalado na sua máquina (estamos utilizando a versão **24.12.0** ou superior). Você pode baixar em [nodejs.org](https://nodejs.org/).

### 2. Clonando o repositório
Abra o seu terminal e rode os comandos:

```bash
git clone <LINK_DO_REPOSITORIO_AQUI>
cd meninas-digitais
```

### 3. Instalando as dependências
Não utilizamos `requirements.txt` no ecossistema Node. O arquivo `package.json` já gerencia isso automaticamente. Para instalar todas as bibliotecas padrão do projeto com as versões exatas, basta rodar:

```bash
npm install
```

### 4. Configurando as Variáveis de Ambiente (Supabase)
Por questões de segurança, as chaves do banco de dados não sobem para o GitHub. Você precisa criar o seu próprio arquivo local para conseguir se conectar.

1. Na raiz do projeto, crie um arquivo chamado `.env.local`.
2. Abra o arquivo `.env.example`, copie o conteúdo dele e cole dentro do `.env.local`.
3. Peça as chaves reais do projeto no nosso grupo e preencha as variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` (certifique-se de não deixar espaços em branco ou aspas).

### 5. Rodando o servidor local
Com tudo instalado e configurado, inicie o servidor de desenvolvimento:

```bash
npm run dev
```
O terminal exibirá um link (geralmente `http://localhost:5173`). Abra-o no seu navegador.

---

## 📂 Estrutura de Pastas Padrão

Para mantermos a organização do projeto, sempre crie seus arquivos nos locais corretos dentro da pasta `src/`:

- `components/`: Componentes reutilizáveis (botões, cards, modais genéricos).
- `pages/`: As páginas completas (Home, Calendário, Painel Admin).
- `services/`: Comunicação com APIs externas e com o banco Supabase.
- `types/`: Tipagens do TypeScript (como as interfaces das tabelas).
- `utils/`: Funções auxiliares puras (ex: formatador de data, validador de formulário).

---

## 🔀 Fluxo de Trabalho (Git Flow)

**⚠️ NUNCA trabalhe direto na branch `main`.** A branch `main` é sagrada e apenas para código 100% pronto e revisado.

1. Todo o nosso desenvolvimento se une na branch **`develop`**.
2. Quando for assumir uma nova tarefa (ex: criar a listagem de eventos), crie uma branch a partir da `develop`:

```bash
git checkout develop
git pull origin develop
git checkout -b feat/nome-da-sua-tarefa
```

3. Ao finalizar, faça o push da sua branch e abra um **Pull Request (PR)** no GitHub apontando para a branch `develop`. Peça para pelo menos um colega revisar antes de aprovar.
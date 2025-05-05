# Furia Hub

Furia Hub é um aplicativo web de chat em tempo real que utiliza IA para simular conversas entre fãs de e‑sports. Inspirado na paixão da comunidade, o projeto permite que usuários se conectem, conversem e interajam com um bot de IA chamado **Furia AI Fan**.

---

## 📌 Objetivo

* Criar uma experiência de chat em tempo real para fãs de e‑sports.
* Proporcionar conversas dinâmicas com um chatbot de IA (Furia AI Fan) capaz de responder mensagens e manter o fluxo de diálogo.
* Oferecer autenticação via email/OTP com Supabase.

---

## 🛠️ Funcionalidades

* **Autenticação**: Cadastro e login usando email e senha, com OTP via link mágico para verificação.
* **Recurso de Chat**: Comunicação em tempo real usando Supabase Realtime Channels.
* **Fluxo de Mensagens**: Exibição de histórico, rolagem automática e diferenciamento de mensagens do usuário, de outros usuários e do AI Fan.
* **Componentização**: Hooks customizados (`useChat`, `useChatScroll`), componentes de UI (`Navbar`, `ChatMessageItem`), e rotas protegidas.
* **Backend de IA**: Endpoint `/api/ai` implementado com [Groq SDK](https://www.npmjs.com/package/groq-sdk) usando o modelo `gemma2-9b-it`.

---

## 🧱 Tecnologias

* **Next.js 13 (App Router)**
* **Supabase** (Auth, Realtime)
* **TypeScript**
* **Tailwind CSS**
* **Lucide Icones**
* **Groq SDK**

---

## 🚀 Como Executar

### Pré-requisitos

* Node.js 18+ instalado
* Conta no Supabase e chave anon (env vars)
* Chave API da Groq (env var)

### Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz com:

```env
NEXT_PUBLIC_SUPABASE_URL=<sua_url_supabase>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<sua_anon_key>
NEXT_PUBLIC_GROQ_KEY=<sua_groq_api_key>
```

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/furia-hub.git
cd furia-hub

# Instale dependências
npm install
```

### Execução em Desenvolvimento

```bash
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000) no navegador.

### Build para Produção

```bash
npm run build
npm start
```

---

## 📂 Estrutura do Projeto

```
FURIA-HUB/
├── app/                       # App Router do Next.js
│   ├── api/
│   │   └── ai/               # Endpoint de chat com Groq SDK
│   ├── auth/
│   │   └── confirm/          # Rota de confirmação de OTP
│   ├── chat/                 # Página de chat (ChatPage)
│   ├── login/                # Página de login e ações
│   ├── register/             # Página de registro e ações
│   │   ├── actions.tsx
│   │   └── page.tsx
│   ├── favicon.ico           # Ícone da aplicação
│   ├── globals.css           # Estilos globais
│   ├── layout.tsx            # Layout raiz (RootLayout)
│   └── page.tsx              # Home Page (Home)
├── components/               # Componentes reutilizáveis
│   ├── chat/
│   │   ├── Chat.tsx          # Componente principal de chat
│   │   └── ChatMessageItem.tsx  # Item de mensagem individual
│   └── navbar/
│       └── Navbar.tsx        # Barra de navegação autenticada
├── hooks/                    # Hooks customizados
│   ├── useChat.ts            # Lógica de chat em tempo real
│   └── useChatScroll.ts      # Scroll automático do container de chat
├── public/                   # Arquivos estáticos (imagens, etc.)
├── types/                    # Tipagens TypeScript (ex: ChatMessage)
├── utils/                    # Utilitários e configuração do Supabase
│   └── supabase/
│       ├── client.ts         # Criação de cliente no browser
│       ├── middleware.ts     # Middleware de sessão Supabase
│       └── server.ts         # Criação de cliente no server (SSR)
├── components/               # Componentes da interface
├── hooks/                    # Hooks customizados
├── public/                   # Recursos públicos
├── types/                    # Definições de tipos
├── utils/                    # Utilitários do projeto
├── .gitignore                # Arquivos/diretórios ignorados pelo Git
├── eslint.config.mjs         # Configuração ESLint
├── middleware.ts             # Middleware do Next.js para rotas
├── next-env.d.ts             # Tipagem de ambiente Next.js
├── next.config.ts            # Configuração Next.js
├── package.json              # Dependências e scripts NPM
├── package-lock.json         # Versão exata das dependências
├── postcss.config.mjs        # Configuração do PostCSS/Tailwind
├── README.md                 # Documentação do projeto
└── tsconfig.json             # Configuração TypeScript
```

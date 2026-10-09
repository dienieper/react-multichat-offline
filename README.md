# Multi-chat Offline

Aplicação de chat com **múltiplas conversas** independentes. O usuário gerencia conversas por um sidebar, alterna entre elas e envia mensagens alternando entre dois remetentes: **usuário** (alinhado à direita) e **robô** (alinhado à esquerda). O histórico de conversas é persistido em `localStorage` — ao recarregar a página, as conversas e mensagens são restauradas.

## Funcionalidades

### Conversas

- **Múltiplas conversas isoladas** — cada conversa mantém seu próprio histórico de mensagens
- **Sidebar de navegação** — lista conversas, cria novas e exclui existentes
- **Seleção automática** — ao criar uma conversa, ela é ativada imediatamente
- **Estado inicial** — ao abrir o app, nenhuma conversa está selecionada até o usuário criar ou escolher uma
- **Persistência** — conversas e mensagens sobrevivem ao recarregar a página (`localStorage`, chave `chat-conversations`)

### Chat

- **Dois remetentes** — toggle no input alterna quem envia a próxima mensagem (padrão: usuário)
- **Input condicional** — desabilitado quando não há conversa ativa
- **Textarea dinâmico** — altura ajusta conforme o conteúdo (mín. 1 linha, máx. ~6 linhas)
- **Atalhos de teclado** — `Enter` envia; `Shift + Enter` insere quebra de linha
- **Estados vazios** — mensagens distintas para “sem conversa selecionada” e “conversa sem mensagens”
- **Auto-scroll** — rola automaticamente para a última mensagem ao enviar
- **Modo robô** — borda roxa no card de input quando o remetente ativo é o robô

### Layout

- **Sidebar responsivo** — fixo à esquerda no desktop; retrátil no mobile via botão hamburger e overlay
- **Área de chat centralizada** — container `max-w-2xl` em fundo marrom claro
- **Input fixo no rodapé** — card branco permanece visível durante o scroll do histórico

## Stack

| Tecnologia | Uso |
|---|---|
| [Vite](https://vite.dev/) | Build e dev server |
| [React 19](https://react.dev/) | UI |
| [TypeScript](https://www.typescriptlang.org/) | Tipagem estática |
| [Tailwind CSS 4](https://tailwindcss.com/) | Estilização |
| [Zustand](https://zustand.docs.pmnd.rs/) | Estado global e persistência |
| [Oxlint](https://oxc.rs/docs/guide/usage/linter) | Lint |

## Como executar

```bash
# Instalar dependências
npm install

# Servidor de desenvolvimento
npm run dev

# Build de produção
npm run build

# Preview do build
npm run preview

# Lint
npm run lint
```

## Uso

1. Clique em **Nova conversa** no sidebar para criar e selecionar uma conversa.
2. Digite uma mensagem no campo de texto na parte inferior da tela.
3. Use o toggle à esquerda para alternar entre **Usuário** e **Robô** antes de enviar.
4. Envie com `Enter` ou pelo botão à direita (desabilitado quando o campo está vazio ou não há conversa ativa).
5. Mensagens do usuário aparecem alinhadas à direita; mensagens do robô, à esquerda.
6. Selecione outra conversa no sidebar ou exclua uma pelo ícone de lixeira em cada item.
7. No mobile, use o botão de menu no topo para abrir e fechar o sidebar.

## Estrutura do projeto

```
src/
├── types/
│   ├── message.ts          # Sender, Message
│   └── conversation.ts     # Conversation
├── stores/
│   └── chatStore.ts        # Estado global (Zustand + persist)
├── components/
│   ├── Chat.tsx            # Layout: sidebar + área de mensagens
│   ├── Sidebar.tsx         # Lista de conversas e botão criar
│   ├── SidebarItem.tsx     # Item de conversa com exclusão
│   ├── MobileMenuButton.tsx
│   ├── MessageList.tsx     # Lista, estados vazios e auto-scroll
│   ├── MessageBubble.tsx   # Bolha individual
│   ├── ChatInput.tsx       # Card fixo: toggle + textarea + enviar
│   └── SenderToggle.tsx    # Alternância usuário/robô
├── App.tsx                 # Renderiza <Chat />
└── index.css               # Import do Tailwind
```

### Modelo de dados

```ts
type Sender = 'user' | 'robot'

type Message = {
  id: string
  text: string
  sender: Sender
}

type Conversation = {
  id: string
  messages: Message[]
}
```

O remetente ativo (`sender`) e a conversa selecionada (`activeConversationId`) ficam apenas em memória e não são persistidos.

## Fora de escopo

- Backend ou sincronização entre dispositivos
- Autenticação
- Edição ou exclusão de mensagens individuais
- Renomear conversas (identificação pelo ID)
- Horários, rótulos de remetente ou cabeçalho do chat
- Markdown, anexos ou formatação rica (apenas texto plano)
- Busca ou filtros de conversas
- Confirmação modal antes de excluir conversa

## Documentação

- Especificação do chat único (versão anterior): [.docs/prd.md](.docs/prd.md)
- Especificação do multi-chat: [.docs/features/multi-chat/prd.md](.docs/features/multi-chat/prd.md)

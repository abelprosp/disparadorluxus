# Sistema de Disparo WhatsApp

Sistema moderno para envio de mensagens WhatsApp em lote usando React + Vite no frontend, Express.js no backend e autenticação com Clerk.

## 🚀 Tecnologias

- **Frontend**: React 18 + Vite
- **Backend**: Node.js + Express
- **Autenticação**: Clerk
- **Deploy**: Fly.io

## 📋 Funcionalidades

- ✅ **Autenticação segura** com Clerk
- ✅ Upload de arquivos CSV
- ✅ Token e endpoint bloqueados
- ✅ Envio de mensagens de texto e imagem
- ✅ Logs em tempo real
- ✅ Estatísticas de envio
- ✅ Interface moderna e responsiva
- ✅ Deploy automático no Fly.io
- ✅ Proteção de rotas

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone <seu-repositorio>
cd sistemanovo
```

2. Instale as dependências:
```bash
npm install
```

3. **Clerk já configurado!** As chaves estão configuradas no projeto:
   - Publishable Key: `pk_test_aGVscGZ1bC1jYWxmLTg5LmNsZXJrLmFjY291bnRzLmRldiQ`
   - Secret Key: `sk_test_ZmAFlAp3QbsMZwH7k8i2ZZ4yU1GiiGsle3ec0OP22x`

### Desenvolvimento Local

#### Opção 1: Sistema Completo (Recomendado)
```bash
npm start
```
- Inicia frontend e backend automaticamente
- Libera porta 3000 se necessário
- Acesse: http://localhost:5173
- Faça login com Clerk

#### Opção 2: Desenvolvimento Separado
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
npm run dev
```

## 📦 Build para Produção

```bash
npm run build
```

## 🚀 Deploy no Fly.io

### Configuração Automática

O projeto está configurado para deploy automático no Fly.io:

1. **Instale o Fly CLI**:
   ```bash
   # Windows
   iwr https://fly.io/install.ps1 -useb | iex
   
   # macOS
   brew install flyctl
   
   # Linux
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login no Fly.io**:
   ```bash
   fly auth login
   ```

3. **Crie a aplicação**:
   ```bash
   fly apps create disparadorluxus
   ```

4. **Deploy**:
   ```bash
   fly deploy
   ```

### Estrutura de Deploy

```
Frontend (React) → /dist/ → Fly.io CDN
Backend (Express) → /backend/ → Fly.io Server
Clerk Auth → Clerk CDN
```

### URLs de Produção

- **Frontend**: `https://disparadorluxus.fly.dev`
- **API Dispatch**: `https://disparadorluxus.fly.dev/api/dispatch`
- **API Jobs**: `https://disparadorluxus.fly.dev/api/jobs/[id]`

## 📁 Estrutura do Projeto

```
sistemanovo/
├── src/                    # React components
│   ├── main.jsx           # ClerkProvider
│   ├── App.jsx            # Lógica de autenticação
│   └── components/        # Componentes
│       ├── LoginPage.jsx  # Página de login
│       ├── SendPage.jsx   # Página principal
│       ├── ConfigPage.jsx # Configurações
│       └── LogsPage.jsx   # Logs
├── backend/                # Backend Express
│   └── index.js           # Servidor
├── dist/                   # Build de produção
├── fly.toml               # Configuração Fly.io
├── Dockerfile             # Container Docker
├── package.json            # Dependências
├── start.js               # Script de inicialização
└── CLERK_SETUP.md         # Guia de configuração Clerk
```

## 🔐 Autenticação

### Clerk Configurado

✅ **Chaves já configuradas**:
- Publishable Key: `pk_test_aGVscGZ1bC1jYWxmLTg5LmNsZXJrLmFjY291bnRzLmRldiQ`
- Secret Key: `sk_test_ZmAFlAp3QbsMZwH7k8i2ZZ4yU1GiiGsle3ec0OP22x`

### Funcionalidades de Segurança

- ✅ Login/Logout automático
- ✅ Proteção de rotas
- ✅ Sessões seguras
- ✅ Redirecionamento automático
- ✅ Interface de usuário
- ✅ Logout seguro

## 📊 Formato do CSV

O arquivo CSV deve conter as seguintes colunas:

| Coluna | Tipo | Obrigatório | Descrição |
|--------|------|-------------|-----------|
| `number` | string | ✅ | Número do telefone |
| `text` | string | ❌ | Texto da mensagem |
| `image_url` | string | ❌ | URL da imagem |

### Exemplo de CSV:
```csv
number,text,image_url
5511999999999,Olá! Como vai?,https://exemplo.com/imagem.jpg
5511888888888,Segunda mensagem,
```

## 🔧 Configurações Fixas

### Token e Endpoint Bloqueados

- **Token**: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6MTIsInByb2ZpbGUiOiJhZG1pbiIsInNlc3Npb25JZCI6NTYsImlhdCI6MTc0Nzc0Nzc2MiwiZXhwIjoxODEwODE5NzYyfQ.n04QYWLC-KAF3CGwIiSB1q0Aztk6AukAM9vdVS9eCYU`
- **Endpoint**: `https://api.mychatbot.awti.com.br/v2/api/external/f9e48b4d-cbd9-441d-a3e8-1529c1b1b530`

### Configurações Padrão

- **Conversa Fechada**: ✅ (marcado por padrão)
- **Intervalo**: 50 segundos

## 🛠️ Scripts Disponíveis

```bash
# Desenvolvimento
npm start          # Sistema completo (frontend + backend)
npm run dev        # Apenas frontend
npm run server     # Apenas backend
npm run dev:full   # Sistema completo (alternativo)

# Produção
npm run build      # Build frontend
npm run preview    # Preview build

# Deploy
fly deploy         # Deploy no Fly.io
```

## 📈 Monitoramento

O sistema fornece:

- Logs em tempo real
- Estatísticas de envio
- Taxa de sucesso
- Exportação de logs
- Histórico de jobs
- Logs de autenticação

## 🔒 Segurança

- Tokens são fixos e não editáveis
- Endpoints são fixos e não editáveis
- Autenticação obrigatória
- Proteção de rotas
- CORS configurado para desenvolvimento
- Validação de entrada de dados
- Tratamento de erros robusto

## 🐛 Troubleshooting

### Problemas Comuns

1. **Erro de CORS**: Verifique se o backend está rodando na porta 3000
2. **Arquivo não carrega**: Verifique se o CSV está no formato correto
3. **Mensagens não enviam**: Token e endpoint estão fixos
4. **Build falha**: Verifique se todas as dependências estão instaladas
5. **Login não funciona**: Clerk já está configurado, verifique a conexão

### Logs

- Logs do frontend: Console do navegador
- Logs do backend: Terminal onde o servidor está rodando
- Logs de jobs: Interface web na aba "Logs"
- Logs de auth: Dashboard do Clerk

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Suporte

Para suporte, abra uma issue no repositório ou entre em contato. 
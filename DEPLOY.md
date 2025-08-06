# 🚀 Deploy no Vercel

## Pré-requisitos

1. Conta no Vercel (gratuita)
2. Repositório no GitHub/GitLab/Bitbucket
3. Node.js 18+ instalado localmente

## Passo a Passo

### 1. Preparar o Repositório

Certifique-se de que todos os arquivos estão commitados:

```bash
git add .
git commit -m "Preparando para deploy no Vercel"
git push origin main
```

### 2. Conectar ao Vercel

1. Acesse [vercel.com](https://vercel.com)
2. Faça login com sua conta GitHub/GitLab/Bitbucket
3. Clique em "New Project"
4. Selecione seu repositório
5. Clique em "Import"

### 3. Configuração do Projeto

O Vercel detectará automaticamente a configuração através do `vercel.json`, mas você pode ajustar:

**Build Settings:**
- Framework Preset: `Other`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

**Environment Variables (opcional):**
- `NODE_ENV`: `production`

### 4. Deploy

1. Clique em "Deploy"
2. Aguarde o build (2-3 minutos)
3. Seu projeto estará disponível em: `https://seu-projeto.vercel.app`

## Estrutura de Deploy

```
Frontend (React) → /dist/ → Vercel CDN
Backend (Node.js) → /backend/ → Vercel Functions
```

## URLs

- **Frontend**: `https://seu-projeto.vercel.app`
- **API**: `https://seu-projeto.vercel.app/api/*`

## Verificação

1. Acesse a URL do projeto
2. Teste o upload de CSV
3. Configure token e endpoint
4. Teste o envio de mensagens

## Troubleshooting

### Erro de Build

Se o build falhar:

1. Verifique se todas as dependências estão no `package.json`
2. Execute `npm run build` localmente
3. Verifique os logs no Vercel

### Erro de API

Se a API não funcionar:

1. Verifique se o `vercel.json` está correto
2. Teste a rota `/api/dispatch` diretamente
3. Verifique os logs da função

### Erro de CORS

Se houver erro de CORS:

1. Verifique se as rotas estão configuradas corretamente
2. Teste com Postman/Insomnia
3. Verifique se o frontend está fazendo requisições para `/api/*`

## Comandos Úteis

### Deploy Manual

```bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### Verificar Status

```bash
# Listar projetos
vercel ls

# Ver logs
vercel logs
```

## Monitoramento

- **Vercel Dashboard**: Acompanhe performance e erros
- **Function Logs**: Veja logs das APIs
- **Analytics**: Métricas de uso

## Custom Domain

1. Vá para Settings > Domains
2. Adicione seu domínio
3. Configure DNS conforme instruções

## Ambiente de Desenvolvimento

Para testar localmente antes do deploy:

```bash
# Instalar dependências
npm install
cd backend && npm install && cd ..

# Build do frontend
npm run build

# Testar backend
cd backend && npm start

# Testar frontend
npm run preview
```

## Otimizações

### Performance

- ✅ Build otimizado com Vite
- ✅ Code splitting automático
- ✅ Gzip compression
- ✅ CDN global

### Segurança

- ✅ HTTPS automático
- ✅ Headers de segurança
- ✅ Rate limiting
- ✅ CORS configurado

## Suporte

- **Documentação Vercel**: [vercel.com/docs](https://vercel.com/docs)
- **Community**: [github.com/vercel/vercel/discussions](https://github.com/vercel/vercel/discussions)
- **Status**: [vercel-status.com](https://vercel-status.com) 
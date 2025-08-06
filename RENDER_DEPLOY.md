# 🚀 Deploy no Render

## 📋 Pré-requisitos

1. **Conta no Render**: Crie uma conta em [render.com](https://render.com)
2. **Repositório GitHub**: O código deve estar no GitHub

## 🔧 Configuração

### 1. Criar Web Service no Render

1. **Acesse** [dashboard.render.com](https://dashboard.render.com)
2. **Clique** em "New +"
3. **Selecione** "Web Service"
4. **Conecte** seu repositório GitHub

### 2. Configurar o Serviço

#### Configurações Básicas
- **Name**: `disparadorluxus`
- **Environment**: `Node`
- **Region**: `Oregon (US West)` ou `Frankfurt (EU Central)`
- **Branch**: `main`

#### Configurações Avançadas
- **Build Command**: `npm install && npm run build`
- **Start Command**: `npm start`
- **Root Directory**: `/` (deixe em branco)

### 3. Variáveis de Ambiente (Opcional)

```bash
NODE_ENV=production
PORT=3000
```

## 🚀 Deploy

### Deploy Automático

O Render faz deploy automático a cada push para a branch `main`.

### Deploy Manual

1. **Push** para GitHub
2. **Render** detecta automaticamente
3. **Build** e deploy automático

## 📊 Monitoramento

### Ver logs
- **Dashboard**: Render Dashboard → Seu serviço → Logs
- **Tempo real**: Logs em tempo real disponíveis

### Ver status da aplicação
- **Dashboard**: Render Dashboard → Seu serviço → Overview
- **Health check**: `https://disparadorluxus.onrender.com/api/health`

### Abrir aplicação
- **URL**: `https://disparadorluxus.onrender.com`
- **Dashboard**: Render Dashboard → Seu serviço → Open

## 🔧 Configurações

### package.json
- **Build**: `npm run build`
- **Start**: `npm start`
- **Node.js**: `>=18.0.0`

### Backend (Express)
- **Porta**: `process.env.PORT` (automático)
- **CORS**: Configurado para Render
- **Static files**: Serve React build

## 🌐 URLs

- **Aplicação**: `https://disparadorluxus.onrender.com`
- **Health Check**: `https://disparadorluxus.onrender.com/api/health`
- **API Dispatch**: `https://disparadorluxus.onrender.com/api/dispatch`
- **API Jobs**: `https://disparadorluxus.onrender.com/api/jobs/:id`

## 🔍 Troubleshooting

### Verificar se a aplicação está rodando
- **Dashboard**: Render Dashboard → Status
- **Health check**: Acesse `/api/health`

### Ver logs em tempo real
- **Dashboard**: Render Dashboard → Logs
- **Build logs**: Disponível durante deploy

### Reiniciar aplicação
- **Dashboard**: Render Dashboard → Manual Deploy
- **GitHub**: Push para forçar novo deploy

### Ver métricas
- **Dashboard**: Render Dashboard → Metrics
- **Uptime**: Disponível no dashboard

## 💡 Vantagens do Render

✅ **Gratuito**: Plano gratuito disponível
✅ **Simples**: Deploy automático do GitHub
✅ **HTTPS automático**: Certificados SSL gratuitos
✅ **Logs centralizados**: Monitoramento completo
✅ **Deploy simples**: Push para GitHub
✅ **Custom domains**: Domínios personalizados
✅ **Auto-scaling**: Escala automaticamente

## 🔄 Comparação com outras plataformas

| Feature | Render | Vercel | Fly.io |
|---------|--------|--------|--------|
| Backend | Express Server | Serverless Functions | Express Server |
| Escalabilidade | Auto-scaling | Limitada | Auto-scaling |
| Região | Escolha | Global CDN | Escolha da região |
| Latência | Média | Variável | Baixa (Brasil) |
| Complexidade | Simples | Simples | Média |
| Custo | Gratuito | Gratuito (limitado) | Pago (barato) |
| Deploy | GitHub | GitHub | CLI |

## 🎯 Próximos passos

1. **Criar conta**: [render.com](https://render.com)
2. **Conectar GitHub**: Conecte seu repositório
3. **Configurar serviço**: Configure como Web Service
4. **Deploy**: Push para GitHub
5. **Teste**: Acesse a aplicação
6. **Monitoramento**: Configure alertas se necessário

## 📝 Configuração Detalhada

### 1. Criar Web Service

1. **Login** no Render
2. **New +** → **Web Service**
3. **Connect** GitHub repository
4. **Configure**:
   - **Name**: `disparadorluxus`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`

### 2. Configurações Avançadas

#### Environment Variables
```bash
NODE_ENV=production
PORT=3000
```

#### Health Check Path
- **Path**: `/api/health`
- **Timeout**: `5s`
- **Interval**: `30s`

### 3. Deploy

1. **Save** configurações
2. **Deploy** automático
3. **Aguardar** build e deploy
4. **Testar** aplicação

## 🚨 Problemas Comuns

### Build falha
- **Verificar**: Logs de build no dashboard
- **Solução**: Verificar dependências no `package.json`

### Aplicação não inicia
- **Verificar**: Logs de runtime
- **Solução**: Verificar `start` command

### CORS errors
- **Verificar**: Configuração CORS no backend
- **Solução**: Já configurado para Render

### Timeout
- **Verificar**: Health check path
- **Solução**: Verificar se `/api/health` responde

## 📞 Suporte

- **Documentação**: [docs.render.com](https://docs.render.com)
- **Comunidade**: [community.render.com](https://community.render.com)
- **Status**: [status.render.com](https://status.render.com) 
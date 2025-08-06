# 🚀 Deploy no Fly.io

## 📋 Pré-requisitos

1. **Conta no Fly.io**: Crie uma conta em [fly.io](https://fly.io)
2. **Fly CLI**: Instale o Fly CLI
   ```bash
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   
   # macOS
   brew install flyctl
   
   # Linux
   curl -L https://fly.io/install.sh | sh
   ```

## 🔧 Configuração

### 1. Login no Fly.io
```bash
fly auth login
```

### 2. Criar aplicação
```bash
fly apps create disparadorluxus
```

### 3. Configurar variáveis de ambiente (opcional)
```bash
fly secrets set NODE_ENV=production
```

## 🚀 Deploy

### Deploy automático
```bash
fly deploy
```

### Ou use o script npm
```bash
npm run fly:deploy
```

## 📊 Monitoramento

### Ver logs
```bash
fly logs
```

### Ver status da aplicação
```bash
fly status
```

### Abrir aplicação
```bash
fly open
```

## 🔧 Configurações

### fly.toml
- **App**: `disparadorluxus`
- **Região**: `gru` (São Paulo)
- **Porta**: `8080`
- **Memória**: `512MB`
- **CPU**: `1 shared`

### Dockerfile
- **Node.js**: `18-alpine`
- **Build**: React app
- **Runtime**: Express server

## 🌐 URLs

- **Aplicação**: `https://disparadorluxus.fly.dev`
- **Health Check**: `https://disparadorluxus.fly.dev/api/health`
- **API Dispatch**: `https://disparadorluxus.fly.dev/api/dispatch`
- **API Jobs**: `https://disparadorluxus.fly.dev/api/jobs/:id`

## 🔍 Troubleshooting

### Verificar se a aplicação está rodando
```bash
fly status
```

### Ver logs em tempo real
```bash
fly logs --follow
```

### Reiniciar aplicação
```bash
fly apps restart disparadorluxus
```

### Ver métricas
```bash
fly dashboard
```

## 💡 Vantagens do Fly.io

✅ **Servidor completo**: Express.js com todas as funcionalidades
✅ **Auto-scaling**: Escala automaticamente baseado na demanda
✅ **Região Brasil**: Servidor em São Paulo (menor latência)
✅ **HTTPS automático**: Certificados SSL gratuitos
✅ **Logs centralizados**: Monitoramento completo
✅ **Deploy simples**: Um comando para deploy

## 🔄 Comparação com Vercel

| Feature | Vercel | Fly.io |
|---------|--------|--------|
| Backend | Serverless Functions | Express Server |
| Escalabilidade | Limitada | Auto-scaling |
| Região | Global CDN | Escolha da região |
| Latência | Variável | Baixa (Brasil) |
| Complexidade | Simples | Média |
| Custo | Gratuito (limitado) | Pago (barato) |

## 🎯 Próximos passos

1. **Deploy**: `fly deploy`
2. **Teste**: Acesse a aplicação
3. **Monitoramento**: Configure alertas
4. **Backup**: Configure backups se necessário 
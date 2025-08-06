# 🔧 Fix para Deploy no Vercel

## ❌ Problema Identificado
```
Error: Cannot find module @rollup/rollup-linux-x64-gnu
```

## ✅ Soluções Implementadas

### 1. **Arquivo `.npmrc`**
```ini
legacy-peer-deps=true
optional=false
```

### 2. **Package.json Atualizado**
- Adicionado `engines` para Node.js
- Downgrade do Vite para versão mais estável
- Script `vercel-build` adicionado

### 3. **Vercel.json Simplificado**
- Removido `functions` (conflito com `builds`)
- Configuração mais limpa
- Variáveis de ambiente movidas para dashboard

## 🚀 Passos para Deploy

### **1. Configurar Variáveis no Vercel Dashboard**
Vá para **Settings** → **Environment Variables** e adicione:

```
VITE_CLERK_PUBLISHABLE_KEY = pk_test_aGVscGZ1bC1jYWxmLTg5LmNsZXJrLmFjY291bnRzLmRldiQ
CLERK_SECRET_KEY = sk_test_ZmAFlAp3QbsMZwH7k8i2ZZ4yU1GiiGsle3ec0OP22x
NODE_ENV = production
```

### **2. Configurações do Projeto**
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install --legacy-peer-deps`

### **3. Deploy Settings**
- **Node.js Version**: 18.x ou superior
- **Auto-deploy**: Enabled
- **Branch**: main

## 📁 Arquivos Modificados

### `package.json`
```json
{
  "engines": {
    "node": ">=18.0.0"
  },
  "devDependencies": {
    "vite": "^4.5.0"
  }
}
```

### `vercel.json`
```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/dispatch",
      "dest": "/api/dispatch.js"
    },
    {
      "src": "/api/jobs/(.*)",
      "dest": "/api/jobs/[id].js"
    },
    {
      "src": "/(.*)",
      "dest": "/dist/$1"
    }
  ]
}
```

### `.npmrc`
```ini
legacy-peer-deps=true
optional=false
```

## 🔧 Configurações Adicionais

### **Se o erro persistir, tente:**

1. **Limpar cache do Vercel**:
   - Vá para **Settings** → **General**
   - Clique em **Clear Build Cache**

2. **Forçar redeploy**:
   - Vá para **Deployments**
   - Clique em **Redeploy**

3. **Verificar logs**:
   - Monitore os logs em tempo real
   - Identifique erros específicos

## 📋 Checklist de Deploy

- ✅ **Build local funcionando**: `npm run build` sem erros
- ✅ **Arquivos atualizados**: `.npmrc`, `package.json`, `vercel.json`
- ✅ **Variáveis configuradas**: No dashboard do Vercel
- ✅ **API routes prontas**: `/api/dispatch.js` e `/api/jobs/[id].js`
- ✅ **Clerk configurado**: Domínios adicionados

## 🎯 Resultado Esperado

Após as correções:
- ✅ **Build bem-sucedido** no Vercel
- ✅ **Frontend funcionando** com Clerk
- ✅ **API routes ativas** para envio de mensagens
- ✅ **Deploy automático** em cada push

## 🚨 Troubleshooting

### **Erro: "Cannot find module"**
- Verifique se `.npmrc` está no repositório
- Confirme versão do Node.js (>=18)

### **Erro: "Build failed"**
- Verifique logs detalhados
- Confirme se todas as dependências estão instaladas

### **Erro: "Environment variables"**
- Configure variáveis no dashboard do Vercel
- Não use `vercel.json` para variáveis sensíveis

**Agora tente fazer o deploy novamente!** 🚀 
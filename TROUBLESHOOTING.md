# Troubleshooting - Problemas de Autenticação

## Problema: Página em branco ou erro de Hooks

### Solução 1: Testar sem autenticação

1. **Renomeie os arquivos**:
   ```bash
   # Para testar SEM autenticação
   mv src/main.jsx src/main-with-auth.jsx
   mv src/main-test.jsx src/main.jsx
   ```

2. **Reinicie o servidor**:
   ```bash
   npm run dev
   ```

3. **Teste**: http://localhost:5173

### Solução 2: Voltar para autenticação

1. **Renomeie os arquivos**:
   ```bash
   # Para usar COM autenticação
   mv src/main.jsx src/main-test.jsx
   mv src/main-with-auth.jsx src/main.jsx
   ```

2. **Reinicie o servidor**:
   ```bash
   npm run dev
   ```

3. **Teste**: http://localhost:5173

## Problemas Comuns

### 1. Erro de Hooks do React
**Sintoma**: "Rendered more hooks than during the previous render"
**Solução**: ✅ **Corrigido** - Movido `useAuth()` para uma única chamada

### 2. Página em branco
**Possíveis causas**:
- Clerk não carregando
- Domínio não configurado
- Erro de rede

### 3. Clerk não funciona
**Verificar**:
- Domínio `localhost:5173` adicionado no dashboard do Clerk
- Chave pública correta
- Rede funcionando

## Configuração do Clerk

### Domínios permitidos
Adicione no dashboard do Clerk:
- `localhost:5173` (desenvolvimento)
- `*.vercel.app` (produção)

### Chaves configuradas
- **Publishable Key**: `pk_test_aGVscGZ1bC1jYWxmLTg5LmNsZXJrLmFjY291bnRzLmRldiQ`
- **Secret Key**: `sk_test_ZmAFlAp3QbsMZwH7k8i2ZZ4yU1GiiGsle3ec0OP22x`

## Testes

### Teste 1: Sem autenticação
```bash
# Use main-test.jsx
npm run dev
# Acesse: http://localhost:5173
# Deve mostrar o sistema funcionando
```

### Teste 2: Com autenticação
```bash
# Use main-with-auth.jsx
npm run dev
# Acesse: http://localhost:5173
# Deve mostrar tela de login
```

## Logs úteis

Abra o console do navegador (F12) e verifique:
- Erros de rede
- Erros de JavaScript
- Logs do Clerk
- Logs da aplicação

## Próximos passos

1. ✅ Teste sem autenticação
2. ✅ Configure domínios no Clerk
3. ✅ Teste com autenticação
4. ✅ Deploy no Vercel 
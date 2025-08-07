# 📱 Manual do Usuário - Sistema de Disparo de Mensagens

## 🎯 Visão Geral

Este sistema permite enviar mensagens em lote para WhatsApp através de um arquivo CSV. O sistema é seguro e possui autenticação integrada.

---

## 🔐 **PASSO 1: Login no Sistema**

### Como Fazer Login:
1. **Acesse** a aplicação no navegador
2. **Clique** em "Sign in" no canto superior direito
3. **Escolha** um método de login:
   - Email e senha
   - Google
   - Outros métodos disponíveis
4. **Complete** o processo de autenticação

---

## 📊 **PASSO 2: Preparar o Arquivo CSV**

### Estrutura do CSV:
O arquivo CSV deve conter as seguintes colunas:

```csv
numero,mensagem,imagem
5511999999999,Olá! Como posso ajudar?,https://exemplo.com/imagem.jpg
5511888888888,Boa tarde! Tudo bem?,https://exemplo.com/outra.jpg
```

### Colunas Obrigatórias:
- **`numero`**: Número do WhatsApp (com código do país)
- **`mensagem`**: Texto da mensagem
- **`imagem`**: URL da imagem (opcional)

### Exemplo de CSV:
```csv
numero,mensagem,imagem
5511999999999,Olá! Bem-vindo ao nosso sistema.,https://exemplo.com/welcome.jpg
5511888888888,Obrigado por escolher nossos serviços.,https://exemplo.com/thanks.jpg
5511777777777,Promoção especial para você!,https://exemplo.com/promo.jpg
```

### ⚠️ **Dicas Importantes:**
- ✅ Use números com código do país (ex: 5511999999999)
- ✅ Separe as colunas com vírgula
- ✅ Use aspas se o texto contiver vírgulas
- ✅ URLs de imagem devem ser públicas e acessíveis

---

## 🚀 **PASSO 3: Configurar o Disparo**

### 3.1 Acessar a Página de Envio:
1. **Faça login** no sistema
2. **Clique** em "Enviar Mensagens" no menu
3. **Verifique** se a URL do backend está correta (automática)

### 3.2 Configurar Chave Externa:
1. **Localize** o campo "Chave Externa"
2. **Digite**: `123` (valor padrão)
3. **Esta chave** identifica o disparo no sistema

### 3.3 Configurar Opções:
- **✅ Conversa Fechada**: Mantenha marcado (padrão)
- **⏱️ Intervalo**: 50 segundos (padrão)
  - Ajuste conforme necessário (1-60 segundos)

---

## 📁 **PASSO 4: Carregar o Arquivo CSV**

### Como Fazer Upload:
1. **Clique** em "Selecionar arquivo CSV"
2. **Escolha** seu arquivo CSV
3. **Aguarde** o carregamento
4. **Verifique** o preview dos dados

### ✅ Verificações Importantes:
- [ ] Arquivo carregado com sucesso
- [ ] Preview mostra os dados corretos
- [ ] Números estão no formato correto
- [ ] Mensagens estão completas

---

## 🔧 **PASSO 5: Testar Conexão**

### Antes de Disparar:
1. **Clique** em "Testar Conexão"
2. **Aguarde** a resposta
3. **Confirme** que aparece: "✅ Backend conectado com sucesso!"

### ⚠️ Se Der Erro:
- Verifique sua conexão com a internet
- Aguarde alguns minutos e tente novamente
- Entre em contato com o suporte se persistir

---

## 🎯 **PASSO 6: Iniciar o Disparo**

### Como Disparar:
1. **Verifique** todas as configurações
2. **Clique** em "Iniciar Disparo"
3. **Aguarde** a confirmação do sistema
4. **Monitore** o progresso em tempo real

### 📊 **Monitoramento em Tempo Real:**

#### Estatísticas Visíveis:
- **📊 Total**: Número total de mensagens
- **✅ Enviados**: Mensagens enviadas com sucesso
- **❌ Falhas**: Mensagens que falharam
- **⏳ Pendentes**: Mensagens aguardando envio

#### Logs Detalhados:
```
14:30:25 - ✅ 5511999999999 - Texto (com imagem)
14:30:27 - ✅ 5511888888888 - Texto
14:30:29 - ❌ 5511777777777 - Erro: Número inválido
```

---

## ⏸️ **PASSO 7: Gerenciar o Disparo**

### Durante o Disparo:
- **📊 Acompanhe** as estatísticas em tempo real
- **📝 Monitore** os logs de cada mensagem
- **⏸️ Pause** se necessário (botão "Parar Disparo")

### Após o Disparo:
- **✅ Verifique** o resumo final
- **📋 Anote** as estatísticas
- **🔄 Prepare** próximo disparo se necessário

---

## 🔍 **PASSO 8: Verificar Logs**

### Acessar Logs:
1. **Clique** em "Logs" no menu
2. **Visualize** histórico completo
3. **Filtre** por data se necessário

### Informações nos Logs:
- **📅 Data e hora** de cada envio
- **📱 Número** de destino
- **💬 Tipo** de mensagem (texto/imagem)
- **✅ Status** (sucesso/falha)
- **❌ Erro** (se houver)

---

## ⚠️ **PROBLEMAS COMUNS E SOLUÇÕES**

### ❌ **Erro: "Arquivo CSV inválido"**
**Solução:**
- Verifique se o arquivo tem as colunas corretas
- Confirme se está salvo como CSV
- Teste com um arquivo menor

### ❌ **Erro: "Número inválido"**
**Solução:**
- Use formato: 5511999999999 (com código do país)
- Remova espaços e caracteres especiais
- Verifique se o número existe no WhatsApp

### ❌ **Erro: "Falha no envio"**
**Solução:**
- Verifique a conexão com a internet
- Aguarde alguns minutos e tente novamente
- Confirme se o token está válido

### ❌ **Erro: "Backend não conectado"**
**Solução:**
- Clique em "Testar Conexão"
- Aguarde alguns minutos
- Recarregue a página se necessário

---

## 📋 **CHECKLIST RÁPIDO**

### Antes de Disparar:
- [ ] ✅ Logado no sistema
- [ ] 📁 CSV preparado corretamente
- [ ] 🔑 Chave externa configurada (123)
- [ ] ⚙️ Configurações verificadas
- [ ] 🔧 Conexão testada
- [ ] 📊 Preview dos dados correto

### Durante o Disparo:
- [ ] 📊 Monitorando estatísticas
- [ ] 📝 Verificando logs
- [ ] ⏸️ Pronto para pausar se necessário

### Após o Disparo:
- [ ] ✅ Verificado resumo final
- [ ] 📋 Anotado estatísticas
- [ ] 🧹 Preparado para próximo disparo

---

## 🆘 **SUPORTE**

### Em Caso de Problemas:
1. **Verifique** este manual
2. **Teste** com arquivo menor
3. **Entre em contato** com o suporte técnico

### Informações para Suporte:
- Data e hora do problema
- Erro exato que apareceu
- Arquivo CSV usado (sem dados sensíveis)
- Configurações aplicadas

---

## 🎉 **DICAS FINAIS**

### ✅ **Para Melhor Performance:**
- Use arquivos CSV com até 1000 registros por vez
- Mantenha intervalos de 30-60 segundos
- Monitore sempre os logs durante o disparo
- Faça backup dos arquivos CSV importantes

### 🔒 **Segurança:**
- Nunca compartilhe suas credenciais
- Use sempre logout ao terminar
- Mantenha os arquivos CSV seguros
- Não exponha dados sensíveis

---

**🎯 Agora você está pronto para usar o sistema de disparo de mensagens!**

**Boa sorte e sucesso nos seus disparos!** 🚀 
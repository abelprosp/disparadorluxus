# Criando Repositório no GitHub

## Passo 1: Criar Repositório no GitHub

1. **Acesse**: [github.com](https://github.com)
2. **Faça login** na sua conta
3. **Clique em "New"** ou "New repository"
4. **Configure o repositório**:
   - **Repository name**: `sistema-dispatch-whatsapp`
   - **Description**: `Sistema moderno para envio de mensagens WhatsApp em lote`
   - **Visibility**: Public ou Private (sua escolha)
   - **NÃO** marque "Add a README file" (já temos)
   - **NÃO** marque "Add .gitignore" (já temos)
   - **NÃO** marque "Choose a license" (opcional)

5. **Clique em "Create repository"**

## Passo 2: Comandos para Subir o Projeto

Execute estes comandos no terminal:

```bash
# 1. Inicializar Git (se não estiver inicializado)
git init

# 2. Adicionar todos os arquivos
git add .

# 3. Fazer o primeiro commit
git commit -m "Initial commit: Sistema de Dispatch WhatsApp"

# 4. Adicionar o repositório remoto (substitua USERNAME pelo seu usuário)
git remote add origin https://github.com/USERNAME/sistema-dispatch-whatsapp.git

# 5. Enviar para o GitHub
git branch -M main
git push -u origin main
```

## Passo 3: Verificar se Funcionou

1. **Acesse**: `https://github.com/USERNAME/sistema-dispatch-whatsapp`
2. **Verifique** se todos os arquivos estão lá
3. **Confirme** que o README.md aparece na página

## Estrutura que será enviada:

```
sistema-dispatch-whatsapp/
├── src/                    # React components
├── api/                    # Vercel API routes
├── backend/                # Backend local
├── dist/                   # Build (será ignorado)
├── package.json            # Dependências
├── vercel.json            # Configuração Vercel
├── README.md              # Documentação
├── CLERK_SETUP.md         # Guia Clerk
├── TROUBLESHOOTING.md     # Troubleshooting
└── .gitignore             # Arquivos ignorados
```

## Próximos Passos:

1. ✅ Criar repositório no GitHub
2. ✅ Subir código
3. ✅ Conectar ao Vercel
4. ✅ Deploy automático

## URLs Importantes:

- **GitHub**: `https://github.com/USERNAME/sistema-dispatch-whatsapp`
- **Vercel**: `https://seu-projeto.vercel.app`
- **Clerk**: Dashboard para configurar domínios

## Comandos Úteis:

```bash
# Ver status do Git
git status

# Ver commits
git log --oneline

# Fazer novo commit
git add .
git commit -m "Descrição das mudanças"
git push

# Ver branches
git branch -a
```

## Problemas Comuns:

### Erro: "fatal: remote origin already exists"
```bash
git remote remove origin
git remote add origin https://github.com/USERNAME/sistema-dispatch-whatsapp.git
```

### Erro: "Permission denied"
- Verifique se está logado no GitHub
- Use token de acesso pessoal se necessário

### Erro: "Repository not found"
- Verifique se o nome do repositório está correto
- Verifique se o usuário está correto 
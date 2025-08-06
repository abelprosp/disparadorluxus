const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Configurando repositório no GitHub...');

// Verificar se Git está instalado
try {
  execSync('git --version', { stdio: 'ignore' });
  console.log('✅ Git encontrado');
} catch (error) {
  console.error('❌ Git não encontrado. Instale o Git primeiro.');
  process.exit(1);
}

// Verificar se estamos no diretório correto
if (!fs.existsSync('package.json')) {
  console.error('❌ package.json não encontrado. Execute este script no diretório do projeto.');
  process.exit(1);
}

try {
  // 1. Inicializar Git (se não estiver inicializado)
  if (!fs.existsSync('.git')) {
    console.log('📁 Inicializando Git...');
    execSync('git init', { stdio: 'inherit' });
  } else {
    console.log('✅ Git já inicializado');
  }

  // 2. Adicionar todos os arquivos
  console.log('📦 Adicionando arquivos...');
  execSync('git add .', { stdio: 'inherit' });

  // 3. Verificar se há mudanças para commitar
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  
  if (status.trim()) {
    console.log('💾 Fazendo commit inicial...');
    execSync('git commit -m "Initial commit: Sistema de Dispatch WhatsApp"', { stdio: 'inherit' });
  } else {
    console.log('✅ Nenhuma mudança para commitar');
  }

  console.log('\n🎉 Git configurado com sucesso!');
  console.log('\n📋 Próximos passos:');
  console.log('1. Crie um repositório no GitHub: https://github.com/new');
  console.log('2. Nome do repositório: sistema-dispatch-whatsapp');
  console.log('3. Execute os comandos abaixo:');
  console.log('\n   git remote add origin https://github.com/SEU_USUARIO/sistema-dispatch-whatsapp.git');
  console.log('   git branch -M main');
  console.log('   git push -u origin main');
  console.log('\n4. Conecte ao Vercel para deploy automático');
  console.log('5. Configure domínios no Clerk');

} catch (error) {
  console.error('❌ Erro durante a configuração:', error.message);
  process.exit(1);
} 
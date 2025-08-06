const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Iniciando build para Vercel...');

try {
  // Limpar cache se existir
  if (fs.existsSync('node_modules/.cache')) {
    console.log('🧹 Limpando cache...');
    execSync('rm -rf node_modules/.cache', { stdio: 'inherit' });
  }

  // Instalar dependências com configurações específicas
  console.log('📦 Instalando dependências...');
  execSync('npm install --legacy-peer-deps --omit=optional', { stdio: 'inherit' });

  // Build do projeto
  console.log('🔨 Executando build...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('✅ Build concluído com sucesso!');
} catch (error) {
  console.error('❌ Erro durante o build:', error.message);
  process.exit(1);
} 
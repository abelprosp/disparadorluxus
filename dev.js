const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Iniciando sistema de desenvolvimento...');

// Inicia o backend
const backend = spawn('node', ['backend/index.js'], {
  cwd: __dirname,
  stdio: 'inherit'
});

console.log('✅ Backend iniciado na porta 3000');

// Inicia o frontend
const frontend = spawn('npm', ['run', 'dev'], {
  cwd: __dirname,
  stdio: 'inherit'
});

console.log('✅ Frontend iniciado na porta 5173');

// Tratamento de sinais para encerrar ambos os processos
process.on('SIGINT', () => {
  console.log('\n🛑 Encerrando servidores...');
  backend.kill();
  frontend.kill();
  process.exit();
});

process.on('SIGTERM', () => {
  console.log('\n🛑 Encerrando servidores...');
  backend.kill();
  frontend.kill();
  process.exit();
}); 
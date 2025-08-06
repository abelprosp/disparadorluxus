import { spawn } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Iniciando sistema completo...');

// Função para matar processos na porta 3000 se existirem
function killProcessOnPort(port) {
  return new Promise((resolve) => {
    const kill = spawn('netstat', ['-ano'], { shell: true });
    let output = '';
    
    kill.stdout.on('data', (data) => {
      output += data.toString();
    });
    
    kill.on('close', () => {
      const lines = output.split('\n');
      for (const line of lines) {
        if (line.includes(`:${port}`) && line.includes('LISTENING')) {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          if (pid && pid !== '0') {
            console.log(`🛑 Matando processo ${pid} na porta ${port}`);
            spawn('taskkill', ['/PID', pid, '/F'], { shell: true });
          }
        }
      }
      setTimeout(resolve, 1000);
    });
  });
}

async function startSystem() {
  // Matar processos na porta 3000
  await killProcessOnPort(3000);
  
  console.log('✅ Porta 3000 liberada');

  // Inicia o backend
  const backend = spawn('node', ['backend/index.js'], {
    cwd: __dirname,
    stdio: 'inherit'
  });

  console.log('✅ Backend iniciado na porta 3000');

  // Aguarda um pouco para o backend inicializar
  setTimeout(() => {
    // Inicia o frontend usando npm com shell
    const frontend = spawn('npm', ['run', 'dev'], {
      cwd: __dirname,
      stdio: 'inherit',
      shell: true
    });

    console.log('✅ Frontend iniciado na porta 5173');
    console.log('🌐 Acesse: http://localhost:5173');

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
  }, 2000);
}

startSystem().catch(console.error); 
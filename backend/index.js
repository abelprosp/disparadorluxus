import express from 'express';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';
import cors from 'cors';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { addJob, updateJob, getJob } from './jobStore.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Serve static files from the dist directory (built React app)
app.use(express.static(join(__dirname, '../dist')));

// Rota de health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend funcionando' })
})

// Rota para iniciar disparo
app.post('/api/dispatch', (req, res) => {
  const {
    csvData, token, endpoint, externalKey,
    isClosed, intervalSeconds
  } = req.body;

  const jobId = uuidv4();
  addJob({
    id: jobId,
    csvData, token, endpoint, externalKey,
    isClosed, intervalSeconds,
    currentIndex: 0,
    logs: [],
    createdAt: new Date().toISOString()
  });

  setImmediate(() => sendNext(jobId));
  res.json({ jobId });
});

async function sendNext(jobId) {
  const job = getJob(jobId);
  if (!job) return;

  if (job.currentIndex >= job.csvData.length) {
    updateJob(jobId, {
      status: 'completed',
      completedAt: new Date().toISOString()
    });
    return;
  }

  const row = job.csvData[job.currentIndex];
  const number = row.number;
  const messageText = row.text || '';
  const imageUrl = row.image_url || '';

  // Determina o tipo de mensagem baseado no conteúdo
  const messageType = imageUrl ? 'image_text' : 'text';
  
  // Usar sempre o mesmo endpoint, não adicionar /url
  const url = job.endpoint;

  const body = {
    number,
    externalKey: job.externalKey,
    isClosed: job.isClosed,
    body: messageText
  };

  if (messageType === 'image_text' && imageUrl) {
    body.mediaUrl = imageUrl;
  }

  console.log(`=== ENVIANDO MENSAGEM ${job.currentIndex + 1}/${job.csvData.length} ===`);
  console.log(`URL: ${url}`);
  console.log(`Token: ${job.token.substring(0, 20)}...`);
  console.log(`Body:`, JSON.stringify(body, null, 2));

  let logEntry;
  try {
    // Primeiro, vamos testar se o endpoint está acessível
    console.log('Testando conectividade com o endpoint...');
    
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + job.token,
        'Content-Type': 'application/json',
        'User-Agent': 'Dispatch-System/1.0'
      },
      body: JSON.stringify(body)
    });
    
    console.log(`Status: ${res.status}`);
    console.log(`Status Text: ${res.statusText}`);
    console.log(`Headers:`, Object.fromEntries(res.headers.entries()));
    
    let data = {};
    try {
      data = await res.json();
      console.log(`Response JSON:`, data);
    } catch (jsonError) {
      const textResponse = await res.text();
      console.log(`Response Text:`, textResponse);
    }
    
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${data.error || data.message || res.statusText}`);
    }
    
    logEntry = { 
      number, 
      success: true, 
      messageType,
      hasImage: !!imageUrl,
      timestamp: new Date().toISOString() 
    };
    console.log(`✅ Mensagem enviada com sucesso para ${number}`);
  } catch (err) {
    console.error(`❌ Erro ao enviar para ${number}:`, err.message);
    console.error(`Stack trace:`, err.stack);
    logEntry = { 
      number, 
      success: false, 
      error: err.message, 
      messageType,
      hasImage: !!imageUrl,
      timestamp: new Date().toISOString() 
    };
  }

  const updatedLogs = [...job.logs, logEntry];
  updateJob(jobId, { logs: updatedLogs, currentIndex: job.currentIndex + 1 });

  setTimeout(() => sendNext(jobId), job.intervalSeconds * 1000);
}

app.get('/api/jobs/:id', (req, res) => {
  const job = getJob(req.params.id);
  if (!job) {
    return res.status(404).json({ error: 'Job não encontrado' });
  }
  res.json({ logs: job.logs });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(join(__dirname, '../dist/index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Backend ouvindo na porta ${PORT}`)); 
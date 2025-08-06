import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://disparadorluxus.onrender.com', 'https://disparadorluxus-frontend.onrender.com']
    : true,
  credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.static(path.join(__dirname, '../dist')));

// Simulação do jobStore
const jobs = new Map();

function addJob(job) {
  jobs.set(job.id, job);
}

function updateJob(id, updates) {
  const job = jobs.get(id);
  if (job) {
    jobs.set(id, { ...job, ...updates });
  }
}

function getJob(id) {
  return jobs.get(id);
}

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
  
  // Usar sempre o mesmo endpoint
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

  let logEntry;
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + job.token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    
    const data = await res.json().catch(() => ({}));
    
    if (!res.ok) throw new Error(data.error || data.message || `Status ${res.status}`);
    logEntry = { 
      number, 
      success: true, 
      messageType,
      hasImage: !!imageUrl,
      timestamp: new Date().toISOString() 
    };
  } catch (err) {
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

  // Para serverless, não podemos usar setTimeout
  // Em vez disso, vamos processar imediatamente
  if (job.currentIndex + 1 < job.csvData.length) {
    // Simular delay usando Promise
    await new Promise(resolve => setTimeout(resolve, job.intervalSeconds * 1000));
    await sendNext(jobId);
  }
}

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Backend funcionando',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    platform: 'Render'
  });
});

app.post('/api/dispatch', async (req, res) => {
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

  // Inicia o processamento em background
  sendNext(jobId).catch(console.error);
  
  res.json({ jobId });
});

app.get('/api/jobs/:id', (req, res) => {
  const { id } = req.params;
  
  const job = getJob(id);
  if (!job) {
    return res.status(404).json({ error: 'Job não encontrado' });
  }
  
  res.json({ logs: job.logs });
});

// Serve React app for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📱 Frontend: http://localhost:${PORT}`);
  console.log(`🔧 API Health: http://localhost:${PORT}/api/health`);
  console.log(`🌐 Platform: Render`);
}); 
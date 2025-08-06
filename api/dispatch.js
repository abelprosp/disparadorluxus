import fetch from 'node-fetch';
import { v4 as uuidv4 } from 'uuid';

// Simulação do jobStore para serverless
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

export default async function handler(req, res) {
  // Adicionar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'POST') {
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
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 
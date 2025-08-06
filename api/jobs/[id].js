// Simulação do jobStore para serverless
const jobs = new Map();

function getJob(id) {
  return jobs.get(id);
}

export default function handler(req, res) {
  // Adicionar headers CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  if (req.method === 'GET') {
    const { id } = req.query;
    
    const job = getJob(id);
    if (!job) {
      return res.status(404).json({ error: 'Job não encontrado' });
    }
    
    res.json({ logs: job.logs });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 
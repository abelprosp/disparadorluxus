// Simulação do jobStore para serverless
const jobs = new Map();

function getJob(id) {
  return jobs.get(id);
}

export default function handler(req, res) {
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
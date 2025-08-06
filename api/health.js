export default function handler(req, res) {
  if (req.method === 'GET') {
    res.json({ 
      status: 'ok', 
      message: 'Backend funcionando',
      timestamp: new Date().toISOString()
    });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 
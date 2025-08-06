import React, { useState, useEffect } from 'react'
import axios from 'axios'

const LogsPage = () => {
  const [jobId, setJobId] = useState('')
  const [logs, setLogs] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleFetchLogs = async () => {
    if (!jobId.trim()) {
      setError('Por favor, insira um ID de job válido')
      return
    }

    setLoading(true)
    setError('')

    try {
      const response = await axios.get(`/api/jobs/${jobId}`)
      setLogs(response.data.logs || [])
    } catch (error) {
      setError('Erro ao buscar logs: ' + (error.response?.data?.error || error.message))
      setLogs([])
    } finally {
      setLoading(false)
    }
  }

  const getStats = () => {
    const total = logs.length
    const sent = logs.filter(log => log.success).length
    const failed = logs.filter(log => !log.success).length
    const successRate = total > 0 ? ((sent / total) * 100).toFixed(1) : 0

    return { total, sent, failed, successRate }
  }

  const stats = getStats()

  return (
    <div className="container">
      <h2>Visualizar Logs</h2>
      
      <div className="form-group">
        <label>ID do Job:</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <input
            type="text"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            placeholder="Digite o ID do job"
            style={{ flex: 1 }}
          />
          <button 
            className="btn" 
            onClick={handleFetchLogs}
            disabled={loading}
          >
            {loading ? 'Carregando...' : 'Buscar Logs'}
          </button>
        </div>
      </div>

      {error && (
        <div className="form-group">
          <div className="error">{error}</div>
        </div>
      )}

      {logs.length > 0 && (
        <>
          <div className="stats">
            <div className="stat-item">
              <strong>Total:</strong> {stats.total}
            </div>
            <div className="stat-item success">
              <strong>Enviados:</strong> {stats.sent}
            </div>
            <div className="stat-item error">
              <strong>Falhas:</strong> {stats.failed}
            </div>
            <div className="stat-item">
              <strong>Taxa de Sucesso:</strong> {stats.successRate}%
            </div>
          </div>

          <div className="form-group">
            <label>Logs do Job {jobId}:</label>
            <div className="log-container">
              {logs.map((log, index) => (
                <div key={index} className={log.success ? 'success' : 'error'}>
                  <strong>{new Date(log.timestamp).toLocaleString()}</strong> - 
                  {log.success ? '✅' : '❌'} {log.number} - 
                  {log.messageType} {log.hasImage ? '(com imagem)' : ''}
                  {!log.success && ` - ${log.error}`}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <button 
              className="btn btn-secondary"
              onClick={() => {
                const logText = logs.map(log => 
                  `${new Date(log.timestamp).toLocaleString()} - ${log.success ? 'SUCCESS' : 'ERROR'} - ${log.number} - ${log.messageType} ${log.hasImage ? '(com imagem)' : ''} ${!log.success ? `- ${log.error}` : ''}`
                ).join('\n')
                
                const blob = new Blob([logText], { type: 'text/plain' })
                const url = URL.createObjectURL(blob)
                const a = document.createElement('a')
                a.href = url
                a.download = `logs-job-${jobId}.txt`
                a.click()
                URL.revokeObjectURL(url)
              }}
            >
              Exportar Logs
            </button>
          </div>
        </>
      )}

      {logs.length === 0 && !loading && !error && jobId && (
        <div className="form-group">
          <p>Nenhum log encontrado para este job.</p>
        </div>
      )}
    </div>
  )
}

export default LogsPage 
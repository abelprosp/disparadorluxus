import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'
import axios from 'axios'

const SendPage = () => {
  const [csvData, setCsvData] = useState([])
  const [config, setConfig] = useState({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6MTIsInByb2ZpbGUiOiJhZG1pbiIsInNlc3Npb25JZCI6NTYsImlhdCI6MTc0Nzc0Nzc2MiwiZXhwIjoxODEwODE5NzYyfQ.n04QYWLC-KAF3CGwIiSB1q0Aztk6AukAM9vdVS9eCYU',
    endpoint: 'https://api.mychatbot.awti.com.br/v2/api/external/f9e48b4d-cbd9-441d-a3e8-1529c1b1b530',
    backendUrl: 'http://localhost:3000',
    externalKey: '',
    isClosed: true,
    intervalSeconds: 50
  })
  const [jobId, setJobId] = useState(null)
  const [logs, setLogs] = useState([])
  const [isRunning, setIsRunning] = useState(false)
  const [stats, setStats] = useState({
    total: 0,
    sent: 0,
    failed: 0,
    pending: 0
  })

  useEffect(() => {
    // Carregar configurações salvas
    const savedConfig = localStorage.getItem('dispatchConfig')
    if (savedConfig) {
      const parsedConfig = JSON.parse(savedConfig)
      // Manter token e endpoint fixos, mas permitir outras configurações
      setConfig({
        ...parsedConfig,
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6MTIsInByb2ZpbGUiOiJhZG1pbiIsInNlc3Npb25JZCI6NTYsImlhdCI6MTc0Nzc0Nzc2MiwiZXhwIjoxODEwODE5NzYyfQ.n04QYWLC-KAF3CGwIiSB1q0Aztk6AukAM9vdVS9eCYU',
        endpoint: 'https://api.mychatbot.awti.com.br/v2/api/external/f9e48b4d-cbd9-441d-a3e8-1529c1b1b530'
      })
    }
  }, [])

  useEffect(() => {
    // Salvar configurações
    localStorage.setItem('dispatchConfig', JSON.stringify(config))
  }, [config])

  useEffect(() => {
    if (jobId && isRunning) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`${config.backendUrl}/api/jobs/${jobId}`)
          const jobLogs = response.data.logs || []
          setLogs(jobLogs)
          
          // Calcular estatísticas
          const total = csvData.length
          const sent = jobLogs.filter(log => log.success).length
          const failed = jobLogs.filter(log => !log.success).length
          const pending = total - sent - failed
          
          setStats({ total, sent, failed, pending })
          
          // Verificar se o job foi concluído
          if (sent + failed >= total) {
            setIsRunning(false)
          }
        } catch (error) {
          console.error('Erro ao buscar logs:', error)
        }
      }, 2000)
      
      return () => clearInterval(interval)
    }
  }, [jobId, isRunning, csvData.length, config.backendUrl])

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setCsvData(results.data)
        },
        error: (error) => {
          alert('Erro ao processar arquivo CSV: ' + error.message)
        }
      })
    }
  }

  const handleConfigChange = (field, value) => {
    setConfig(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleStartDispatch = async () => {
    if (!config.token || !config.endpoint || csvData.length === 0) {
      alert('Por favor, preencha todos os campos obrigatórios e carregue um arquivo CSV')
      return
    }

    setIsRunning(true)
    setLogs([])
    setStats({
      total: csvData.length,
      sent: 0,
      failed: 0,
      pending: csvData.length
    })

    try {
      console.log('Enviando para:', `${config.backendUrl}/api/dispatch`)
      console.log('Dados:', { csvData, ...config })
      
      const response = await axios.post(`${config.backendUrl}/api/dispatch`, {
        csvData,
        ...config
      })
      setJobId(response.data.jobId)
    } catch (error) {
      console.error('Erro completo:', error)
      let errorMessage = 'Erro ao iniciar disparo'
      
      if (error.response) {
        // O servidor respondeu com um status de erro
        errorMessage += `: ${error.response.status} - ${error.response.statusText}`
        if (error.response.data && error.response.data.error) {
          errorMessage += ` - ${error.response.data.error}`
        }
      } else if (error.request) {
        // A requisição foi feita mas não houve resposta
        errorMessage += ': Sem resposta do servidor. Verifique se o backend está rodando.'
      } else {
        // Algo aconteceu na configuração da requisição
        errorMessage += `: ${error.message}`
      }
      
      alert(errorMessage)
      setIsRunning(false)
    }
  }

  const handleStopDispatch = () => {
    setIsRunning(false)
  }

  const testBackendConnection = async () => {
    try {
      const response = await axios.get(`${config.backendUrl}/api/health`)
      alert('✅ Backend conectado com sucesso!')
    } catch (error) {
      alert('❌ Erro ao conectar com o backend. Verifique se está rodando na porta correta.')
    }
  }

  return (
    <div className="container">
      <h2>Envio de Mensagens</h2>
      
      <div className="form-group">
        <label>URL do Backend:</label>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <input
            type="url"
            value={config.backendUrl}
            onChange={(e) => handleConfigChange('backendUrl', e.target.value)}
            placeholder="http://localhost:3000"
            style={{ flex: 1 }}
          />
          <button 
            onClick={testBackendConnection}
            style={{ padding: '8px 12px', fontSize: '12px' }}
          >
            Testar Conexão
          </button>
        </div>
        <small>URL onde o backend está rodando (ex: http://localhost:3000)</small>
      </div>

      <div className="form-group">
        <label>Token de Autenticação:</label>
        <input
          type="password"
          value={config.token}
          disabled
          style={{ backgroundColor: '#f5f5f5', color: '#666' }}
          placeholder="Token bloqueado"
        />
        <small style={{ color: '#666' }}>Token fixo configurado no sistema</small>
      </div>

      <div className="form-group">
        <label>Endpoint da API Externa:</label>
        <input
          type="url"
          value={config.endpoint}
          disabled
          style={{ backgroundColor: '#f5f5f5', color: '#666' }}
          placeholder="Endpoint bloqueado"
        />
        <small style={{ color: '#666' }}>Endpoint fixo configurado no sistema</small>
      </div>

      <div className="form-group">
        <label>Chave Externa:</label>
        <input
          type="text"
          value={config.externalKey}
          onChange={(e) => handleConfigChange('externalKey', e.target.value)}
          placeholder="Chave externa para identificação"
        />
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            checked={config.isClosed}
            onChange={(e) => handleConfigChange('isClosed', e.target.checked)}
          />
          Conversa Fechada
        </label>
      </div>

      <div className="form-group">
        <label>Intervalo entre mensagens (segundos):</label>
        <input
          type="number"
          min="1"
          max="60"
          value={config.intervalSeconds}
          onChange={(e) => handleConfigChange('intervalSeconds', parseInt(e.target.value))}
        />
      </div>

      <div className="form-group">
        <label>Arquivo CSV:</label>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="file-input"
          id="csvFile"
        />
        <label htmlFor="csvFile" className="file-input-label">
          Selecionar arquivo CSV
        </label>
      </div>

      {csvData.length > 0 && (
        <div className="form-group">
          <label>Preview dos dados ({csvData.length} registros):</label>
          <div className="preview-table">
            <table className="table">
              <thead>
                <tr>
                  {Object.keys(csvData[0] || {}).map(key => (
                    <th key={key}>{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {csvData.slice(0, 5).map((row, index) => (
                  <tr key={index}>
                    {Object.values(row).map((value, i) => (
                      <td key={i}>{value}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            {csvData.length > 5 && (
              <p>... e mais {csvData.length - 5} registros</p>
            )}
          </div>
        </div>
      )}

      <div className="form-group">
        {!isRunning ? (
          <button 
            className="btn btn-success" 
            onClick={handleStartDispatch}
            disabled={csvData.length === 0}
          >
            Iniciar Disparo
          </button>
        ) : (
          <button 
            className="btn btn-danger" 
            onClick={handleStopDispatch}
          >
            Parar Disparo
          </button>
        )}
      </div>

      {isRunning && (
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
            <strong>Pendentes:</strong> {stats.pending}
          </div>
        </div>
      )}

      {logs.length > 0 && (
        <div className="form-group">
          <label>Logs em tempo real:</label>
          <div className="log-container">
            {logs.map((log, index) => (
              <div key={index} className={log.success ? 'success' : 'error'}>
                {new Date(log.timestamp).toLocaleTimeString()} - 
                {log.success ? '✅' : '❌'} {log.number} - 
                {log.messageType} {log.hasImage ? '(com imagem)' : ''}
                {!log.success && ` - ${log.error}`}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SendPage 
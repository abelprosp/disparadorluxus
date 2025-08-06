import React, { useState, useEffect } from 'react'

const ConfigPage = () => {
  const [config, setConfig] = useState({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6MTIsInByb2ZpbGUiOiJhZG1pbiIsInNlc3Npb25JZCI6NTYsImlhdCI6MTc0Nzc0Nzc2MiwiZXhwIjoxODEwODE5NzYyfQ.n04QYWLC-KAF3CGwIiSB1q0Aztk6AukAM9vdVS9eCYU',
    endpoint: 'https://api.mychatbot.awti.com.br/v2/api/external/f9e48b4d-cbd9-441d-a3e8-1529c1b1b530',
    externalKey: '',
    isClosed: true,
    intervalSeconds: 50
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

  const handleConfigChange = (field, value) => {
    const newConfig = {
      ...config,
      [field]: value
    }
    setConfig(newConfig)
    localStorage.setItem('dispatchConfig', JSON.stringify(newConfig))
  }

  const handleResetConfig = () => {
    if (confirm('Tem certeza que deseja resetar todas as configurações?')) {
      const defaultConfig = {
        token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6MTIsInByb2ZpbGUiOiJhZG1pbiIsInNlc3Npb25JZCI6NTYsImlhdCI6MTc0Nzc0Nzc2MiwiZXhwIjoxODEwODE5NzYyfQ.n04QYWLC-KAF3CGwIiSB1q0Aztk6AukAM9vdVS9eCYU',
        endpoint: 'https://api.mychatbot.awti.com.br/v2/api/external/f9e48b4d-cbd9-441d-a3e8-1529c1b1b530',
        externalKey: '',
        isClosed: true,
        intervalSeconds: 50
      }
      setConfig(defaultConfig)
      localStorage.setItem('dispatchConfig', JSON.stringify(defaultConfig))
    }
  }

  const handleExportConfig = () => {
    const configData = JSON.stringify(config, null, 2)
    const blob = new Blob([configData], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'dispatch-config.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleImportConfig = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const importedConfig = JSON.parse(e.target.result)
          // Manter token e endpoint fixos mesmo na importação
          const finalConfig = {
            ...importedConfig,
            token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRJZCI6MTIsInByb2ZpbGUiOiJhZG1pbiIsInNlc3Npb25JZCI6NTYsImlhdCI6MTc0Nzc0Nzc2MiwiZXhwIjoxODEwODE5NzYyfQ.n04QYWLC-KAF3CGwIiSB1q0Aztk6AukAM9vdVS9eCYU',
            endpoint: 'https://api.mychatbot.awti.com.br/v2/api/external/f9e48b4d-cbd9-441d-a3e8-1529c1b1b530'
          }
          setConfig(finalConfig)
          localStorage.setItem('dispatchConfig', JSON.stringify(finalConfig))
          alert('Configuração importada com sucesso!')
        } catch (error) {
          alert('Erro ao importar configuração: ' + error.message)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="container">
      <h2>Configurações</h2>
      
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
        <label>Endpoint da API:</label>
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
        <small>Identificador externo para rastrear as mensagens</small>
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
        <small>Se marcado, indica que a conversa deve ser fechada após o envio</small>
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
        <small>Tempo de espera entre o envio de cada mensagem</small>
      </div>

      <div className="form-group">
        <h3>Gerenciar Configurações</h3>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            className="btn btn-secondary" 
            onClick={handleExportConfig}
          >
            Exportar Configuração
          </button>
          
          <input
            type="file"
            accept=".json"
            onChange={handleImportConfig}
            className="file-input"
            id="importConfig"
          />
          <label htmlFor="importConfig" className="file-input-label">
            Importar Configuração
          </label>
          
          <button 
            className="btn btn-danger" 
            onClick={handleResetConfig}
          >
            Resetar Configuração
          </button>
        </div>
      </div>

      <div className="form-group">
        <h3>Informações sobre o CSV</h3>
        <p>O arquivo CSV deve conter as seguintes colunas:</p>
        <ul>
          <li><strong>number</strong>: Número do telefone (obrigatório)</li>
          <li><strong>text</strong>: Texto da mensagem (opcional)</li>
          <li><strong>image_url</strong>: URL da imagem (opcional)</li>
        </ul>
        <p>Exemplo de CSV:</p>
        <pre style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
{`number,text,image_url
5511999999999,Olá! Como vai?,https://exemplo.com/imagem.jpg
5511888888888,Segunda mensagem,`}
        </pre>
      </div>

      <div className="form-group">
        <h3>Configuração Atual</h3>
        <div style={{ background: '#f8f9fa', padding: '1rem', borderRadius: '4px' }}>
          <pre>{JSON.stringify(config, null, 2)}</pre>
        </div>
      </div>
    </div>
  )
}

export default ConfigPage 
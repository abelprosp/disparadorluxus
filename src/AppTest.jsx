import React, { useState } from 'react'
import SendPage from './components/SendPage'
import ConfigPage from './components/ConfigPage'
import LogsPage from './components/LogsPage'
import './App.css'

function AppTest() {
  console.log('AppTest component renderizando...')
  
  const [currentPage, setCurrentPage] = useState('send')

  const renderPage = () => {
    switch (currentPage) {
      case 'send':
        return <SendPage />
      case 'config':
        return <ConfigPage />
      case 'logs':
        return <LogsPage />
      default:
        return <SendPage />
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <h1>Sistema de Disparo WhatsApp (Teste)</h1>
          <div className="user-section">
            <span className="user-email">
              Modo Teste - Sem Autenticação
            </span>
          </div>
        </div>
      </header>

      <nav className="navigation">
        <button 
          className={`nav-btn ${currentPage === 'send' ? 'active' : ''}`}
          onClick={() => setCurrentPage('send')}
        >
          Enviar Mensagens
        </button>
        <button 
          className={`nav-btn ${currentPage === 'config' ? 'active' : ''}`}
          onClick={() => setCurrentPage('config')}
        >
          Configurações
        </button>
        <button 
          className={`nav-btn ${currentPage === 'logs' ? 'active' : ''}`}
          onClick={() => setCurrentPage('logs')}
        >
          Logs
        </button>
      </nav>

      <main className="main-content">
        {renderPage()}
      </main>
    </div>
  )
}

export default AppTest 
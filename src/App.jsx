import React, { useState } from 'react'
import { useAuth, SignOutButton } from '@clerk/clerk-react'
import SendPage from './components/SendPage'
import ConfigPage from './components/ConfigPage'
import LogsPage from './components/LogsPage'
import LoginPage from './components/LoginPage'
import './App.css'

function App() {
  console.log('App component renderizando...')
  
  const { isSignedIn, isLoaded, user } = useAuth()
  const [currentPage, setCurrentPage] = useState('send')

  console.log('Auth state:', { isSignedIn, isLoaded, user })

  if (!isLoaded) {
    console.log('Clerk ainda carregando...')
    return (
      <div className="loading">
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <h2>Carregando...</h2>
          <p>Inicializando sistema de autenticação</p>
        </div>
      </div>
    )
  }

  if (!isSignedIn) {
    console.log('Usuário não autenticado, mostrando login...')
    return <LoginPage />
  }

  console.log('Usuário autenticado, mostrando app...')

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
          <h1>Sistema de Disparo WhatsApp</h1>
          <div className="user-section">
            <span className="user-email">
              {user?.primaryEmailAddress?.emailAddress || 'Usuário'}
            </span>
            <SignOutButton className="btn btn-outline" />
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

export default App 
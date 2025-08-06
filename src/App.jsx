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
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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

  const handlePageChange = (page) => {
    setCurrentPage(page)
    setIsMenuOpen(false) // Fecha o menu ao trocar de página
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <div className="app">
      <div className="top-controls">
        <button 
          className={`hamburger-menu ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
          <div className="hamburger-line"></div>
        </button>
        <SignOutButton className="btn btn-outline" />
      </div>

      <nav className={`navigation ${isMenuOpen ? 'active' : ''}`}>
        <button 
          className={`nav-btn ${currentPage === 'send' ? 'active' : ''}`}
          onClick={() => handlePageChange('send')}
        >
          Enviar Mensagens
        </button>
        
        
        <button 
          className={`nav-btn ${currentPage === 'logs' ? 'active' : ''}`}
          onClick={() => handlePageChange('logs')}
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
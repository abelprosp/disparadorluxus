import React from 'react'
import ReactDOM from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'

// Chave pública do Clerk configurada
const CLERK_PUBLISHABLE_KEY = 'pk_test_aGVscGZ1bC1jYWxmLTg5LmNsZXJrLmFjY291bnRzLmRldiQ'

console.log('Iniciando aplicação com autenticação...')
console.log('Clerk Key:', CLERK_PUBLISHABLE_KEY)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={CLERK_PUBLISHABLE_KEY}>
      <App />
    </ClerkProvider>
  </React.StrictMode>,
) 
import React from 'react'
import ReactDOM from 'react-dom/client'
import AppTest from './AppTest.jsx'
import './index.css'

console.log('Iniciando aplicação de teste...')

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppTest />
  </React.StrictMode>,
) 
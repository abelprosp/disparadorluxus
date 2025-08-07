import React, { useState } from 'react'

const DocsPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeSection, setActiveSection] = useState('overview')

  // Dados da documentação
  const sections = {
    overview: {
      title: 'Visão Geral',
      icon: '📱',
      content: (
        <div>
          <h2>🎯 Visão Geral</h2>
          <p>Este sistema permite enviar mensagens em lote para WhatsApp através de um arquivo CSV. O sistema é seguro e possui autenticação integrada.</p>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3>Autenticação Segura</h3>
              <p>Login integrado com Clerk para máxima segurança</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Disparo em Lote</h3>
              <p>Envie centenas de mensagens através de arquivos CSV</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Monitoramento</h3>
              <p>Acompanhe o progresso em tempo real</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h3>Logs Detalhados</h3>
              <p>Histórico completo de todos os disparos</p>
            </div>
          </div>
        </div>
      )
    },
    login: {
      title: 'Login no Sistema',
      icon: '🔐',
      content: (
        <div>
          <h2>🔐 <strong>PASSO 1: Login no Sistema</strong></h2>
          <h3>Como Fazer Login:</h3>
          <ol>
            <li><strong>Acesse</strong> a aplicação no navegador</li>
            <li><strong>Clique</strong> em "Sign in" no canto superior direito</li>
            <li><strong>Escolha</strong> um método de login:
              <ul>
                <li>Email e senha</li>
                <li>Google</li>
                <li>Outros métodos disponíveis</li>
              </ul>
            </li>
            <li><strong>Complete</strong> o processo de autenticação</li>
          </ol>
        </div>
      )
    },
    csv: {
      title: 'Preparar CSV',
      icon: '📊',
      content: (
        <div>
          <h2>📊 <strong>PASSO 2: Preparar o Arquivo CSV</strong></h2>
          <h3>Estrutura do CSV:</h3>
          <p>O arquivo CSV deve conter as seguintes colunas:</p>
          <pre><code>numero,mensagem,imagem
5511999999999,Olá! Como posso ajudar?,https://exemplo.com/imagem.jpg
5511888888888,Boa tarde! Tudo bem?,https://exemplo.com/outra.jpg</code></pre>

          <h3>Colunas Obrigatórias:</h3>
          <ul>
            <li><strong>numero</strong>: Número do WhatsApp (com código do país)</li>
            <li><strong>mensagem</strong>: Texto da mensagem</li>
            <li><strong>imagem</strong>: URL da imagem (opcional)</li>
          </ul>

          <h3>Exemplo de CSV:</h3>
          <pre><code>numero,mensagem,imagem
5511999999999,Olá! Bem-vindo ao nosso sistema.,https://exemplo.com/welcome.jpg
5511888888888,Obrigado por escolher nossos serviços.,https://exemplo.com/thanks.jpg
5511777777777,Promoção especial para você!,https://exemplo.com/promo.jpg</code></pre>

          <h3>⚠️ <strong>Dicas Importantes:</strong></h3>
          <ul>
            <li>✅ Use números com código do país (ex: 5511999999999)</li>
            <li>✅ Separe as colunas com vírgula</li>
            <li>✅ Use aspas se o texto contiver vírgulas</li>
            <li>✅ URLs de imagem devem ser públicas e acessíveis</li>
          </ul>
        </div>
      )
    },
    config: {
      title: 'Configurar Disparo',
      icon: '⚙️',
      content: (
        <div>
          <h2>🚀 <strong>PASSO 3: Configurar o Disparo</strong></h2>
          <h3>3.1 Acessar a Página de Envio:</h3>
          <ol>
            <li><strong>Faça login</strong> no sistema</li>
            <li><strong>Clique</strong> em "Enviar Mensagens" no menu</li>
            <li><strong>Verifique</strong> se a URL do backend está correta (automática)</li>
          </ol>

          <h3>3.2 Configurar Chave Externa:</h3>
          <ol>
            <li><strong>Localize</strong> o campo "Chave Externa"</li>
            <li><strong>Digite</strong>: <code>123</code> (valor padrão)</li>
            <li><strong>Esta chave</strong> identifica o disparo no sistema</li>
          </ol>

          <h3>3.3 Configurar Opções:</h3>
          <ul>
            <li><strong>✅ Conversa Fechada</strong>: Mantenha marcado (padrão)</li>
            <li><strong>⏱️ Intervalo</strong>: 50 segundos (padrão)
              <ul>
                <li>Ajuste conforme necessário (1-60 segundos)</li>
              </ul>
            </li>
          </ul>
        </div>
      )
    },
    upload: {
      title: 'Carregar CSV',
      icon: '📁',
      content: (
        <div>
          <h2>📁 <strong>PASSO 4: Carregar o Arquivo CSV</strong></h2>
          <h3>Como Fazer Upload:</h3>
          <ol>
            <li><strong>Clique</strong> em "Selecionar arquivo CSV"</li>
            <li><strong>Escolha</strong> seu arquivo CSV</li>
            <li><strong>Aguarde</strong> o carregamento</li>
            <li><strong>Verifique</strong> o preview dos dados</li>
          </ol>

          <h3>✅ Verificações Importantes:</h3>
          <ul>
            <li>[ ] Arquivo carregado com sucesso</li>
            <li>[ ] Preview mostra os dados corretos</li>
            <li>[ ] Números estão no formato correto</li>
            <li>[ ] Mensagens estão completas</li>
          </ul>
        </div>
      )
    },
    test: {
      title: 'Testar Conexão',
      icon: '🔧',
      content: (
        <div>
          <h2>🔧 <strong>PASSO 5: Testar Conexão</strong></h2>
          <h3>Antes de Disparar:</h3>
          <ol>
            <li><strong>Clique</strong> em "Testar Conexão"</li>
            <li><strong>Aguarde</strong> a resposta</li>
            <li><strong>Confirme</strong> que aparece: "✅ Backend conectado com sucesso!"</li>
          </ol>

          <h3>⚠️ Se Der Erro:</h3>
          <ul>
            <li>Verifique sua conexão com a internet</li>
            <li>Aguarde alguns minutos e tente novamente</li>
            <li>Entre em contato com o suporte se persistir</li>
          </ul>
        </div>
      )
    },
    dispatch: {
      title: 'Iniciar Disparo',
      icon: '🎯',
      content: (
        <div>
          <h2>🎯 <strong>PASSO 6: Iniciar o Disparo</strong></h2>
          <h3>Como Disparar:</h3>
          <ol>
            <li><strong>Verifique</strong> todas as configurações</li>
            <li><strong>Clique</strong> em "Iniciar Disparo"</li>
            <li><strong>Aguarde</strong> a confirmação do sistema</li>
            <li><strong>Monitore</strong> o progresso em tempo real</li>
          </ol>

          <h3>📊 <strong>Monitoramento em Tempo Real:</strong></h3>
          <h4>Estatísticas Visíveis:</h4>
          <ul>
            <li><strong>📊 Total</strong>: Número total de mensagens</li>
            <li><strong>✅ Enviados</strong>: Mensagens enviadas com sucesso</li>
            <li><strong>❌ Falhas</strong>: Mensagens que falharam</li>
            <li><strong>⏳ Pendentes</strong>: Mensagens aguardando envio</li>
          </ul>

          <h4>Logs Detalhados:</h4>
          <pre><code>14:30:25 - ✅ 5511999999999 - Texto (com imagem)
14:30:27 - ✅ 5511888888888 - Texto
14:30:29 - ❌ 5511777777777 - Erro: Número inválido</code></pre>
        </div>
      )
    },
    manage: {
      title: 'Gerenciar Disparo',
      icon: '⏸️',
      content: (
        <div>
          <h2>⏸️ <strong>PASSO 7: Gerenciar o Disparo</strong></h2>
          <h3>Durante o Disparo:</h3>
          <ul>
            <li><strong>📊 Acompanhe</strong> as estatísticas em tempo real</li>
            <li><strong>📝 Monitore</strong> os logs de cada mensagem</li>
            <li><strong>⏸️ Pause</strong> se necessário (botão "Parar Disparo")</li>
          </ul>

          <h3>Após o Disparo:</h3>
          <ul>
            <li><strong>✅ Verifique</strong> o resumo final</li>
            <li><strong>📋 Anote</strong> as estatísticas</li>
            <li><strong>🔄 Prepare</strong> próximo disparo se necessário</li>
          </ul>
        </div>
      )
    },
    logs: {
      title: 'Verificar Logs',
      icon: '🔍',
      content: (
        <div>
          <h2>🔍 <strong>PASSO 8: Verificar Logs</strong></h2>
          <h3>Acessar Logs:</h3>
          <ol>
            <li><strong>Clique</strong> em "Logs" no menu</li>
            <li><strong>Visualize</strong> histórico completo</li>
            <li><strong>Filtre</strong> por data se necessário</li>
          </ol>

          <h3>Informações nos Logs:</h3>
          <ul>
            <li><strong>📅 Data e hora</strong> de cada envio</li>
            <li><strong>📱 Número</strong> de destino</li>
            <li><strong>💬 Tipo</strong> de mensagem (texto/imagem)</li>
            <li><strong>✅ Status</strong> (sucesso/falha)</li>
            <li><strong>❌ Erro</strong> (se houver)</li>
          </ul>
        </div>
      )
    },
    problems: {
      title: 'Problemas Comuns',
      icon: '⚠️',
      content: (
        <div>
          <h2>⚠️ <strong>PROBLEMAS COMUNS E SOLUÇÕES</strong></h2>
          
          <h3>❌ <strong>Erro: "Arquivo CSV inválido"</strong></h3>
          <p><strong>Solução:</strong></p>
          <ul>
            <li>Verifique se o arquivo tem as colunas corretas</li>
            <li>Confirme se está salvo como CSV</li>
            <li>Teste com um arquivo menor</li>
          </ul>

          <h3>❌ <strong>Erro: "Número inválido"</strong></h3>
          <p><strong>Solução:</strong></p>
          <ul>
            <li>Use formato: 5511999999999 (com código do país)</li>
            <li>Remova espaços e caracteres especiais</li>
            <li>Verifique se o número existe no WhatsApp</li>
          </ul>

          <h3>❌ <strong>Erro: "Falha no envio"</strong></h3>
          <p><strong>Solução:</strong></p>
          <ul>
            <li>Verifique a conexão com a internet</li>
            <li>Aguarde alguns minutos e tente novamente</li>
            <li>Confirme se o token está válido</li>
          </ul>

          <h3>❌ <strong>Erro: "Backend não conectado"</strong></h3>
          <p><strong>Solução:</strong></p>
          <ul>
            <li>Clique em "Testar Conexão"</li>
            <li>Aguarde alguns minutos</li>
            <li>Recarregue a página se necessário</li>
          </ul>
        </div>
      )
    },
    checklist: {
      title: 'Checklist Rápido',
      icon: '📋',
      content: (
        <div>
          <h2>📋 <strong>CHECKLIST RÁPIDO</strong></h2>
          
          <h3>Antes de Disparar:</h3>
          <ul>
            <li>[ ] ✅ Logado no sistema</li>
            <li>[ ] 📁 CSV preparado corretamente</li>
            <li>[ ] 🔑 Chave externa configurada (123)</li>
            <li>[ ] ⚙️ Configurações verificadas</li>
            <li>[ ] 🔧 Conexão testada</li>
            <li>[ ] 📊 Preview dos dados correto</li>
          </ul>

          <h3>Durante o Disparo:</h3>
          <ul>
            <li>[ ] 📊 Monitorando estatísticas</li>
            <li>[ ] 📝 Verificando logs</li>
            <li>[ ] ⏸️ Pronto para pausar se necessário</li>
          </ul>

          <h3>Após o Disparo:</h3>
          <ul>
            <li>[ ] ✅ Verificado resumo final</li>
            <li>[ ] 📋 Anotado estatísticas</li>
            <li>[ ] 🧹 Preparado para próximo disparo</li>
          </ul>
        </div>
      )
    },
    support: {
      title: 'Suporte',
      icon: '🆘',
      content: (
        <div>
          <h2>🆘 <strong>SUPORTE</strong></h2>
          <h3>Em Caso de Problemas:</h3>
          <ol>
            <li><strong>Verifique</strong> este manual</li>
            <li><strong>Teste</strong> com arquivo menor</li>
            <li><strong>Entre em contato</strong> com o suporte técnico</li>
          </ol>

          <h3>Informações para Suporte:</h3>
          <ul>
            <li>Data e hora do problema</li>
            <li>Erro exato que apareceu</li>
            <li>Arquivo CSV usado (sem dados sensíveis)</li>
            <li>Configurações aplicadas</li>
          </ul>
        </div>
      )
    },
    tips: {
      title: 'Dicas Finais',
      icon: '🎉',
      content: (
        <div>
          <h2>🎉 <strong>DICAS FINAIS</strong></h2>
          
          <h3>✅ <strong>Para Melhor Performance:</strong></h3>
          <ul>
            <li>Use arquivos CSV com até 1000 registros por vez</li>
            <li>Mantenha intervalos de 30-60 segundos</li>
            <li>Monitore sempre os logs durante o disparo</li>
            <li>Faça backup dos arquivos CSV importantes</li>
          </ul>

          <h3>🔒 <strong>Segurança:</strong></h3>
          <ul>
            <li>Nunca compartilhe suas credenciais</li>
            <li>Use sempre logout ao terminar</li>
            <li>Mantenha os arquivos CSV seguros</li>
            <li>Não exponha dados sensíveis</li>
          </ul>
        </div>
      )
    }
  }

  // Função para extrair texto do JSX
  const extractTextFromJSX = (jsx) => {
    if (typeof jsx === 'string') return jsx
    if (typeof jsx === 'object' && jsx.props && jsx.props.children) {
      if (Array.isArray(jsx.props.children)) {
        return jsx.props.children.map(extractTextFromJSX).join(' ')
      }
      return extractTextFromJSX(jsx.props.children)
    }
    return ''
  }

  // Filtrar seções baseado na busca
  const filteredSections = Object.entries(sections).filter(([key, section]) => {
    const titleMatch = section.title.toLowerCase().includes(searchTerm.toLowerCase())
    const contentText = extractTextFromJSX(section.content).toLowerCase()
    const contentMatch = contentText.includes(searchTerm.toLowerCase())
    return titleMatch || contentMatch
  })

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'f' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      document.getElementById('search-input').focus()
    }
  }

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeyPress)
    return () => document.removeEventListener('keydown', handleKeyPress)
  }, [])

  return (
    <div className="docs-layout">
      {/* Sidebar */}
      <aside className="docs-sidebar">
        <div className="sidebar-header">
          <div className="docs-title">
            <span className="docs-icon">📚</span>
            <div>
              <h3>Documentação</h3>
              <span className="version">v1.0.0</span>
            </div>
          </div>
        </div>

        <div className="search-container">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input
              id="search-input"
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <span className="search-shortcut">F</span>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <h4>Menu</h4>
            {filteredSections.map(([key, section]) => (
              <button
                key={key}
                className={`nav-item ${activeSection === key ? 'active' : ''}`}
                onClick={() => setActiveSection(key)}
              >
                <span className="nav-icon">{section.icon}</span>
                <span className="nav-text">{section.title}</span>
                <span className="nav-arrow">→</span>
              </button>
            ))}
          </div>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="docs-main">
        <div className="breadcrumb">
          <span>Sistema de Disparo</span>
          <span>→</span>
          <span>{sections[activeSection]?.title}</span>
        </div>

        <div className="docs-content">
          <h1>{sections[activeSection]?.title}</h1>
          <p className="docs-intro">
            Este site é projetado para ajudá-lo a aproveitar ao máximo o sistema de disparo de mensagens. 
            Aqui você encontrará uma coleção de artigos e tutoriais cobrindo todos os aspectos das funcionalidades.
          </p>

          {sections[activeSection]?.content}
        </div>
      </main>
    </div>
  )
}

export default DocsPage

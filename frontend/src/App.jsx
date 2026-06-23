import { useState, useEffect } from 'react'
import LoginForm from './pages/Login'
import CadastroForm from './pages/Cadastro'
import './App.css'

function App() {
  const [user, setUser] = useState(null) // Começa como null (ninguém logado)
  const [screen, setScreen] = useState('login') // FORÇA começar estritamente na tela de 'login'
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')
  const [novoProduto, setNovoProduto] = useState('')

  // Função para buscar as frutas do banco de dados
  const carregarTarefas = async () => {
    try {
      const response = await fetch('http://localhost:3000/tasks')
      const data = await response.json()
      
      if (Array.isArray(data)) {
        setTasks(data)
        setError('')
      } else {
        setError('Erro: O retorno da API não é um array.')
      }
    } catch (err) {
      setError('Não foi possível conectar ao banco de dados.')
    }
  }

  // Essa função roda AUTOMATICAMENTE sempre que o usuário muda de tela
  useEffect(() => {
    if (screen === 'dashboard' && user) {
      carregarTarefas() // Só puxa os dados do banco se estiver logado na dashboard!
    }
  }, [screen, user])

  // Acionada pelo Login.jsx quando o e-mail e senha batem no banco
  const handleLoginSuccess = (usuarioLogado) => {
    setUser(usuarioLogado)
    setScreen('dashboard') // AGORA SIM, vai para a lista de produtos
  }

  // Adicionar produto (Apenas Admin)
  const adicionarProduto = async (e) => {
    e.preventDefault()
    if (!novoProduto.trim()) return

    try {
      const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'user-role': user?.role 
        },
        body: JSON.stringify({ title: novoProduto })
      })

      if (response.ok) {
        setNovoProduto('')
        carregarTarefas()
      } else {
        const data = await response.json()
        setError(data.error || 'Erro ao adicionar produto.')
      }
    } catch (err) {
      setError('Erro ao se conectar com o servidor.')
    }
  }

  // Excluir produto (Apenas Admin)
  const excluirProduto = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: 'DELETE',
        headers: { 'user-role': user?.role }
      })

      if (response.ok) {
        carregarTarefas()
      }
    } catch (err) {
      setError('Erro ao tentar excluir item.')
    }
  }

  // --- REGRA DE OURO DA RENDERIZAÇÃO CONDICIONAL ---
  
  // 1ª Trava: Se a tela ativa for 'login', renderiza o formulário de login
  if (screen === 'login') {
    return (
      <LoginForm 
        onLoginSuccess={handleLoginSuccess} 
        onSwitchToCadastro={() => setScreen('cadastro')} 
      />
    )
  }

  // 2ª Trava: Se clicar para se cadastrar, renderiza a tela de cadastro
  if (screen === 'cadastro') {
    return (
      <CadastroForm 
        onCadastroSuccess={() => setScreen('login')} 
        onSwitchToLogin={() => setScreen('login')} 
      />
    )
  }

  // 3ª Proteção Total: Se tentar burlar e acessar a dashboard sem usuário, joga de volta pro login
  if (screen === 'dashboard' && !user) {
    return <LoginForm onLoginSuccess={handleLoginSuccess} onSwitchToCadastro={() => setScreen('cadastro')} />
  }

  // 4ª Tela: Se passou por tudo e está autenticado, carrega a lista de produtos da Quitanda!
  return (
    <div className="quitanda-container">
      <h1 className="quitanda-title">🏪 Sistema Quitanda - Controle de Estoque</h1>
      
      {/* Barra superior de Perfil do Usuário */}
      <div style={styles.perfilBar}>
        <div style={{ textAlign: 'left' }}>
          <p style={{ margin: 0, fontSize: '15px' }}>Usuário: <strong>{user?.name}</strong></p>
          <p style={{ margin: 0, fontSize: '13px' }}>
            Nível: <span style={{ color: user?.role === 'admin' ? '#d32f2f' : '#2e7d32', fontWeight: 'bold' }}>
              {user?.role?.toUpperCase()}
            </span>
          </p>
        </div>
        <button 
          onClick={() => { setUser(null); setScreen('login'); setTasks([]); }} 
          style={styles.btnSair}
        >
          Sair / Logoff
        </button>
      </div>

      {/* Painel Administrativo Dinâmico */}
      {user?.role === 'admin' ? (
        <div style={styles.painelAdmin}>
          <h3 style={{ margin: '0 0 12px 0', color: '#1b5e20', fontSize: '16px' }}>🛠️ Cadastrar Novo Item no Estoque</h3>
          <form onSubmit={adicionarProduto} style={{ display: 'flex', gap: '10px' }}>
            <input 
              style={styles.adminInput}
              type="text" 
              placeholder="Nome da fruta ou produto" 
              value={novoProduto} 
              onChange={e => setNovoProduto(e.target.value)}
            />
            <button className="quitanda-button" type="submit" style={{ padding: '0 20px', height: '38px', margin: 0 }}>
              Adicionar
            </button>
          </form>
        </div>
      ) : (
        <div style={styles.avisoUser}>
          👀 Você está no modo de <strong>Visualização de Estoque</strong> (Apenas Leitura).
        </div>
      )}

      {error && <p className="quitanda-error" style={{ textAlign: 'center' }}>{error}</p>}

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '20px 0 10px' }}>
        <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>🛒 Vitrine de Produtos</h3>
        <button className="quitanda-button" id="btn-carregar" onClick={carregarTarefas} style={{ padding: '6px 14px', fontSize: '13px', margin: 0 }}>
          Sincronizar Banco
        </button>
      </div>

      <ul className="quitanda-list" id="lista-tarefas" style={{ padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} className="product-card task-item" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span className="badge-id">#ID {task.id}</span>
              <span className="product-name">
                <strong>Produto:</strong> {task.title || task.name}
              </span>
            </div>
            
            {user?.role === 'admin' && (
              <button onClick={() => excluirProduto(task.id)} style={styles.btnExcluir}>
                Excluir
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

const styles = {
  perfilBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background: '#f4f7f5',
    padding: '12px 16px',
    borderRadius: '10px',
    marginBottom: '20px',
    border: '1px solid #e0ebd3',
    fontFamily: 'sans-serif'
  },
  btnSair: {
    background: '#dc2626',
    color: 'white',
    border: 'none',
    padding: '8px 14px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '13px'
  },
  painelAdmin: {
    background: '#f9fbf9',
    border: '2px dashed #2e7d32',
    padding: '16px',
    borderRadius: '12px',
    marginBottom: '20px',
    fontFamily: 'sans-serif'
  },
  adminInput: {
    flex: 1,
    height: '38px',
    padding: '0 12px',
    fontSize: '14px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    outline: 'none'
  },
  avisoUser: {
    background: '#e8f5e9',
    color: '#1b5e20',
    padding: '12px',
    borderRadius: '8px',
    marginBottom: '20px',
    fontSize: '14px',
    textAlign: 'center',
    fontFamily: 'sans-serif'
  },
  btnExcluir: {
    background: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '13px',
    fontWeight: '500'
  }
}

export default App
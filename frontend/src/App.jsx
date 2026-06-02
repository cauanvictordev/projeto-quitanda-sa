import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')

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
      setError('Não foi possível conectar ao backend.')
    }
  }

  return (
    <div className="quitanda-container">
      <h1 className="quitanda-title">🏪 Sistema Quitanda - Controle de Estoque</h1>
      
      <button className="quitanda-button" id="btn-carregar" onClick={carregarTarefas}>
        Listar Produtos / Frutas
      </button>

      {error && <p className="quitanda-error">{error}</p>}

      <ul className="quitanda-list" id="lista-tarefas">
        {tasks.map((task) => (
          <li key={task.id} className="product-card task-item">
            <span className="badge-id">#ID {task.id}</span>
            <span className="product-name">
              <strong>Produto:</strong> {task.title || task.name}
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
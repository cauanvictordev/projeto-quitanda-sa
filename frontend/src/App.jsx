import { useState } from 'react'
import './App.css'

function App() {
  const [tasks, setTasks] = useState([])
  const [error, setError] = useState('')

  // Função que busca as tarefas do seu Backend (id e titulo)
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
    <div style={{ padding: '40px', fontFamily: 'sans-serif' }}>
      <h1>📋 Gerenciador de Tarefas</h1>
      
      {/* Botão que o professor pediu */}
      <button id="btn-carregar" onClick={carregarTarefas} style={{ padding: '10px 20px', cursor: 'pointer' }}>
        Carregar Tarefas
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Lista <li> contendo apenas ID e Nome/Título da tarefa */}
      <ul id="lista-tarefas" style={{ marginTop: '20px', textAlign: 'left' }}>
        {tasks.map((task) => (
          <li key={task.id} className="task-item" style={{ padding: '5px 0' }}>
            <strong>ID:</strong> {task.id} | <strong>Tarefa:</strong> {task.title || task.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
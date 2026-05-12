import { useState } from 'react'
import './App.css'

function App() {
  // Estados para controlar o formulário (RF01)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = (e) => {
    e.preventDefault()
    
    // Lógica baseada nos seus Casos de Teste (CT02 e CT03)
    if (!name) {
      setMessage("Erro: O nome do usuário é obrigatório.")
      return
    }
    if (Number(age) < 18) {
      setMessage("Erro: O usuário deve ser maior de idade.")
      return
    }

    setMessage(`Sucesso: Usuário ${name} cadastrado!`)
  }

  return (
    <div className="container">
      <header>
        <h1>🍎 Quitanda S.A.</h1>
        <p>Sistema de Gerenciamento de Usuários</p>
      </header>

      <section className="form-section">
        <h2>Cadastro de Usuário</h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Nome:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="Digite o nome completo"
            />
          </div>

          <div className="input-group">
            <label>Idade:</label>
            <input 
              type="number" 
              value={age} 
              onChange={(e) => setAge(e.target.value)} 
              placeholder="Ex: 20"
            />
          </div>

          <button type="submit" className="btn-save">Finalizar Cadastro</button>
        </form>

        {message && (
          <div className={`message ${message.includes('Erro') ? 'error' : 'success'}`}>
            {message}
          </div>
        )}
      </section>

      <footer>
        <p>Projeto Acadêmico - Estrutura /backend /frontend /documentos</p>
      </footer>
    </div>
  )
}

export default App
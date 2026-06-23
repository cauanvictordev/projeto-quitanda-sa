import { useState } from "react";

export default function CadastroForm({ onCadastroSuccess, onSwitchToLogin }) {
  const [form, setForm] = useState({ nome: "", email: "", senha: "", idade: "", role: "user" });
  const [termos, setTermos] = useState(false);
  const [error, setError] = useState("");
  const [sucesso, setSucesso] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSucesso(false);

    if (!form.nome || !form.email || !form.senha || !form.idade) {
      setError("Preencha todos os campos obrigatórios.");
      return;
    }

    if (Number(form.idade) < 18) {
      setError("O banco de dados exige idade mínima de 18 anos.");
      return;
    }

    if (!termos) {
      setError("Aceite os termos para continuar.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nome,
          email: form.email,
          password: form.senha,
          age: Number(form.idade),
          role: form.role,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSucesso(true);
        setTimeout(() => {
          setSucesso(false);
          onCadastroSuccess(); // Joga o usuário para a tela de login
        }, 2500);
      } else {
        setError(data.error || "Erro ao realizar cadastro.");
      }
    } catch (err) {
      setError("Erro ao conectar com o back-end.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.titulo}>Criar conta</h2>
      <p style={styles.subtitulo}>Preencha os dados abaixo para se cadastrar.</p>

      {sucesso && <div style={styles.toast}>✓ Conta criada com sucesso! Redirecionando...</div>}
      {error && <div style={styles.errorToast}>⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label}>Nome</label>
          <input
            style={styles.input}
            type="text"
            name="nome"
            placeholder="Seu nome completo"
            value={form.nome}
            onChange={handleChange}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>E-mail</label>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="seu@email.com"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Senha</label>
          <input
            style={styles.input}
            type="password"
            name="senha"
            placeholder="Mínimo 6 dígitos"
            value={form.senha}
            onChange={handleChange}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Idade</label>
          <input
            style={styles.input}
            type="number"
            name="idade"
            placeholder="Ex: 21"
            value={form.idade}
            onChange={handleChange}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Nível de Acesso</label>
          <select style={styles.input} name="role" value={form.role} onChange={handleChange}>
            <option value="user">Cliente (Apenas Visualizar Estoque)</option>
            <option value="admin">Administrador (Poder de Edição)</option>
          </select>
        </div>

        <div style={styles.checkRow}>
          <input
            type="checkbox"
            id="termos"
            checked={termos}
            onChange={(e) => setTermos(e.target.checked)}
          />
          <label htmlFor="termos" style={styles.checkLabel}>
            Concordo com os termos de uso.
          </label>
        </div>

        <button style={styles.btnPrimary} type="submit">
          Criar conta
        </button>
      </form>

      <p style={styles.footerLink}>
        Já tem conta?{" "}
        <button style={styles.linkBtn} onClick={onSwitchToLogin}>
          Entrar
        </button>
      </p>
    </div>
  );
}

const styles = {
  wrapper: {
    maxWidth: 420,
    margin: "2rem auto",
    padding: "2rem",
    background: "#fff",
    border: "1px solid #e5e5e5",
    borderRadius: 12,
    fontFamily: "sans-serif",
  },
  titulo: {
    fontSize: 20,
    fontWeight: 500,
    margin: "0 0 4px",
    color: "#111",
  },
  subtitulo: {
    fontSize: 14,
    color: "#666",
    margin: "0 0 1.5rem",
  },
  toast: {
    background: "#f0fdf4",
    color: "#166534",
    border: "1px solid #bbf7d0",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    marginBottom: "1rem",
  },
  errorToast: {
    background: "#fef2f2",
    color: "#991b1b",
    border: "1px solid #fee2e2",
    borderRadius: 8,
    padding: "10px 14px",
    fontSize: 13,
    marginBottom: "1rem",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: 6,
    marginBottom: "1rem",
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: "#555",
  },
  input: {
    height: 36,
    padding: "0 12px",
    fontSize: 14,
    border: "1px solid #ddd",
    borderRadius: 8,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    background: "#000000ff",
  },
  checkRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: 8,
    marginBottom: "0.75rem",
  },
  checkLabel: {
    fontSize: 13,
    color: "#555",
  },
  btnPrimary: {
    width: "100%",
    padding: "10px",
    fontSize: 14,
    fontWeight: 500,
    background: "#111",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    cursor: "pointer",
    marginTop: "0.5rem",
  },
  footerLink: {
    textAlign: "center",
    fontSize: 13,
    color: "#666",
    marginTop: "1rem",
  },
  linkBtn: {
    background: "none",
    border: "none",
    color: "#2563eb",
    textDecoration: "underline",
    cursor: "pointer",
    padding: 0,
    fontSize: 13,
  },
};
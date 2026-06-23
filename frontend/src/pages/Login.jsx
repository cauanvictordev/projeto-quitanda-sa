import { useState } from "react";

export default function LoginForm({ onLoginSuccess, onSwitchToCadastro }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Preencha todos os campos.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await response.json();

      if (response.ok) {
        onLoginSuccess(data); // Avisa o App.jsx que o login deu certo!
      } else {
        setError(data.error || "E-mail ou senha incorretos.");
      }
    } catch (err) {
      setError("Não foi possível conectar ao servidor.");
    }
  };

  return (
    <div style={styles.wrapper}>
      <h2 style={styles.titulo}>Acessar Conta</h2>
      <p style={styles.subtitulo}>Entre com suas credenciais da Quitanda.</p>

      {error && <div style={styles.errorToast}>⚠️ {error}</div>}

      <form onSubmit={handleSubmit}>
        <div style={styles.field}>
          <label style={styles.label}>E-mail</label>
          <input
            style={styles.input}
            type="email"
            placeholder="seu@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Senha</label>
          <input
            style={styles.input}
            type="password"
            placeholder="Sua senha secreta"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button style={styles.btnPrimary} type="submit">
          Entrar no Sistema
        </button>
      </form>

      <p style={styles.footerLink}>
        Não tem uma conta?{" "}
        <button style={styles.linkBtn} onClick={onSwitchToCadastro}>
          Cadastre-se aqui
        </button>
      </p>
    </div>
  );
}

// Reaproveitando o mesmo padrão visual que você usou
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
    color: "#2e7d32", // Verde temático hortifrúti
  },
  subtitulo: {
    fontSize: 14,
    color: "#666",
    margin: "0 0 1.5rem",
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
  },
  btnPrimary: {
    width: "100%",
    padding: "10px",
    fontSize: 14,
    fontWeight: 500,
    background: "#2e7d32",
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
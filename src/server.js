const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');

app.use(express.json());

// Rotas da API da Quitanda
app.use('/api', userRoutes);

// Rota raiz para verificação de status
app.get('/', (req, res) => {
  res.status(200).json({ message: "Quitanda SaaS online!" });
});

// Configuração da porta para o npm start
const PORT = 3000;
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`---`);
    console.log(`SISTEMA DE QUITANDA ONLINE`);
    console.log(`Servidor rodando em: http://localhost:${PORT}`);
    console.log(`---`);
  });
}

module.exports = app;
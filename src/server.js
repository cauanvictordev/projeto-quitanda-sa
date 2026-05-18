import express from 'express';
import taskRoutes from './routes/taskRoutes.js'; // Mudamos para ler tarefas

const PORT = 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("API de Gerenciamento de Tarefas - SA Rodando!");
});

// Registrar as rotas de tarefas no caminho /tasks
app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`API rodando em: http://localhost:${PORT}`);
});
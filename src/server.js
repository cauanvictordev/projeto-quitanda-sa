import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js'; 

const PORT = 3000;
const app = express();

app.use(cors()); 
app.use(express.json());

app.get("/", (req, res) => {
    res.send("API de Gerenciamento de Tarefas - SA Rodando!");
});

app.use('/tasks', taskRoutes);

app.listen(PORT, () => {
    console.log(`API rodando em: http://localhost:${PORT}`);
});
import express from 'express';
import cors from 'cors';
import taskRoutes from './routes/taskRoutes.js'; 

import { userService } from './services/userService.js';

const PORT = 3000;
const app = express();

// Middleware para liberar o acesso do React (CORS) e aceitar dados em formato JSON
app.use(cors()); 
app.use(express.json());

// Rota de teste inicial para verificar se o backend está vivo
app.get("/", (req, res) => {
    res.send("API da Quitanda - SA Rodando!");
});

// 🟢 INTEGRADO: Rota de cadastro de novos usuários
app.post("/users", async (req, res) => {
    try {
        const newUser = await userService.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 🟢 INTEGRADO: Rota de Autenticação/Login
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        // Valida as credenciais enviadas pelo formulário do React
        const user = await userService.login(email, password); 
        res.status(200).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rotas para controle do estoque de frutas e legumes
app.use('/tasks', taskRoutes);

// Inicialização do servidor na porta 3000
app.listen(PORT, () => {
    console.log(`\n🚀 ==========================================`);
    console.log(`   API da Quitanda rodando com sucesso!`);
    console.log(`   Endereço local: http://localhost:${PORT}`);
    console.log(`========================================== 🚀\n`);
});
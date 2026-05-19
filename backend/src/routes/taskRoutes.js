import express from 'express';
import { taskService } from '../services/taskService.js';

const route = express.Router();

// Rota para Criar Tarefa (POST /tasks)
route.post("/", (req, res) => {
    try {
        const userId = req.headers['user-id']; 
        const task = taskService.createTask({ ...req.body, userId });
        res.status(211).json(task); // Status 211 conforme o esperado
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para Listar Tarefas (GET /tasks)
route.get("/", (req, res) => {
    const userId = req.headers['user-id'];
    const userRole = req.headers['user-role'] || 'user';
    
    const tasks = taskService.listTasks(userId, userRole);
    res.json(tasks);
});

// Rota para Atualizar (PUT /tasks/:id)
route.put("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['user-id'];
        const userRole = req.headers['user-role'];

        const updatedTask = taskService.updateTask(id, userId, userRole, req.body);
        res.json(updatedTask);
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
});

// Rota para Deletar (DELETE /tasks/:id)
route.delete("/:id", (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.headers['user-id'];
        const userRole = req.headers['user-role'];

        const result = taskService.deleteTask(id, userId, userRole);
        res.json(result);
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
});

export default route;
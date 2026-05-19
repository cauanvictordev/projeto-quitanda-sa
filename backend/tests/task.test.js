import request from 'supertest';
import express from 'express';
import taskRoutes from '../src/routes/taskRoutes.js';

const app = express();
app.use(express.json());
app.use('/tasks', taskRoutes);

describe('Testes de Sistema - Gerenciamento de Tarefas (SA)', () => {

    test('Deve impedir a criação de tarefa com título em branco', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({
                title: '',
                description: 'Teste sem título',
                dueDate: '2026-12-31'
            })
            .set('user-id', 'user123');

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('O título da tarefa é obrigatório.');
    });

    test('Deve impedir a criação de tarefa com data no passado', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({
                title: 'Tarefa Atrasada',
                description: 'Teste data retroativa',
                dueDate: '2020-01-01' // Data no passado
            })
            .set('user-id', 'user123');

        expect(res.status).toBe(400);
        expect(res.body.error).toBe('A data de vencimento não pode ser no passado.');
    });

    test('Deve criar uma tarefa com sucesso usando dados válidos', async () => {
        const res = await request(app)
            .post('/tasks')
            .send({
                title: 'Entregar a SA de Testes',
                description: 'Projeto finalizado e testado',
                dueDate: '2026-12-31'
            })
            .set('user-id', 'user123');

        expect(res.status).toBe(211);
        expect(res.body.title).toBe('Entregar a SA de Testes');
        expect(res.body.status).toBe('pendente');
    });

    test('Deve permitir que usuário comum veja apenas suas próprias tarefas', async () => {
        const res = await request(app)
            .get('/tasks')
            .set('user-id', 'user123')
            .set('user-role', 'user');

        expect(res.status).toBe(200);
        expect(Array.isArray(res.body)).toBe(true);
    });
});
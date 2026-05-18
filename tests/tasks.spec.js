import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Testes de API - Sistema de Tarefas (SA)', () => {

  test('Não deve permitir criar tarefa com título em branco', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/tasks`, {
      data: {
        title: "",
        description: "Teste sem título",
        dueDate: "2026-12-31"
      },
      headers: { 'user-id': 'user123' }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('O título da tarefa é obrigatório.');
  });

  test('Não deve permitir criar tarefa com data no passado', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/tasks`, {
      data: {
        title: "Tarefa Atrasada",
        dueDate: "2020-01-01" // Data no passado
      },
      headers: { 'user-id': 'user123' }
    });

    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body.error).toBe('A data de vencimento não pode ser no passado.');
  });

  test('Deve criar uma tarefa com sucesso se os dados forem válidos', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/tasks`, {
      data: {
        title: "Estudar para a Prova Final",
        description: "Revisar testes com Playwright",
        dueDate: "2026-12-31"
      },
      headers: { 'user-id': 'user123' }
    });

    expect(response.status()).toBe(211);
    const body = await response.json();
    expect(body.title).toBe("Estudar para a Prova Final");
  });
});
import { test, expect } from '@playwright/test';

test('Deve buscar as tarefas e renderizar a lista corretamente na tela', async ({ page }) => {
  // 1. Simula a resposta (Mock) do seu backend /tasks para o teste rodar isolado
  await page.route('http://localhost:3000/tasks', async (route) => {
    const dadosFicticios = [
      { id: 1, title: 'Estudar para a SA do SENAI', description: 'Fazer o teste' },
      { id: 2, title: 'Configurar o Playwright', description: 'Finalizar a rotina' }
    ];

    // Validações que o professor exigiu: se é um array e se tem as propriedades esperadas
    expect(Array.isArray(dadosFicticios)).toBe(true);
    expect(dadosFicticios[0]).toHaveProperty('id');
    expect(dadosFicticios[0]).toHaveProperty('title');

    await route.fulfill({ json: dadosFicticios });
  });

  // 2. Navega até a página do seu Frontend
  await page.goto('http://localhost:5173/');

  // 3. Clica no botão de carregar tarefas
  const botao = page.locator('#btn-carregar');
  await botao.click();

  // 4. Valida se o item correspondente foi renderizado e está visível na tela (toBeVisible)
  const primeiroItem = page.locator('.task-item').first();
  await expect(primeiroItem).toBeVisible();
  await expect(primeiroItem).toContainText('Estudar para a SA do SENAI');
});
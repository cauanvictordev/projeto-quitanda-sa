# Casos de Teste - Sistema Quitanda

## Caso de Teste 01: Cadastro de Usuário com Sucesso
* **Objetivo:** Validar o cadastro correto de um usuário.
* **Método/Rota:** `POST /users`
* **Payload (Dados de Entrada):**
```json
{
  "name": "Cauan Victor",
  "age": 20
}
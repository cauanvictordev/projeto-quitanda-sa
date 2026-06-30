# Levantamento de Requisitos - Sistema Quitanda

## 1. Requisitos Funcionais (RF)
* **RF01 - Cadastro de Usuário:** O sistema deve permitir o cadastro de um usuário contendo nome (`name`) e idade (`age`).
* **RF02 - Validação de Idade:** O sistema deve validar se o usuário é maior ou igual a 18 anos. Caso seja menor, deve retornar uma mensagem de erro apropriada.
* **RF03 - Validação de Nome:** O sistema deve exigir o preenchimento obrigatório do campo nome.
* **RF04 - Interface com o Usuário:** O frontend (React) deve fornecer um formulário para envio dos dados e exibir o resultado da API.

## 2. Requisitos Não Funcionais (RNF)
* **RNF01 - Padrão de API:** O backend deve ser construído em Node.js usando Express, estruturado em camadas (Routes e Services).
* **RNF02 - Formato de Dados:** A comunicação entre cliente e servidor deve ser realizada exclusivamente em formato JSON.
* **RNF03 - Ambiente de Execução:** O projeto deve utilizar módulos ECMAScript (ESM - `import/export`).
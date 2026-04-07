// src/services/user.service.js

class QuitandaService {
  // Simula o cadastro de um produto (Fruta, Legume, Ovo)
  cadastrarProduto(produto) {
    if (!produto.nome || !produto.preco) {
      throw new Error("Nome e preço são obrigatórios.");
    }
    if (produto.preco <= 0) {
      throw new Error("O preço deve ser maior que zero.");
    }
    return { ...produto, id: 1, status: "cadastrado" };
  }
}

module.exports = new QuitandaService();
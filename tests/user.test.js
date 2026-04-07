const request = require('supertest');
const app = require('../src/server');
const quitandaService = require('../src/services/user.service');

describe('Conjunto de Testes - Sistema de Quitanda', () => {
  
  // Teste 1: Validação da Conexão (C4/C5)
  it('Deve retornar status 200 e mensagem de online na raiz', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toBe("Quitanda SaaS online!");
  });

  // Teste 2: Sucesso no Cadastro (Lógica de Negócio)
  it('Deve permitir o cadastro de uma fruta com nome e preço válidos', () => {
    const fruta = { nome: "Morango", preco: 12.50 };
    const resultado = quitandaService.cadastrarProduto(fruta);
    
    expect(resultado).toHaveProperty('id');
    expect(resultado.nome).toBe("Morango");
    expect(resultado.status).toBe("cadastrado");
  });

  // Teste 3: Identificação de Falha - Preço Inválido (C6/C8)
  it('Deve impedir o cadastro de produto com preço negativo', () => {
    const produtoInvalido = { nome: "Alface", preco: -1.0 };
    
    expect(() => {
      quitandaService.cadastrarProduto(produtoInvalido);
    }).toThrow("O preço deve ser maior que zero.");
  });

  // Teste 4: Identificação de Falha - Falta de dados (C6)
  it('Deve impedir o cadastro de produto sem nome', () => {
    const produtoSemNome = { preco: 5.0 };
    
    expect(() => {
      quitandaService.cadastrarProduto(produtoSemNome);
    }).toThrow("Nome e preço são obrigatórios.");
  });
});



class QuitandaService {
  cadastrarProduto(produto) {
    if (!produto.nome || !produto.preco) {
      throw new Error("Nome e preço são obrigatórios.");
    }
    if (produto.preco <= 0) {
      throw new Error("O preço deve ser maior que zero.");
    }
    return { 
      id: Math.floor(Math.random() * 1000), 
      ...produto, 
      status: "cadastrado" 
    };
  }
}

module.exports = new QuitandaService();
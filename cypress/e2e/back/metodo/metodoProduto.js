import { faker, tr } from "@faker-js/faker";

function criarProduto() {
  const produto = {
    "nome": faker.commerce.productName(),
    "preco": faker.number.int({ min: 0, max: 1000 }),
    "descricao": faker.commerce.productDescription(),
    "quantidade": faker.number.int({ min: 0, max: 1000 })
  }
  return produto;
}

function criarProdutoIgual() {
  const produto = {
    "nome": "fake",
    "preco": faker.number.int({ min: 0, max: 1000 }),
    "descricao": "fake",
    "quantidade": faker.number.int({ min: 0, max: 1000 })
  }
  return produto;
}

export default {
  criarProduto,
  criarProdutoIgual
}
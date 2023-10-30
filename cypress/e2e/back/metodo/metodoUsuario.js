import { faker, tr } from "@faker-js/faker";

function criarUsuarioADM() {
  const usuario = {
    "nome": faker.person.firstName(),
    "email": faker.internet.email(),
    "password": faker.internet.password(),
    "administrador": "true"
  }
  return usuario;
}

function criarUsuario() {
  const usuario = {
    "nome": faker.person.firstName(),
    "email": faker.internet.email(),
    "password": faker.internet.password(),
    "administrador": "false"
  }
  return usuario;
}

function emailIgual() {
  const usuario = {
    "nome": faker.person.firstName(),
    "email": "maicon@qa.com.br",
    "password": faker.internet.password(),
    "administrador": "false"
  }
  return usuario;
}

export default {
  criarUsuarioADM,
  criarUsuario,
  emailIgual
}
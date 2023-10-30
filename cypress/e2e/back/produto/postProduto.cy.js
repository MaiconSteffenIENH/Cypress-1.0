import 'cypress-plugin-api' // importa o plugin para usar o comando api
import metodoProduto from "../metodo/metodoProduto";
import http from '../util/status';

describe("API - POST [Produtos]", () => {

  it("POST - Realizar cadastro [rota exclusiva para administradores]", () => {
    var produto = metodoProduto.criarProduto();
    cy.fixture("user").as("Usuario").then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((response) => {
        cy.loginAPI(login.email, login.password).then((responseLogIn) => {
          cy.putProduto(responseLogIn.body._id, produto, responseLogIn.body.authorization).then((responseProduto) => {
            expect(responseProduto.status).to.eq(http.FORBIDDEN);
            expect(responseProduto.body.message).to.eq("Rota exclusiva para administradores");
          });
        });
      });
    });
  });

  it("POST - Realizar cadastro [token ausente]", () => {
    var produto = metodoProduto.criarProduto();
    cy.fixture("user").as("Usuario").then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((response) => {
        cy.loginAPI(login.email, login.password).then((responseLogIn) => {
          cy.putProduto(responseLogIn.body._id, produto).then((responseProduto) => {
            expect(responseProduto.status).to.eq(http.UNAUTHORIZED);
            expect(responseProduto.body.message).to.eq("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais");
          });
        });
      });
    });
  });


  // nao esta validando corretamente a mensagem de erro
  it("POST - Realizar cadastro [cadastro igual]", () => {
    var produtoUnico = metodoProduto.criarProduto();
    var produtoIgual = produtoUnico;
    cy.fixture("user").as("Usuario").then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {
        cy.postProduto(produtoUnico, responseLogIn.body.authorization).then((responseProduto) => {
          expect(responseProduto.status).to.eq(http.CREATED);

          cy.postProduto(produtoIgual, responseLogIn.body.authorization).then((responseProduto) => {
            expect(responseProduto.status).to.eq(http.BAD_REQUEST);
            expect(responseProduto.body.message).to.eq("Já existe produto com esse nome");
          });
        });
      });
    });
  });

  it("POST - Realizar cadastro [cadastro com sucesso]", () => {
    var produto = metodoProduto.criarProduto();
    cy.fixture("user").as("Usuario").then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {
        cy.postProduto(produto, responseLogIn.body.authorization).then((responseProduto) => {
          expect(responseProduto.body.message).to.eq("Cadastro realizado com sucesso");
          expect(responseProduto.body._id).not.to.be.null;
        });
      });
    })
  })
})




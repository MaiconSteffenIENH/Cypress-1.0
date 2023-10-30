import 'cypress-plugin-api' // importa o plugin para usar o comando api
import metodoProduto from "../metodo/metodoProduto";
import http from '../util/status';

describe("API - PUT [Produtos]", () => {

  it("PUT - Realizar cadastro [rota exclusiva para administradores]", () => {
    var produto = metodoProduto.criarProduto();
    cy.fixture('user').as('usuario').then((login) => {
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

  it("PUT - Realizar cadastro [token não informado]", () => {
    var produto = metodoProduto.criarProduto();
    cy.fixture('user').as('usuario').then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {
        cy.putProduto(responseLogIn.body._id, produto, "").then((responseProduto) => {
          expect(responseProduto.status).to.eq(http.UNAUTHORIZED);
          expect(responseProduto.body.message).to.eq("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais");
        });
      });
    });
  });

  it("POST - Realizar cadastro [cadastro com sucesso]", () => {
    var produto = metodoProduto.criarProduto();
    cy.fixture('user').as('usuario').then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {
        cy.postProduto(produto, responseLogIn.body.authorization).then((responseProduto) => {
          expect(responseProduto.body.message).to.eq("Cadastro realizado com sucesso");
          expect(responseProduto.body._id).not.to.be.null;
          cy.putProduto(responseProduto.body._id, produto, responseLogIn.body.authorization).then((responsePut) => {
            expect(responsePut.status).to.eq(http.OK);
            expect(responsePut.body.message).to.eq("Registro alterado com sucesso");
          });
        });
      });
    })
  })
})




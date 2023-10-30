import 'cypress-plugin-api' // importa o plugin para usar o comando api
import metodoProduto from "../metodo/metodoProduto";
import http from '../util/status';

describe("API - DELETE [Produtos]", () => {

  it("DELETE - Deletar por ID [token]", () => {
    var produto = metodoProduto.criarProduto();
    cy.fixture("user").as("Usuario").then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {
        cy.postProduto(produto, responseLogIn.body.authorization).then((responseProduto) => {
          expect(responseProduto.body.message).to.eq("Cadastro realizado com sucesso");
          expect(responseProduto.body._id).not.to.be.null;
          cy.deleteProdutoID(responseProduto.body._id, responseLogIn.body.authorization).then((responseDelete) => {
            expect(responseDelete.status).to.eq(http.OK);
            expect(responseDelete.body.message).to.eq("Registro excluído com sucesso");
          });
        });
      });
    });
  });

  it('DELETE - Deletar por ID [token ausente]', () => {
    var produto = metodoProduto.criarProduto();
    cy.fixture("user").as("Usuario").then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {
        cy.postProduto(produto, responseLogIn.body.authorization).then((responseProduto) => {
          expect(responseProduto.body.message).to.eq("Cadastro realizado com sucesso");
          expect(responseProduto.body._id).not.to.be.null;
          cy.deleteProdutoID(responseProduto.body._id).then((responseDelete) => {
            expect(responseDelete.status).to.eq(http.UNAUTHORIZED);
            expect(responseDelete.body.message).to.eq("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais");
          });
        });
      });
    });
  });

  // 
  it('DELETE - Deletar por ID [N/ADM]', () => {
    var produto = metodoProduto.criarProduto();
    cy.fixture("user").as("Usuario").then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {
        cy.postProduto(produto, responseLogIn.body.authorization).then((responseProduto) => {
          expect(responseProduto.body.message).to.eq("Cadastro realizado com sucesso");
          expect(responseProduto.body._id).not.to.be.null;
          cy.loginAPI(login.email, login.password).then((response) => {
            cy.deleteProdutoID(responseProduto.body._id, response.body.authorization).then((responseDelete) => {
              expect(responseDelete.status).to.eq(http.FORBIDDEN);
              expect(responseDelete.body.message).to.eq("Rota exclusiva para administradores");
            });
          });
        });
      });
    });
  });
});





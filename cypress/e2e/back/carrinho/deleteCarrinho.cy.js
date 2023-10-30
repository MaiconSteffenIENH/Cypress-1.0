import 'cypress-plugin-api' // importa o plugin para usar o comando api
import metodoProduto from "../metodo/metodoProduto";
import http from '../util/status';
import { faker } from '@faker-js/faker';


describe("API - DELETE [Carrinho]", () => {

  it("DELETE - Deletar carrinho [token ausente]", () => {
    cy.fixture('user').as('usuario').then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {
        cy.deleteCarrinho().then((response) => {
          expect(response.status).to.eq(http.UNAUTHORIZED);
          expect(response.body.message).to.eq("Token de acesso ausente, inválido, expirado ou usuário do token não existe mais");
        });
      });
    });
  });

  it("DELETE - Deletar carrinho [ID]", () => {
    var quantidade = faker.number.int({ min: 1, max: 10 });
    var produto = metodoProduto.criarProduto();
    cy.fixture('user').as('usuario').then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {

        cy.postProduto(produto, responseLogIn.body.authorization).then((responseProduto) => {
          expect(responseProduto.body.message).to.eq("Cadastro realizado com sucesso");
          expect(responseProduto.body._id).not.to.be.null;

          cy.postCarrinho(responseLogIn.body.authorization, responseProduto.body._id, quantidade).then((responseCarrinho) => {
            cy.deleteCarrinho(responseLogIn.body.authorization).then((responseDelete) => {
              expect(responseDelete.status).to.eq(http.OK);
              expect(responseDelete.body.message).to.eq("Registro excluído com sucesso. Estoque dos produtos reabastecido");
            });
          });
        });
      })
    })
  })
})






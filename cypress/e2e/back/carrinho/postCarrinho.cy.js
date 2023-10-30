import 'cypress-plugin-api' // importa o plugin para usar o comando api
import metodoProduto from "../metodo/metodoProduto";
import http from '../util/status';
import { faker } from '@faker-js/faker';


describe("API - POST [Carrinho]", () => {

  it("POST - Adicionar ao carrinho [ID]", () => {
    var quantidade = faker.number.int({ min: 1, max: 10 });
    var produto = metodoProduto.criarProduto();
    cy.fixture('user').as('usuario').then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {

        cy.postProduto(produto, responseLogIn.body.authorization).then((responseProduto) => {
          expect(responseProduto.body.message).to.eq("Cadastro realizado com sucesso");
          expect(responseProduto.body._id).not.to.be.null;

          cy.postCarrinho(responseLogIn.body.authorization, responseProduto.body._id, quantidade).then((responseCarrinho) => {
            expect(responseCarrinho.status).to.eq(http.CREATED);
            cy.deleteCarrinho(responseLogIn.body.authorization).then((responseDelete) => {
              expect(responseDelete.status).to.eq(http.OK);
            })
          });
        });
      })
    })
  })

  it('POST - Produto sem quantidade suficiente', () => {
    var produto = metodoProduto.criarProduto();
    var quantidade = -1;
    cy.fixture('user').as('usuario').then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {
        cy.postProduto(metodoProduto.criarProduto(), responseLogIn.body.authorization).then((responseProduto) => {
          cy.postCarrinho(responseLogIn.body.authorization, responseProduto.body._id, produto, quantidade).then((responseCarrinho) => {
            expect(responseCarrinho.status).to.eq(http.BAD_REQUEST);
            expect(responseCarrinho.body.message).to.eq("Quantidade solicitada fora de estoque");
          })
        })
      })
    })
  })





})
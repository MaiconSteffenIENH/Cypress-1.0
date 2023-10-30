import 'cypress-plugin-api' // importa o plugin para usar o comando api
import http from '../util/status';
import metodoProduto from "../metodo/metodoProduto";

describe("API - GET [Produtos]", () => {

  it("GET - Listar todos os produtos", () => {
    cy.getProduto().then((response) => {
      expect(response.status).to.eq(http.OK);
      expect(response.body).to.be.not.null;
    });
  });

  it("GET - Buscar por ID [token]", () => {
    var produto = metodoProduto.criarProduto();
    cy.fixture('user').as('usuario').then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {
        expect(responseLogIn.status).to.eq(http.OK);
        cy.postProduto(produto, responseLogIn.body.authorization).then((response) => {
          cy.getProdutoID(response.body._id).then((response) => {
            expect(response.status).to.eq(http.OK);
          })
        });
      });
    })
  })

  it("GET - Buscar por ID [invalido]", () => {
    cy.getProdutoID('BeeJh5lz3k6kSIzB').then((response) => {
      expect(response.status).to.eq(http.BAD_REQUEST);
    })
  });
})



import 'cypress-plugin-api' // importa o plugin para usar o comando api
import http from '../util/status';



describe("API - GET [Carrinho]", () => {
  it("GET - Listar carrinho [token ausente]", () => {
    cy.getCarrinho().then((response) => {
      expect(response.status).to.eq(http.OK);
      expect(response.body.message).be.not.null;
    });
  });
});

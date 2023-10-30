import 'cypress-plugin-api' // importa o plugin para usar o comando api
import metodoUsuario from "../metodo/metodoUsuario";
import http from '../util/status';

describe("API - PUT [Usuarios]", () => {



  it("PUT - cadastro com sucesso", () => {
    var usuario = metodoUsuario.criarUsuario();
    cy.api({
      method: 'PUT',
      url: '/usuarios/0uxuPY0cbmQhpEz2',
      body: usuario,
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(http.CREATED);
    });
  });
});

it("PUT - atualizar usuario [ADM -> N/ADM]", () => {
  var usuarioADM = metodoUsuario.criarUsuarioADM();
  cy.postUsuario(usuarioADM).then((response) => {
    expect(response.body.message).to.eq("Cadastro realizado com sucesso")

    var usuario = metodoUsuario.criarUsuario();
    cy.putUsuarioID(response.body._id, usuario).then((responsePUT) => {
      expect(responsePUT.body.message).to.eq("Registro alterado com sucesso")

      cy.getUsuarioID(response.body._id).then((response) => {
        expect(response.body.nome).to.be.not.equal(usuarioADM.nome)
      })
    });
  });
});





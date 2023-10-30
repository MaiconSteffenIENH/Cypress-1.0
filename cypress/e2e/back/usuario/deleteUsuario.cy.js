import 'cypress-plugin-api' // importa o plugin para usar o comando api
import metodoUsuario from "../metodo/metodoUsuario";
import http from '../util/status';


describe("API - DELETE [Usuarios]", () => {

  it("DELETE - Deletar usuario [ID]", () => {
    var usuario = metodoUsuario.criarUsuario();
    cy.postUsuario(usuario).then((response) => {

      cy.deleteUsuarioID(response.body._id).then((responseDelete) => {
        expect(responseDelete.status).to.eq(http.OK);
        expect(responseDelete.body.message).to.eq("Registro excluído com sucesso")

      });
    });
  })
})



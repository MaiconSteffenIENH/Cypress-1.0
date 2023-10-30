import 'cypress-plugin-api' // importa o plugin para usar o comando api
import metodoUsuario from "../metodo/metodoUsuario";
import http from '../util/status';


describe("API - GET [Usuarios]", () => {

  it("GET - Listar todos os usuários", () => {
    cy.getUsuarios().then((response) => {
      expect(response.status).to.eq(http.OK);
      expect(response.body).to.be.not.null;
    });
  });

  it("GET - Buscar usuario [ID]", () => {
    var usuario = metodoUsuario.criarUsuario();
    cy.postUsuario(usuario).then((response) => {
      cy.getUsuarioID(response.body._id).then((response) => {
        expect(response.status).to.eq(http.OK);
      })
    });
  });

  it("GET - Buscar usuario [ID]", () => {
    var usuario = metodoUsuario.criarUsuario();
    cy.postUsuario(usuario).then((response) => {
      cy.getUsuarioID(response.body._id).then((response) => {
        expect(response.status).to.eq(http.OK);
      })
    });
  });

  it("GET - Buscar usuario [ID]", () => {
    cy.getUsuarioID('0uxuPY0cbmQhpEz2').then((response) => {
      expect(response.status).to.eq(http.BAD_REQUEST);
    })
  });
});




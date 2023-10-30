import 'cypress-plugin-api' // importa o plugin para usar o comando api
import metodoUsuario from "../metodo/metodoUsuario";
import http from '../util/status';


describe("API - POST [Usuarios]", () => {


  it("POST - Realizar login [dados corretos]", () => {
    cy.fixture("user").as("Usuario").then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogIn) => {
        expect(responseLogIn.status).to.eq(http.OK);
        expect(responseLogIn.body.message).to.eq("Login realizado com sucesso");
      });
    })
  });

  it("POST - Realizar login [dados incorretos]", () => {
    cy.fixture("user").as("Usuario").then((login) => {
      cy.loginAPI(login.emailIncorreto, login.passwordIncorreto).then((responseLogIn) => {
        expect(responseLogIn.status).to.eq(http.UNAUTHORIZED);
        expect(responseLogIn.body.message).to.eq("Email e/ou senha inválidos");
      });
    })
  });

  it("POST - cadastrar usuario [ADM]", () => {
    var usuarioADM = metodoUsuario.criarUsuarioADM();
    cy.postUsuario(usuarioADM).then((response) => {
      expect(response.body.message).to.eq("Cadastro realizado com sucesso")
      cy.getUsuarioID(response.body._id).then((response) => {
        expect(response.body.nome).to.eq(usuarioADM.nome)
      })
    });
  });

  it("POST - cadastrar usuario [N/ADM]", () => {
    var usuario = metodoUsuario.criarUsuario();
    cy.postUsuario(usuario).then((response) => {
      expect(response.body.message).to.eq("Cadastro realizado com sucesso")
      cy.getUsuarioID(response.body._id).then((response) => {
        expect(response.body.nome).to.eq(usuario.nome)
      })
    });
  });

  it("POST - cadastrar usuario [mesmo email]", () => {
    var emailIgual = metodoUsuario.emailIgual();
    cy.postUsuario(emailIgual).then((response) => {
      expect(response.body.message).to.eq("Este email já está sendo usado")
    });
  });
})



import http from '../e2e/back/util/status';

Cypress.Commands.add('loginAPI', (email, password) => {
  cy.request({
    method: "POST",
    url: "/login",
    body:
    {
      "email": email,
      "password": password
    }, failOnStatusCode: false
  })
})

Cypress.Commands.add('postProduto', (produto, token) => {
  cy.api({
    method: "POST",
    url: "/produtos",
    headers: { Authorization: token },
    body: produto,
    failOnStatusCode: false
  })
});

Cypress.Commands.add('putProduto', (id, produto, token) => {
  cy.api({
    method: "PUT",
    url: "/produtos/" + id,
    headers: { Authorization: token },
    body: produto,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteProdutoID', (id, token) => {
  cy.api({
    headers: { Authorization: token },
    method: "DELETE",
    url: "/produtos/" + id,
    failOnStatusCode: false
  })
});

Cypress.Commands.add('getProduto', () => {
  cy.api({
    method: "GET",
    url: "/produtos",
    failOnStatusCode: false
  })
});


Cypress.Commands.add('getProdutoID', (id) => {
  cy.api({
    method: "GET",
    url: "/produtos/" + id,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('postUsuario', (usuario) => {
  cy.api({
    method: "POST",
    url: "/usuarios",
    body: usuario,
    failOnStatusCode: false
  })
});

Cypress.Commands.add('getUsuarios', () => {
  cy.api({
    method: "GET",
    url: "/usuarios",
    failOnStatusCode: false
  });
});

Cypress.Commands.add('getUsuarioID', (id) => {
  cy.api({
    method: "GET",
    url: "/usuarios/" + id,
    failOnStatusCode: false
  })
});

Cypress.Commands.add('putUsuarioID', (id, usuario) => {
  cy.api({
    method: "PUT",
    url: "/usuarios/" + id,
    body: usuario,
    failOnStatusCode: false
  })
});



Cypress.Commands.add('deleteUsuarioID', (id) => {
  cy.api({
    method: "DELETE",
    url: "/usuarios/" + id,
    failOnStatusCode: false
  })
})

Cypress.Commands.add('getCarrinho', () => {
  cy.api({
    method: "GET",
    url: "/carrinhos",
    failOnStatusCode: false
  })
});

Cypress.Commands.add('postCarrinho', (token, idProduto, quantidade) => {
  cy.api({
    headers: { Authorization: token },
    method: "POST",
    url: "/carrinhos",
    body: {
      "produtos": [
        {
          "idProduto": idProduto,
          "quantidade": quantidade
        }
      ]
    },
    failOnStatusCode: false
  })
})

Cypress.Commands.add('deleteCarrinho', (token) => {
  cy.api({
    headers: { Authorization: token },
    method: "DELETE",
    url: "/carrinhos/cancelar-compra",
    failOnStatusCode: false
  })
})

Cypress.Commands.add('getToken', (email, password) => {
  cy.api({
    method: "POST",
    url: "/login",
    body:
    {
      "email": email,
      "password": password
    },
    failOnStatusCode: false
  }).then((response) => {
    expect(response.status).to.eq(http.OK);
    Cypress.env('token', response.body.authorization);
    response.body.authorization;
  });
});

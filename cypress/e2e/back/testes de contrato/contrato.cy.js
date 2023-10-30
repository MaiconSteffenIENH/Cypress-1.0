import metodoProduto from "../metodo/metodoProduto";
import http from '../util/status';
import 'cypress-plugin-api' // importa o plugin para usar o comando api

var Ajv = require("ajv")
var ajv = new Ajv({ allErrors: true, verbose: true }) // allErrors: independe do erro, roda todas as suites / verbose: referencia o local da falha
var produto = metodoProduto.criarProduto();

describe('Contrato', () => {

  // beforeEach(() => {

  // })


  it('Validar contrato da aplicação', () => {
    cy.loginAPI("maiconsteffen@qa.com.br", "teste").then((responseLogin) => {
      cy.postProduto(produto, responseLogin.body.authorization).then((response) => {
        cy.fixture('contrato').then((contrato) => {
          const validate = ajv.compile(contrato)
          const valid = validate(response.body)
          if (!valid)
            cy.log(validate.errors).then(() => {
              throw new Error('Falha no contrato')
            })
        })
      })
    })
  })

  it('GET PRODUTOS', () => {
    cy.getProduto().then((response) => {
      cy.fixture('contrato').then((contrato) => {
        const validate = ajv.compile(contrato) //compilando o json do contrato
        const valid = validate(response.body)
        if (!valid)
          cy.log(validate.errors).then(() => {
            throw new Error('Falha no contrato')
          })
      })
    })
  })

  it.only('GET PRODUTO ID', () => {
    cy.fixture('user').as('usuario').then((login) => {
      cy.loginAPI(login.emailADM, login.passwordADM).then((responseLogin) => {
        cy.postProduto(produto, responseLogin.body.authorization).then((response) => {

          const idProduto = response.body._id
          if (idProduto == null) {
            idProduto = BeeJh5lz3k6kSIzA
          }

          cy.getProdutoID(idProduto).then((response) => {
            cy.fixture('contrato').then((contrato) => {
              const validate = ajv.compile(contrato)
              const valid = validate(response.body)
              if (!valid)
                cy.log(validate.errors).then(() => {
                  throw new Error('Falha no contrato')
                })
            })
          })
        })
      })
    })
  })
})


import makeServer from '../../../src/server'
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

/** @type {import('miragejs').Server} */
let server

beforeEach(() => {
  server = makeServer({ environment: 'test' })
  cy.wrap('test-user-1').as('username')
  cy.wrap('test@test.com').as('email')
  cy.wrap('test').as('password')
})

afterEach(() => {
  server.shutdown()
})

describe('Register', () => {
  Given('I am on the register page', () => {
    cy.visit('/register')
    cy.get('h1.text-xs-center').should('have.text', 'Sign up')
    cy.get('form').within(() => {
    cy.get('input[name="username"]').should('exist')
    cy.get('input[name="email"]').should('exist')
    cy.get('input[name="password"]').should('exist')
    cy.get('button[type="submit"]').should('exist')
  })
})

When('I fill the register form with valid data', () => {
  cy.get('form').within(() => {
    cy.get('@username').then(username => {
      cy.get('input[name="username"]').type(username)
    })
    cy.get('@email').then(email => {
      cy.get('input[name="email"]').type(email)
    })
    cy.get('@password').then(password => {
      cy.get('input[name="password"]').type(password)
    })
    cy.get('button[type="submit"]').click()
    })
  })

  Then('I should be redirected to the home page', () => {
    cy.url().should('include', '/')
  })
})
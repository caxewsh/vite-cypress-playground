import makeServer from '../../src/server'

/** @type {import('miragejs').Server} */
let server

beforeEach(() => {
  server = makeServer({ environment: 'test' })
})

afterEach(() => {
  server.shutdown()
})

it('Should show the global feed', () => {
  // ─── ARRANGE ─────────────────────────────────────────────────────
  const user = server.create('user')
  const article = server.create('article', { author: user })

  // ─── ACT ─────────────────────────────────────────────────────────
  cy.visit('/')

  // ─── ASSERT ──────────────────────────────────────────────────────
  cy.get('.feed-toggle > .nav > .nav-item > .nav-link').should('exist')
  cy.get('.col-md-9 > :nth-child(2)').should('exist')
})

it('Should show login page', () => {
  // ─── ACT ─────────────────────────────────────────────────────────
  cy.visit('/login')

  // ─── ASSERT ──────────────────────────────────────────────────────
  cy.get('h1.text-xs-center').should('have.text', 'Sign in')
})  

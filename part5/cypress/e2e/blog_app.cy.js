describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    // create here a user to backend
    const user = {
      username: 'Test',
      password: 'secret',
      name: 'Testy tester',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function () {
    cy.get('h2').contains('Login to application')
    cy.get('#login-form').should('be.visible')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('[type="text"]').type('Test')
      cy.get('[type="password"]').type('secret')
      cy.contains('login').click()

      cy.get('[data-notification]')
        .should('contain', 'Testy tester logged in successfully')
        .and('have.css', 'color', 'rgb(0, 128, 0)')

      cy.get('h2').contains('Blogs')
      cy.contains('Testy tester logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('[type="text"]').type('Fail')
      cy.get('[type="password"]').type('wrong')
      cy.contains('login').click()

      cy.get('[data-notification]')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')

      cy.get('h2').contains('Login to application')
    })
  })
})

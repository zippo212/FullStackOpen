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

    describe('When logged in', function () {
      beforeEach(function () {
        cy.login({ username: 'Test', password: 'secret' })
      })

      it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.get('#title-input').type('Test Blog title')
        cy.get('#author-input').type('Author name')
        cy.get('#url-input').type('http://example.com')
        cy.get('#create-blog').click()

        cy.get('[data-test-blog-default]').as('DefaultClosed')
        cy.get('@DefaultClosed').contains('Test Blog title')
        cy.get('@DefaultClosed').contains('Author name')
        cy.get('@DefaultClosed').contains('show')
      })

      describe('With some posts already made', function () {
        beforeEach(function () {
          cy.createBlog({
            title: 'Test Blog title 1',
            author: 'Author name 1',
            url: 'http://example1.com',
          })
          cy.createBlog({
            title: 'Test Blog title 2',
            author: 'Author name 2',
            url: 'http://example2.com',
          })
          cy.createBlog({
            title: 'Test Blog title 3',
            author: 'Author name 3',
            url: 'http://example3.com',
          })
        })

        it('user can like a blog', function () {
          cy.contains('Test Blog title 2').contains('show').click()
          cy.contains('Test Blog title 2').parent().get('[data-like]').contains('0')
          cy.contains('Test Blog title 2').parent().contains('like').click()
          cy.contains('Test Blog title 2').parent().get('[data-like]').contains('1')
        })

        it('user who created the blog can delete it', function () {
          cy.contains('Test Blog title 3').parent().as('BlogPost')
          cy.get('@BlogPost').contains('show').click()
          cy.get('@BlogPost').contains('remove').click()
          cy.get('[data-notification]').contains('blog was removed successfully')
          cy.get('#blogs-container').children().should('have.length', 2)
        })

        it('other users cant see the deleted blog button', function () {
          const user = { username: 'Test2', password: 'secret2', name: 'name' }
          cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
          cy.login({ username: 'Test2', password: 'secret2' })
          cy.contains('Test Blog title 3').parent().as('BlogPost')
          cy.get('@BlogPost').contains('show').click()
          cy.get('@BlogPost').should('not.contain', 'remove')
        })

        it('blogs are ordered according to likes', function () {
          cy.contains('Test Blog title 2').parent().as('MostLikes')
          cy.contains('Test Blog title 1').parent().as('BlogPost')
          cy.contains('Test Blog title 3').parent().as('LeastLikes')

          cy.get('@BlogPost').contains('show').click()
          for (let i = 0; i < 3; i++) {
            cy.get('@BlogPost').contains('like').click()
          }
          cy.get('@MostLikes').contains('show').click()
          for (let i = 0; i < 5; i++) {
            cy.get('@MostLikes').contains('like').click()
          }
          cy.get('@LeastLikes').contains('show').click()
          for (let i = 0; i < 1; i++) {
            cy.get('@LeastLikes').contains('like').click()
          }

          cy.get('[data-blog]').eq(0).should('contain', 'Test Blog title 2')
          cy.get('[data-blog]').eq(1).should('contain', 'Test Blog title 1')
          cy.get('[data-blog]').eq(2).should('contain', 'Test Blog title 3')
        })
      })
    })
  })
})

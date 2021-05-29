context('API Tests', () => {
    before(() => {
        Cypress.config('baseUrl', 'https://reqres.in/api/')
    })

    describe('Users Endpoint', () => {
        var user;

        it('API returns a JSON response', () => {
          cy.request('/users').its('headers').its('content-type').should('include', 'application/json')
        })
      
        it('GET returns correct status code', () => {
          cy.request('/users').its('status').should('be.equal', 200)
        })

        it('GET a new user for user registration', () => {
            cy.request('/users/2')
                .then((response) => {
                    expect(response.status).to.eq(200)
                    user = {
                        firstname: response.body.data.firstname,
                        lastname: response.body.data.lastname,
                        id: '',
                        email: response.body.data.email,
                        password: Math.random().toString(36).slice(-8),
                        token: ''
                    }
                })
        })

        it('User registration using given user', () => {
            cy.request('POST', '/register', { email: user.email, password: user.password })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('token')
                user.id = response.body.id
                user.token = response.body.token
            })
        })

        it('User sign in using given token', () => {
            cy.request('POST', '/login', { email: user.email, password: user.password })
            .then((response) => {
                expect(response.status).to.eq(200)
                expect(response.body).to.have.property('token', user.token)
            })
        })
    })
})
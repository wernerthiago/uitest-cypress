context('Login Page tests', () => {
    beforeEach(() => {
      cy.visit('login')
    })

    it('Website displays the Login page components', () => {
        cy.get(headerLabel)
            .should('be.visible')
        cy.get(subheaderLabel)
            .should('be.visible')
        cy.get(usernameLabel)
            .then(($element) => {
                expect($element[0]).to.have.text('Username')
            });
        cy.get(usernameField)
            .should('be.visible')
        cy.get(passwordLabel)
            .then(($element) => {
                expect($element[1]).to.have.text('Password')
            });
        cy.get(passwordField)
            .should('be.visible')
        cy.get(loginButton)
            .should('be.visible')
    })

    it('Website allows the user login in using valid credentials', () => {
        LoginPage.login()
        cy.get(alertComponent)
            .should('be.visible')
            .then(($element) => {
                expect($element).to.contain('You logged into a secure area!')
            })
    })

    it('Website displays alert messages when the username is invalid', () => {
        LoginPage.typePassword()
        cy.get(usernameField)
            .type('invalidUsername')
        LoginPage.clickLogin()
        cy.get(alertComponent)
            .should('be.visible')
            .then(($element) => {
                expect($element).to.contain('Your username is invalid!')
            })
    })

    it('Website displays alert messages when the password is invalid', () => {
        LoginPage.typeUsername()
        cy.get(passwordField)
            .type('invalidPassword')
        LoginPage.clickLogin()
        cy.get(alertComponent)
            .should('be.visible')
            .then(($element) => {
                expect($element).to.contain('Your password is invalid!')
            })
    })

    it('Website displays username alert message when only Passsword field is invalid', () => {
        cy.get(passwordField)
            .type('invalidPassword')
        LoginPage.clickLogin()
        cy.get(alertComponent)
            .should('be.visible')
            .then(($element) => {
                expect($element).to.contain('Your username is invalid!')
            })
    })

    it('Website displays username alert message when the fields are empty', () => {
        LoginPage.clickLogin()
        cy.get(alertComponent)
            .should('be.visible')
            .then(($element) => {
                expect($element).to.contain('Your username is invalid!')
            })
    })
})

const headerLabel = 'h2';
const subheaderLabel = '.subheader';
const usernameLabel = '#login > div > div > label';
const usernameField = '#username';
const passwordLabel = '#login > div > div > label';
const passwordField = '#password';
const loginButton = '.radius';
const alertComponent = '#flash-messages'

export const LoginPage = {
    typeUsername(args) {
        cy.get(usernameField)
            .type(Cypress.env('username'))
    },

    typePassword(args) {
        cy.get(passwordField)
            .type(Cypress.env('password'))
    },

    clickLogin(args) {
        cy.get(loginButton)
            .click()
    },

    login(args) {
        this.typeUsername()
        this.typePassword()
        this.clickLogin()
    }
}
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-iframe'
/*
    Customer command "enterCardDetailsIniframe" to enter card card number, card expiration date, and card cvc
    number into stripe iframe
 */
Cypress.Commands.add('enterCardDetailsIniframe', ({cardNumber, expDate, cvc}) => {
    const iframeSelector = '[title="Secure card payment input frame"]'
    cy.frameLoaded(iframeSelector)
    cy.enter(iframeSelector).then(getBody => {
        getBody()
            .find('[name=cardnumber]')
            .type(cardNumber)
        getBody()
            .find('[name=exp-date]')
            .type(expDate)
        getBody()
            .find('[name=cvc]')
            .type(cvc)
    })
})

/*
    Custom command "enterCardUserDetails" to enter card user full name, email, address, city, state, and zip details
 */
Cypress.Commands.add('enterCardUserDetails', ({fullName, email, address, city, state, zip}) => {
    cy.log('Entering card user details.')

    const formField = {
        name: {
            selector: '[data-cy=name]',
            input: fullName
        },
        email: {
            selector: '[data-cy=email]',
            input: email
        },
        address: {
            selector: '[data-cy=address]',
            input: address
        },
        city: {
            selector: '[data-cy=city]',
            input: city
        },
        state: {
            selector: '[data-cy=state]',
            input:state
        },
        zip: {
            selector: '[data-cy=zip]',
            input: zip
        }
    }
    for( const key in formField) {
        const field = formField[key]
        cy.get(field.selector,{log:false})
            .type(field.input,{log:false})
    }

    cy.log('Card user details have been entered!')
})
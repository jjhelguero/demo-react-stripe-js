declare namespace Cypress {
    interface Chainable {
        /**
         * Find element by data-testId with optional previousSubject and/or text
         */
        byTestId(testId: string, containsText?: string, options?: object): Chainable<JQuery<HTMLElement>>
    }
}
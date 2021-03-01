describe('Should provide a way of viewing and filtering routes', () => {
    before(() => {
        cy.server()
        cy.route('/nextripv2/routes', 'fixture:routes.json').as('routes')
        cy.visit('http://localhost:8080/')
        cy.wait('@routes')
    })
    it('Should display the full list of routes', () => {
        cy.get('[data-testid*="RouteNav-route-"]').should('have.length', 131)
    })
    it('Should filter list based on text input', () => {
        cy.get('[data-testid="RouteNav-filter"]').type('21', {force: true})
        cy.get('[data-testid*="RouteNav-route-"]').should('have.length', 4)
    })
})
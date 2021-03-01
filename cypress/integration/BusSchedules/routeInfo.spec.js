describe('It should allow bus routes and stops to be selected and display stop information', () => {
    before(() => {
        cy.server()
        cy.route('/nextripv2/routes/', 'fixture:routes.json')
        cy.route('/nextripv2/directions/**', 'fixture:directions.json')
        cy.route('/nextripv2/stops/*/*/*', 'fixture:stops.json')
        cy.visit('http://localhost:8080/?routeId=901')
    })
    it('Should allow you to select a direction', () => {
        cy.get('[data-testid="BusData-directionSelection"]').click()
        cy.get('[data-testid="BusData-directionSelection-0"]').click()
    })
    it('Should allow you to select a stop and display stop times', () => {
        cy.get('[data-testid*="BusData-departureTimes-"]').should('not.exist')
        cy.get('[data-testid="BusData-directionSelection"]').click()
        cy.get('[data-testid="BusData-directionSelection-0"]').click()
        cy.get('[data-testid="BusData-stopSelection"]').click()
        cy.get('[data-testid="BusData-stopSelection-FTSN"]').click()
        cy.get('[data-testid*="BusData-departureTimes-"]').should('have.length.greaterThan', 1)
    })
})
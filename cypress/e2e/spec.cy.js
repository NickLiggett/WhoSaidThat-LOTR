describe('User Flows', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000')
  })

  it('Should be able to see the homepage', () => {
    cy.intercept('/', {
      statusCode: 200
    })
    .get('.main-title')
    .should('contain', 'Who Said That?')
    .url().should('eq', 'http://localhost:3000/')
  })

  it('Should be able to play the game', () => {
    cy.get('.play-game-button')
    .click()
    .get('.choice-button').first()
    .click()
    .get('.reply').should('exist')
    .get('.choices').should('exist')
  })

  it('Should be able to go to the study hall from the game', () => {
    cy.get('.play-game-button')
    .click()
    .get('.study-hall-button')
    .click()
    .get('.character-name').first()
    .click()
  })
})
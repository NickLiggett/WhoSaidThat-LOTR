describe('User Flows', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/WhoSaidThat-LOTR/')
    .intercept('/WhoSaidThat-LOTR/', {
      statusCode: 200
    })
  })

  it('Should be able to see the homepage', () => {
    cy.get('.main-title').should('contain', 'Who Said That?')
    .get('#play-game-button').should('exist')
    .get('#play-game-button').should('exist')
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/')
  })

  it('Should be able to play the game', () => {
    cy.get('#play-game-button').click()
    .intercept('/WhoSaidThat-LOTR/game', {
      statusCode: 200
    })
    .get('.choice-button').first().click()
    .get('.reply').should('exist')
    .get('.choices').should('exist')
  })

  it('Should be able to go to the study hall', () => {
    cy.get('#study-hall-button').click()
   .intercept('/WhoSaidThat-LOTR/library', {
    statusCode: 200
    })
    .get('.character-name').first().click()
    .get('.library-main-title').should('contain', 'Aragorn II Elessar')
    .get('.quote').should('exist')
  })

  it('Should be able to favorite a quote and see it on the favorites page', () => {
    cy.get('#study-hall-button').click()
   .intercept('/WhoSaidThat-LOTR/library', {
    statusCode: 200
    })
    .get('.character-name').first().click()
    .get('.quote').first().click()
    .get('.favorites-button').click()
    .get('.favorite-quote').should('exist')
  })
})

describe('User Flows', () => {

  beforeEach(() => {
    cy.intercept('GET', 'https://the-one-api.dev/v2/character', {
      fixture: '/characters.json'
    }).as('characters')
    .intercept('GET', 'https://the-one-api.dev/v2/quote', {
      fixture: '/quotes.json'
    }).as('quotes')
    .visit('http://localhost:3000/WhoSaidThat-LOTR/')
  })

  it('Should be able to see the homepage', () => {
    cy.get('.main-title').should('contain', 'Who Said That?')
    .get('#play-game-button').should('exist')
    .get('#play-game-button').should('exist')
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/')
  })

  it('Should be able to go to the study hall', () => {
    cy.get('#study-hall-button').click()
   .intercept('/WhoSaidThat-LOTR/library', {
    statusCode: 200
    })
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/library')
    .get('.character-name').first().click()
    .get('.library-main-title').should('contain', 'Aragorn II Elessar')
    .get('.quote').should('exist')
  })

  it('Should be able to favorite a quote and see it on the favorites page', () => {
    cy.get('#study-hall-button').click()
   .intercept('/WhoSaidThat-LOTR/library', {
    statusCode: 200
    })
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/library')
    .get('.character-name').first().click()
    .get('.quote').first().click()
    .get('.favorites-button').click()
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/favorites')
    .get('.favorite-quote').should('exist')
  })

  it('Should be able to click on a favorite quote to unfavorite it', () => {
    cy.get('#study-hall-button').click()
   .intercept('/WhoSaidThat-LOTR/library', {
    statusCode: 200
    })
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/library')
    .get('.character-name').first().click()
    .get('.quote').first().click()
    .get('.favorites-button').click()
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/favorites')
    .get('.favorite-quote').click()
    .get('.favorite-quote').should('not.exist')
  })
})
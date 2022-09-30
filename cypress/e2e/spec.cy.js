
describe('Landing Page', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://the-one-api.dev/v2/character', {
      fixture: '/characters.json'
    }).as('characters')
    .intercept('GET', 'https://the-one-api.dev/v2/quote', {
      fixture: '/quotes.json'
    }).as('quotes')
    .visit('http://localhost:3000/WhoSaidThat-LOTR/')
  })

  it('Should have a main title', () => {
    cy.get('.main-title').should('contain', 'Who Said That?')
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/')
  })

  it('Should be able to see the Play and Study buttons', () => {
    cy.get('#play-game-button').should('exist')
    .get('#play-game-button').should('contain', 'Play')
    .get('#study-hall-button').should('exist')
    .get('#study-hall-button').should('contain', 'Study')
  })

  it('Should be able to click the Play button to go to the Game page', () => {
    cy.get('#play-game-button').click()
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/game')
    .get('.quote-question').should('exist')
    .get('.title').should('contain', 'Who Said That?')
    .get('.choices').children().should('have.length', 4)
    .get('.study-hall-button').should('exist')
  })

  it('Should be able to click the Study button to go to the Study Hall', () => {
    cy.get('#study-hall-button').click()
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/library')
    .get('.character-list').should('exist')
    .get('.character-list').children().should('have.length', 36)
    .get('.library-main').should('exist')
    .get('.library-main').should('contain', 'Click on a Character')
    .get('.button-wrapper').should('exist')
    .get('.play-button').should('exist')
    .get('.favorites-button').should('exist')
  })
})

describe('Game', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://the-one-api.dev/v2/character', {
      fixture: '/characters.json'
    }).as('characters')
    .intercept('GET', 'https://the-one-api.dev/v2/quote', {
      fixture: '/quotes.json'
    }).as('quotes')
    .visit('http://localhost:3000/WhoSaidThat-LOTR/game')
  })

  it('Should be able to see the quote in question', () => {
    cy.get('.quote-question').should('exist')
  })

  it('Should be able to see the Title of the app', () => {
    cy.get('.title').should('exist')
    .get('.title').should('contain', 'Who Said That?')
  })

  it('Should be able to see four possible choices', () => {
    cy.get('.choices').children().should('have.length', 4)
  })

  it('Should be able to guess which character said the quote and get a response of whether or not the guess was correct', () => {
    cy.get('.choices').first().click()
    .get('.reply').should('exist')
  })

  it('Should be able to see the Study Hall button', () => {
    cy.get('.study-hall-button').should('exist')
    .get('.study-hall-button').should('contain', 'Study Hall')
  })

  it('Should be able to click to Study Hall button to go to the Study Hall', () => {
    cy.get('.study-hall-button').click()
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/library')
    .get('.character-list').should('exist')
    .get('.character-list').children().should('have.length', 36)
    .get('.library-main').should('exist')
    .get('.library-main').should('contain', 'Click on a Character')
    .get('.play-button').should('exist')
    .get('.favorites-button').should('exist')
  })
})

describe('Study Hall', () => {
  beforeEach(() => {
    cy.intercept('GET', 'https://the-one-api.dev/v2/character', {
      fixture: '/characters.json'
    }).as('characters')
    .intercept('GET', 'https://the-one-api.dev/v2/quote', {
      fixture: '/quotes.json'
    }).as('quotes')
    .visit('http://localhost:3000/WhoSaidThat-LOTR/library')
  })

  it('Should be able to see a list of character names', () => {
    cy.get('.character-list').should('exist')
    .get('.character-list').first().should('contain', 'Aragorn II Elessar')
    .get('.character-list').children().should('have.length', 36)
  })
  
  it('Should be able to see the Play and Favorites buttons', () => {
    cy.get('.library-main').should('exist')
    .get('.library-main').should('contain', 'Click on a Character')
    .get('.play-button').should('exist')
    .get('.favorites-button').should('exist')
  })

  it('Should be able to click the Play button to go to the Game page', () => {
    cy.get('.play-button').click()
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/game')
    .get('.quote-question').should('exist')
    .get('.title').should('contain', 'Who Said That?')
    .get('.choices').children().should('have.length', 4)
    .get('.study-hall-button').should('exist')
  })

  it('Should be able to click the Favorites button and go to the Favorites page', () => {
    cy.get('.favorites-button').click()
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/favorites')
    .get('.favorite-title').should('contain', 'Here are your favorite quotes!')
    .get('.favorite-title').should('contain', '* Click a quote to unfavorite it.')
    .get('.play-button').should('exist')
    .get('.study-hall-button').should('exist')
  })

  it('Should be able to click on a character to see their quotes', () => {
    cy.get('.character-name').first().click()
    .get('.library-main').should('contain', 'Aragorn II Elessar')
    .get('.quote').should('exist')
  })

  it('Should be able to favorite a quote and see it on the favorites page', () => {
    cy.get('.favorites-button').click()
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/favorites')
    .get('.favorite-quote').should('not.exist')
    .get('.study-hall-button').click()
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/library')
    .get('.character-name').first().click()
    .get('.quote').first().click()
    .get('.favorites-button').click()
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/favorites')
    .get('.favorite-quote').should('exist')
  })

  it('Should be able to click on a favorite quote to unfavorite it', () => {
    cy.get('.character-name').first().click()
    .get('.quote').first().click()
    .get('.favorites-button').click()
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/favorites')
    .get('.favorite-quote').should('exist')
    .get('.favorite-quote').click()
    .get('.favorite-quote').should('not.exist')
  })
})
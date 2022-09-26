describe('User Flows', () => {

  beforeEach(() => {
    cy.visit('http://localhost:3000/WhoSaidThat-LOTR/')
    .intercept('GET', 'https://the-one-api.dev/v2/character', {
      statusCode: 201,
      body: {docs: [{
        birth: "March 1 ,2931",
        death: "FO 120",
        gender: "Male",
        hair: "Dark",
        height: "198cm (6'6\")",
        name: "Aragorn II Elessar",
        race: "Human",
        realm: "Reunited Kingdom,Arnor,Gondor",
        spouse: "Arwen",
        wikiUrl: "http://lotr.wikia.com//wiki/Aragorn_II_Elessar",
        _id: "5cd99d4bde30eff6ebccfbe6"
      }]}
    })
    .intercept('GET', 'https://the-one-api.dev/v2/quote', {
      statusCode: 201,
      body: {docs: [{
        character: "5cd99d4bde30eff6ebccfbe6",
        dialog: "It has been remade. Fight for us and regain your honour. What say you? What say you?",
        id: "5cd96e05de30eff6ebcce90f",
        movie: "5cd95395de30eff6ebccde5d",
        _id: "5cd96e05de30eff6ebcce90f"
      }]}
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
    .url().should('eq', 'http://localhost:3000/WhoSaidThat-LOTR/game')
    .get('.choice-button').first().click()
    .get('.reply').should('exist')
    .get('.choices').should('exist')
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
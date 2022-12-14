# Who Said That? LOTR

## Introduction
  - When the user is at the homepage, they can choose to play the quote trivia game or go to the study hall to look up a specific character's quotes from the films.
  - On the Game page, a random quote is populated and the user must select which LOTR character they think said the quote.
  - The user will be notified whether their guess was correct or not, then a new quote will appear with new choices.
  - In the Study Hall, the user can scroll through a list of quotable characters from the films.
  - The user can click on any of these characters and that character's quotes will be populated.
  - The user can click on any of the characters quotes to save them to their favorites.
  - The favorites section is accessible through the Study Hall via the Favorites button.
  - On the Favorites Page, the user will see their favorited quotes and can unfavorite them by clicking on them while on the favorites page.
  
## Setup
Check out the app [here](https://nickliggett.github.io/WhoSaidThat-LOTR/)

or

Copy and Paste this into your terminal

```
git clone git@github.com:NickLiggett/WhoSaidThat-LOTR.git
cd WhoSaidThat-LOTR
npm i
npm start
```

* CAUTION! If you choose the local setup, you will need to visit [this](https://the-one-api.dev/) website and request an API key.
Once you have it, visit [this](https://betterprogramming.pub/how-to-hide-your-api-keys-c2b952bc07e6) website to find out how to hide you're API key if you want to push it to GitHub. 


## Application in Action
![Playing the Game](https://github.com/NickLiggett/WhoSaidThat-LOTR/blob/7b6c9deaf446086ab8cab08625f1d04e5c0822ad/GIFS/2022-09-25%2022.17.22.gif)
![Going to Study Hall](https://github.com/NickLiggett/WhoSaidThat-LOTR/blob/40899d5e08472d4535dd369c781c270149d01401/GIFS/2022-09-25%2022.17.57.gif)
![Favoriting a Quote](https://github.com/NickLiggett/WhoSaidThat-LOTR/blob/40899d5e08472d4535dd369c781c270149d01401/GIFS/2022-09-25%2022.18.26.gif)

## Technologies
  - React
  - XML
  - CSS
  - VSCode
  - Router
  - Cypress

## Goals, Challenges, and Wins
### Goals
 - This project, I particularly wanted to make a mobile compatable app.

### Challenges
- The API used for this pro app only allows 100 network requests per 10 minutes. I could've made all my network requests in some main component and pass them down as props but I wanted to prioritize being able to maintain data on a page refresh (hence the fetch calls in App, Library, and Game components). I could not figure out a good solution to this besides using a custom made API without network request limits.

### Wins
- The API used for this project has an end point for all characters (including the LOTR books) and an end point for all quotes from the films.
- This became a problem when populating the characters in the library because the API was giving me over 200 characters, only about 40 of which had quotes.
- I count my cleanup function that returns only characters with lines as a win.

## Possible Future Extensions
- Add character images to the Library/Study Hall
- Have green text for favorited quotes persist through page navigation


## Sources
  - [MDN](http://developer.mozilla.org/en-US/)
  - [YouTube](https://www.youtube.com/)
  - [StackOverflow](https://www.stackoverflow.com/)
  - [W3Schools](https://www.w3schools.com/)
  
## Contributors
  - [Nick Liggett](https://github.com/NickLiggett)

## Project Specs
  - The project spec & rubric can be found [here](https://frontend.turing.edu/projects/module-3/showcase.html)
  - The project repo can be found [here](https://github.com/NickLiggett/WhoSaidThat-LOTR)

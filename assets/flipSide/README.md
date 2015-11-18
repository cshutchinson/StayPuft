# Galvanize Individual Project Proposal

## Project Description
I will implement a memory game consisting of 2n cards. The cards will be
numbered on one side and will present an image on  the flip-side. Obviously the
card will need the ability to flip with a 3D CSS transform.  The cards are
arranged such that the user can select any card initially and then hopefully
a match. After an incorrect match is selected,  the non-matching cards are hidden for a
future turn. If a match is identified, the cards will remain revealed.

## Who uses it?
This project will present an application that can be used by someone wishing to improve
their memory and cognition skills.

## What outputs do they need?
The outputs will consist of a score based on whether or not the user selections
match.

## What inputs are needed to generate those outputs?
The inputs to the game will be XHR acquired images and two user click events on
the array members.

## What technologies do you plan to use?
- HTML (validated)  
- CSS / Sass  
- Javascript - ESLint  
- jQuery / React for DOM manipulation  
- XHR  
- HTML Forms / Validation  
- Wireframe Layouts  
- Git branching for features  
- Gulp for workflow management  

## Feature list
- User interface will consist of an array of square cards  
- Each card will have two sides
- One side of the card will denote an integer from 0 to n cards
- The flip-side of each card will contain an image retrieved from lorempixel.com
via an XHR request
- The user will click once on a card to reveal the flip-side containing the image.
- The user will have the opportunity to then select another card.
- When two cards are revealed, an algorithm will check if the cards are a  match
- If a match is found the score is incremented
- After score is incremented, the matching cards remain revealed until the end of
the game.
- When two cards are hidden, the remaining cards don’t move or reposition
themselves.
- There will always be a matching card for a 2n array of cards
- Scoring is based on the number of attempts to successfully find a match
- After completing the game, the user will have the option to continue the game
at an increased difficulty level (more cards)
- Player identity and scores will be saved to localstorage
- A quick reveal of the cards at the start of each level will provide a starting
point for the user to avoid initial blind guesses

## Deliverables
- Two paragraph write-up describing the project, technology used, and workflow used
- Video presentation for functionality demo
- Functional web app
- Addition of application to my web portfolio
- Five Minute G15 demo

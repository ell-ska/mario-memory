const memoryApp = () => {

// step 1 - get all elements needed
    const timer = document.querySelector('.score-panel__timer')
    const moves = document.querySelector('.score-panel__moves')
    const cards = document.querySelectorAll('.card')


// step 2 - randomize data attr for every card

    const allCharacters = [
        'mario',
        'luigi',
        'peach',
        'toad',
        'bowser',
        'yoshi',
        'daisy',
        'boo',
        'dk',
        'bowserjr'
    ]

    const shuffleDeck = () => {

        const charactersToBeShuffled = allCharacters.concat(allCharacters)

        shuffledCharacters = charactersToBeShuffled.sort(() => Math.random() -0.5)


        cards.forEach((card, index) => {

            card.setAttribute('data-character', shuffledCharacters[index])

        })
        
    }
    
// step 3 - flip first and second card
// step 5 - compare cards attr value
// step 6 - IF same value, stay flipped up. IF different value, flip both cards again - go back to step 3

    const flipCard = (event) => {
    
        const flippedCards = document.querySelectorAll('.card--flipped')
        
        if (flippedCards.length < 1) {

            event.target.parentNode.classList.add('card--flipped')

        } else {
            event.target.parentNode.classList.add('card--flipped')

            const currentCharacterOne = flippedCards[0]
            const currentCharacterTwo = flippedCards[1]

            const currentCharacterOneAttr = currentCharacterOne.getAttribute('data-character')
            const currentCharacterTwoAttr = currentCharacterTwo.getAttribute('data-character')

            if (currentCharacterOneAttr === currentCharacterTwoAttr){

                currentCharacterOne.classList.add('card--complete')
                currentCharacterTwo.classList.add('card--complete')

                // MAKE THE COMPLETED ONES NON-CLICKABLE
                
            } else {

                // MAKE CARDS FLIP BACK AFTER SOME TIME

                console.log('wrong')
                
            }
            
            currentCharacterOne.classList.remove('card--flipped')
            currentCharacterTwo.classList.remove('card--flipped')

        }
        
    }
// step 7 - WHEN all cards are flipped, show winner screen

// step 8 - restart button

// step 9 - add timer

// step 10 - add move counter

// start functions

cards.forEach(card => {
    card.addEventListener('click', flipCard)
})

document.addEventListener('DOMContentLoaded', shuffleDeck())

}

memoryApp()
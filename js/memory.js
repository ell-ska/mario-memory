const memoryApp = () => {

// Get needed elements 
    const minutes = document.querySelector('.score-panel__minutes')
    const seconds = document.querySelector('.score-panel_seconds')
    const startButton = document.querySelector('.start__button')
    const startOverlay = document.querySelector('.start')
    const moves = document.querySelector('.score-panel__moves span')
    const restartButtonHome = document.querySelector('.score-panel__refresh')
    const restartButtonWinner = document.querySelector('.winner-screen__refresh')
    const winnerScreen = document.querySelector('.winner-screen')
    const cards = document.querySelectorAll('.card')
    const winnerSeconds = document.querySelector('.winner-screen__seconds')
    const winnerMinutes = document.querySelector('.winner-screen__minutes')
    const winnerMoves = document.querySelector('.winner-screen__moves')

/**
 * Character array
 */
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

/**
 * Shuffle deck
 */
    const shuffleDeck = () => {

        const charactersToBeShuffled = allCharacters.concat(allCharacters)

        shuffledCharacters = charactersToBeShuffled.sort(() => Math.random() -0.5)


        cards.forEach((card, index) => {

            card.setAttribute('data-character', shuffledCharacters[index])

        })
        
    }
     
/**
 * The game
 */
    let wrong = false    // Create variable for wrong click
    let amountOfMoves = 0
    
    const flipCard = (event) => {
        
        amountOfMoves = amountOfMoves + 1
        moves.innerHTML = amountOfMoves
        // IT COUNTS IF YOURE TOO FAST

        if (wrong === true) return // Preventing user to click new card before the wrong ones disappeared.
        
        // Switch order to add class before fetching elements
        event.target.parentNode.classList.add('card--flipped')
        const flippedCards = document.querySelectorAll('.card--flipped')
    
        const currentCharacterOne = flippedCards[0]
        const currentCharacterTwo = flippedCards[1]

        // If there is two cards flipped:
        if ( currentCharacterOne && currentCharacterTwo ) {


            const currentCharacterOneAttr = currentCharacterOne.getAttribute('data-character')
            const currentCharacterTwoAttr = currentCharacterTwo.getAttribute('data-character')

            // If Pair
            if (currentCharacterOneAttr === currentCharacterTwoAttr){

                currentCharacterOne.classList.add('card--complete')
                currentCharacterTwo.classList.add('card--complete')

                // Remove card flipped right away
                currentCharacterOne.classList.remove('card--flipped')
                currentCharacterTwo.classList.remove('card--flipped')

                const completedCards = document.querySelectorAll('.card--complete')
                const amountOfCardsinDeck = allCharacters.length * 2

                if (completedCards.length === amountOfCardsinDeck){

                    winnerScreen.classList.add('winner-screen--complete')
                    winnerMoves.innerHTML = amountOfMoves
                    const win = true
                    timerStop(win)

                }
                
            } else {

                wrong = true // Prevent user from clicking to fast

                // After 1 sec remove class to turn back and enable new choices.
                setTimeout(() => {
                    currentCharacterOne.classList.remove('card--flipped')
                    currentCharacterTwo.classList.remove('card--flipped')
                    wrong = false
                }, 500)
                
            }

        }
    }

/**
 * Start and stop timer
 */
    let start = Date.now()
    let currentMinutes = 0
    let currentSeconds = 0
    let timerID

    const timerStart = () => {
        if (!timerID) {
            start = Date.now()
            timerID = setInterval(timer, 1000)
        }
    }

    const timerStop = (win) => {

        if (currentMinutes < 9){
            winnerMinutes.innerHTML = '0' + currentMinutes
        } else {
            winnerMinutes.innerHTML = currentMinutes
        }
        if (currentSeconds < 9){
            winnerSeconds.innerHTML = '0' + currentSeconds
        } else {
            winnerSeconds.innerHTML = currentSeconds
        }

        clearInterval(timerID)
        timerID = null

        currentMinutes = 0
        currentSeconds = 0

        if (win === true){
            
            setTimeout(() => {
                minutes.innerHTML = '00'
                seconds.innerHTML = '00'
            }, 1000)
            
        } else {
            minutes.innerHTML = '00'
            seconds.innerHTML = '00'
        }
    }

/**
 * Timer function
 */
    const timer = () => { // TIMERN BÖRJAR RÄKNA EFTER EN SEKUND

        const currentTime = Date.now() - start
        const timeToDisplay =  Math.floor( currentTime / 1000)
        const numberToCompare = Number.isInteger(timeToDisplay / 60)

        if (timeToDisplay < 10) {

            currentSeconds = currentSeconds + 1
            seconds.innerHTML = '0' + currentSeconds

        } else if (timeToDisplay > 9 && timeToDisplay < 60){

            currentSeconds = currentSeconds + 1
            seconds.innerHTML = timeToDisplay

        } else if (numberToCompare === true && currentMinutes < 10){

            start = Date.now()

            currentMinutes = currentMinutes + 1
            minutes.innerHTML = '0' + currentMinutes
            
            currentSeconds = 0
            seconds.innerHTML = '0' + currentSeconds

        } else {

            start = Date.now()

            currentMinutes = currentMinutes + 1
            minutes.innerHTML = currentMinutes
            
            currentSeconds = 0
            seconds.innerHTML = '0' + currentSeconds

        }
    }

/**
 * Start game
 */
    const startGame = () => {
    
        timerStart()

        startOverlay.classList.add('start--started')

    }

/**
 * Restart game
 */
    const restartGame = () => {

        cards.forEach(card => {
            card.classList.remove('card--flipped')
            card.classList.remove('card--complete')
        })
        
        amountOfMoves = 0
        moves.innerHTML = amountOfMoves

        timerStop()

        shuffleDeck()

        winnerScreen.classList.remove('winner-screen--complete')

        startOverlay.classList.remove('start--started')

    }

/**
 * Start functions
 */
    restartButtonHome.addEventListener('click', restartGame)
    restartButtonWinner.addEventListener('click', restartGame)

    startButton.addEventListener('click', startGame)

    cards.forEach(card => {
        card.addEventListener('click', flipCard)
    })

    document.addEventListener('DOMContentLoaded', shuffleDeck)


}

memoryApp()
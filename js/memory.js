const memoryApp = () => {

// Get needed elements 
    // Timer
    const minutes = document.querySelector('.score-panel__minutes')
    const seconds = document.querySelector('.score-panel_seconds')
    // Moves
    const moves = document.querySelector('.score-panel__amount-moves')
    // Start screen
    const startButton = document.querySelector('.start__button')
    const startOverlay = document.querySelector('.start')
    // Restart buttons
    const restartButtonHome = document.querySelector('.score-panel__refresh')
    const restartButtonWinner = document.querySelector('.winner-screen__refresh')
    // Winner screen
    const winnerScreen = document.querySelector('.winner-screen')
    const winnerSeconds = document.querySelector('.winner-screen__seconds')
    const winnerMinutes = document.querySelector('.winner-screen__minutes')
    const winnerMoves = document.querySelector('.winner-screen__moves')
    // Playing cards
    const cards = document.querySelectorAll('.card')

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

        const charactersToBeShuffled = allCharacters.concat(allCharacters) // double all characters (since you need a pair to play memory)

        shuffledCharacters = charactersToBeShuffled.sort(() => Math.random() -0.5) // shuffle array with random number


        cards.forEach((card, index) => {

            card.setAttribute('data-character', shuffledCharacters[index]) // give each character a card with index from newly shuffled deck

        })
        
    }
     
/**
 * The game
 */
    let wrong = false    // Create variable for wrong click
    let amountOfMoves = 0
    
    const flipCard = (event) => {
        
        amountOfMoves = amountOfMoves + 1
        moves.innerHTML = amountOfMoves // add 1 to amount of moves every time a card is clicked

        if (wrong === true) return // Preventing user to click new card before the wrong ones disappeared.
        
        event.target.parentNode.classList.add('card--flipped')
        const flippedCards = document.querySelectorAll('.card--flipped') // add class to clicked card and count all flipped cards
    
        const currentCharacterOne = flippedCards[0]
        const currentCharacterTwo = flippedCards[1] // get specific clicked cards from the array of flipped cards


        if ( currentCharacterOne && currentCharacterTwo ) { // if two cards are flipped:

            const currentCharacterOneAttr = currentCharacterOne.getAttribute('data-character')
            const currentCharacterTwoAttr = currentCharacterTwo.getAttribute('data-character') // get characters from cards to compare

            if (currentCharacterOneAttr === currentCharacterTwoAttr){ // if pair:

                currentCharacterOne.classList.add('card--complete')
                currentCharacterTwo.classList.add('card--complete') // make completed

                currentCharacterOne.classList.remove('card--flipped')
                currentCharacterTwo.classList.remove('card--flipped') // remove flipped class

                const completedCards = document.querySelectorAll('.card--complete') // amount of completed cards
                const amountOfCardsinDeck = allCharacters.length * 2 // amount of charachters

                if (completedCards.length === amountOfCardsinDeck){ // if you win (if amount of completed cards is the same as amount of characters):

                    winnerScreen.classList.add('winner-screen--complete') // show winner screen
                    winnerMoves.innerHTML = amountOfMoves // reset amout of moves
                    const win = true // for the timer to know what reason you stopped it for
                    timerStop(win) // stop timer

                }
                
            } else { // if not pair:

                wrong = true // Prevent user from clicking to fast

                setTimeout(() => {
                    currentCharacterOne.classList.remove('card--flipped')
                    currentCharacterTwo.classList.remove('card--flipped') // flip cards back
                    wrong = false
                }, 500) // flip cards back after 0.5 seconds
                
            }

        }
    }

/**
 * Start and stop timer
 */
    let start // to know when timer is started
    let timerID // id of timer (used to stop timer)
    let currentMinutes = 0
    let currentSeconds = 0

    const timerStart = () => {
        if (!timerID) { // if not already started:

            currentSeconds = currentSeconds + 1
            seconds.innerHTML = '0' + currentSeconds // set timer to one second (otherwise it will start counting one second too late)

            start = Date.now() // time when timer is started
            timerID = setInterval(timer, 1000) // start timer funciton and update every second
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
        } // show time when the timer stopped on winner screen

        clearInterval(timerID) // stop timer (by stopping the function from updating every second)
        timerID = null

        currentMinutes = 0
        currentSeconds = 0 // reset stored time

        if (win === true){ // if cause of stop is winning:
            
            setTimeout(() => {
                minutes.innerHTML = '00'
                seconds.innerHTML = '00' // reset showed time
            }, 1000) // wait to reset showed time until winner screen is shown

        } else { // if cause of stop is reset:
            minutes.innerHTML = '00'
            seconds.innerHTML = '00' // reset showed time
        }
    }

/**
 * Timer function
 */
    const timer = () => {

        const currentTime = Date.now() - start + 1000 // current time is current time minus time when the timer started (+ 1000 because that one counts in timerStart()). Gives 1000, 2000, 3000 etc
        const timeToDisplay =  Math.floor( currentTime / 1000) // convert the number from current time to seconds (1, 2, 3 ect)
        const numberToCompare = Number.isInteger(timeToDisplay / 60) // check if a minute has passed. (if the seconds divided by 60 is an interger a minute has passed. ex 57/60=0.95 -> not full minute. 60/60=1 -> full minute)

        if (timeToDisplay < 10) { // if time is under 10 seconds:

            currentSeconds = currentSeconds + 1
            seconds.innerHTML = '0' + currentSeconds // display time with a '0' before

        } else if (timeToDisplay > 9 && timeToDisplay < 60){ // if time is between 10 and 60 seconds:

            currentSeconds = currentSeconds + 1
            seconds.innerHTML = timeToDisplay // display time

        } else if (numberToCompare === true && currentMinutes < 10){ // if a full minute has passed (but less that 10)

            start = Date.now() // reset start value to count to a new minute

            currentMinutes = currentMinutes + 1
            minutes.innerHTML = '0' + currentMinutes // add one minute and display '0' minutes
            
            currentSeconds = 0 // reset current seconds
            seconds.innerHTML = '0' + currentSeconds // display '00' seconds

        } else { // if more than 10 minutes has passed

            start = Date.now()

            currentMinutes = currentMinutes + 1
            minutes.innerHTML = currentMinutes // add one minute
            
            currentSeconds = 0
            seconds.innerHTML = '0' + currentSeconds

        }
    }

/**
 * Start game
 */
    const startGame = () => {
    
        timerStart() // start timer function

        startOverlay.classList.add('start--started') // remove start screen

    }

/**
 * Restart game
 */
    const restartGame = () => {

        cards.forEach(card => {
            card.classList.remove('card--flipped')
            card.classList.remove('card--complete') // flipp all cards back
        })
        
        amountOfMoves = 0
        moves.innerHTML = amountOfMoves // reset amount of moves

        timerStop() // stop timer

        shuffleDeck() // reshuffle deck

        winnerScreen.classList.remove('winner-screen--complete') // remove winner screen

        startOverlay.classList.remove('start--started') // show start screen

    }

/**
 * Start functions
 */
    restartButtonHome.addEventListener('click', restartGame)
    restartButtonWinner.addEventListener('click', restartGame) // activate buttons to reset the game

    startButton.addEventListener('click', startGame) // activate button to start game

    cards.forEach(card => {
        card.addEventListener('click', flipCard) // to flip the clicked card
    })

    document.addEventListener('DOMContentLoaded', shuffleDeck) // shuffle deck everytime page is reloaded

}

memoryApp()
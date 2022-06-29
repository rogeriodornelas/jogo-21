import Player from '../classes/player.js';
import Deck from '../classes/deck.js';

export let playerOne = new Player(1, true)
export let playerTwo = new Player(2, false)
export let deck = new Deck()

export function currentPlayingGame() {
    if (playerOne.getStatus() == 'playing' && playerTwo.getStatus() == 'playing') {
        return true
    } else {
        return false
    }
}

function setRoundWinner(playerWinner, playerLoser) {
    playerWinner.setRoundWin()
    playerLoser.setRoundLost()
    setNewRound()
    changePlayersTurns()
    printStatus()
}

export function checkRoundWinner() {
    if (playerOne.getRoundLostOver() || playerTwo.getRoundLostOver()) {
        const playerLoser = playerOne.getRoundLostOver() ? playerOne : playerTwo
        const playerWinner = playerOne.getRoundLostOver() ? playerTwo : playerOne
        swal.fire(`Round perdido pelo player ${playerLoser.id}`)
        .then(() => {
            setRoundWinner(playerWinner, playerLoser)
        })
    } else if (playerOne.points == 21 || playerTwo.points == 21) {
        const playerWinner = playerOne.points == 21 ? playerOne : playerTwo
        const playerLoser = playerOne.points == 21 ? playerTwo : playerOne
        swal.fire(`Round ganho pelo player ${playerWinner.id}`)
        .then(() => {
            setRoundWinner(playerWinner, playerLoser)
        })
    }
}

export function updatePointsOnScreen() {
    document.querySelector('#points-p1').innerText = playerOne.points
    document.querySelector('#points-p2').innerText = playerTwo.points
    document.querySelector('#wins-p1').innerText = playerOne.getWins()
    document.querySelector('#wins-p2').innerText = playerTwo.getWins()
    document.querySelector('#losses-p1').innerHTML = playerOne.getLosts()
    document.querySelector('#losses-p2').innerHTML = playerTwo.getLosts()
}

export function changePlayersTurns() {
    playerOne.changeTurn()
    playerTwo.changeTurn()
    if (currentPlayingGame) {
        document.querySelector('#player1-img').classList.toggle('active')
        document.querySelector('#player2-img').classList.toggle('active')
    }
}

export function setNewRound() {
    restartGame()
}

export function restartGame() {
    playerOne.restartPoints()
    playerTwo.restartPoints()
    updatePointsOnScreen()
    deck.resetPiles()
}

export function sumPointsToPlayer(points) {
    let player = playerOne.getTurn()==true ? playerOne : playerTwo 
    if (points) {
        player.sumPoints(points)
    }
    updatePointsOnScreen()
}

export function printStatus() {
    console.log(deck._notUsedCards)
    console.log(deck._usedCards)
    console.log(playerOne, playerTwo)
    console.log('------------------------------------------------')
}
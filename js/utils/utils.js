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

// export function checkRoundWinner() {

// }

export function updatePointsOnScreen() {
    document.querySelector('#points-p1').innerText = playerOne.points
    document.querySelector('#points-p2').innerText = playerTwo.points
    console.log(playerOne, playerTwo)
}

export function changePlayersTurns() {
    playerOne.changeTurn()
    playerTwo.changeTurn()
    if (currentPlayingGame) {
        document.querySelector('#player1-img').classList.toggle('active')
        document.querySelector('#player2-img').classList.toggle('active')
    }
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
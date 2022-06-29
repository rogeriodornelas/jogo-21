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
    printStatus()
}

export function checkRoundWinner() {
    if (playerOne.getRoundLostOver() || playerTwo.getRoundLostOver()) {
        const playerLoser = playerOne.getRoundLostOver() ? playerOne : playerTwo
        const playerWinner = playerOne.getRoundLostOver() ? playerTwo : playerOne
        Swal.fire(`Round perdido pelo player ${playerLoser.id}`)
        .then(() => {
            setRoundWinner(playerWinner, playerLoser)
        })
    } else if (playerOne.points == 21 || playerTwo.points == 21) {
        const playerWinner = playerOne.points == 21 ? playerOne : playerTwo
        const playerLoser = playerOne.points == 21 ? playerTwo : playerOne
        Swal.fire(`Round ganho pelo player ${playerWinner.id}`)
        .then(() => {
            setRoundWinner(playerWinner, playerLoser)
        })
    } else if (playerOne.getIfPlayedOnTurn() && playerTwo.getIfPlayedOnTurn()) {
        const playerPlayedLast = playerTwo.getIfCurrentTurn() && playerTwo.getIfPlayedOnTurn() ? playerTwo : playerOne
        const playerPlayedFirst = playerTwo.getIfCurrentTurn() && playerTwo.getIfPlayedOnTurn() ? playerOne : playerTwo
        if (playerPlayedLast.points > playerPlayedFirst.points) {
            Swal.fire(`Round ganho pelo player ${playerPlayedLast.id}`)
            .then(() => {
                setRoundWinner(playerPlayedLast, playerPlayedFirst)
            })
        }
    }
}

export function updatePointsOnScreen() {
    document.querySelector('#points-p1').innerText = playerOne.points
    document.querySelector('#points-p2').innerText = playerTwo.points
    document.querySelector('#wins-p1').innerText = playerOne.getWins()
    document.querySelector('#wins-p2').innerText = playerTwo.getWins()
    document.querySelector('#losses-p1').innerHTML = playerOne.getLosts()
    document.querySelector('#losses-p2').innerHTML = playerTwo.getLosts()
    document.querySelector('#draws-p1').innerHTML = playerOne.getDraws()
    document.querySelector('#draws-p2').innerHTML = playerTwo.getDraws()
}

export function changePlayersTurns() {
    if (playerOne.points > 0 || playerTwo.points > 0) {
        playerOne.changeTurn()
        playerTwo.changeTurn()
        document.querySelector('#player1-img').classList.toggle('active')
        document.querySelector('#player2-img').classList.toggle('active')
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Você não pode mudar de turno sem retirar pelo menos uma carta.',
          })
    }
}

export function setNewRound() {
    changePlayersTurns()
    playerOne.restartPoints()
    playerOne.newTurn()
    playerTwo.restartPoints()
    playerTwo.newTurn()
    updatePointsOnScreen()
    deck.resetPiles()
}

export function drawGame() {
    if (playerOne.points == playerTwo.points && playerOne.points != 0) {
        Swal.fire('Empate!').then(()=>{
            playerOne.setDraw()
            playerTwo.setDraw()
            setNewRound()
            printStatus()
        })
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Os dois jogadores devem ter jogado e seus pontos devem ser iguais para empatar!'
        })
    }
}

export function restartGame() {
    Swal.fire({
        title: 'Tem certeza que deseja reiniciar a partida?',
        text: "A pontuação dos jogadores será zerada",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim'
      }).then((result) => {
        if (result.isConfirmed) {
            document.querySelector('#player1-img').classList.add('active')
            document.querySelector('#player2-img').classList.remove('active')
            playerOne = new Player(1, true)
            playerTwo = new Player(2, false)
            updatePointsOnScreen()
            deck.resetPiles()
            Swal.fire('A partida foi reiniciada')
        }
      })
}

export function sumPointsToPlayer(points) {
    let player = playerOne.getIfCurrentTurn()==true ? playerOne : playerTwo 
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
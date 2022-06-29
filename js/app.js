import * as ut from './utils/utils.js'; //the players objects are in this import

const buttonChangeTurns = document.querySelector('#button-change-turn')
const buttonResetGame = document.querySelector('#button-reset-game')
const buttonDrawGame = document.querySelector('#button-draw-game')
const notUsedCardsPile = document.querySelector('#cards-pile')

buttonChangeTurns.addEventListener('click', ()=>{
    ut.changePlayersTurns()
    ut.updatePointsOnScreen()
    ut.printStatus()
})

notUsedCardsPile.addEventListener('click', ()=>{
    let card = ut.deck.getACard()
    ut.sumPointsToPlayer(card)
    ut.updatePointsOnScreen()
    ut.checkRoundWinner()
    ut.printStatus()
})

buttonResetGame.addEventListener('click', ut.restartGame)

buttonDrawGame.addEventListener('click', ut.drawGame)

ut.printStatus()

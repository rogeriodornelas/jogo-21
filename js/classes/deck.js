export default class Deck {
    constructor() {
        this._notUsedCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].sort(() => Math.random() - 0.5)
        this._usedCards = []
    }

    getACard() {
        let card = this._notUsedCards.pop()
        if (card) {
            this._usedCards.push(card)
            document.querySelector('#card').style.display = ''
            document.querySelector('#card').src = `./assets/cards/${card}.png`
        }
        return card
    }

    resetPiles() {
        this._notUsedCards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].sort(() => Math.random() - 0.5)
        this._usedCards = []
        document.querySelector('#card').style.display = 'none'
    }
}
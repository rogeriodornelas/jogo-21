export default class Player {
    constructor(id, currentTurn) {
        this.id = id
        this.points = 0
        this._currentTurn = currentTurn
        this._status = 'playing' // can be won, lost or playing
        this._playedOnTurn = currentTurn
        this._wins = 0
        this._losts = 0
        this._draw = 0
    }

    sumPoints(points) {
        if (this._currentTurn) {
            this.points += points
        }
        return this.points
    }

    restartPoints() {
        this.points = 0
    }

    getRoundLostOver() {
        if (this.points > 21) {
            return true
        } else if (this.points) {
            return false
        }
    }

    setRoundPlayed() {
        this._playedOnTurn = true
    }

    setRoundNotPlayed() {
        this._playedOnTurn = false
    }

    getWins() {
        return this._wins
    }

    setRoundWin() {
        this._wins += 1
        return this.getWins()
    }

    getLosts() {
        return this._losts
    }

    setRoundLost() {
        this._losts += 1
        return this.getWins()
    }

    setDraw() {
        this._draw += 1
    }

    getDraws() {
        return this._draw
    }

    getStatus() {
        return this._status
    }

    restartStatus() {
        this._status = 'playing'
    }

    getIfCurrentTurn() {
        return this._currentTurn
    }

    getIfPlayedOnTurn() {
        return this._playedOnTurn
    }

    changeTurn() {
        if (this._currentTurn) {
            this._currentTurn = false
        } else {
            this._currentTurn = true
            this._playedOnTurn = true
        }
    }

    newTurn() {
        if (this._currentTurn) {
            this._playedOnTurn = true
        } else {
            this._playedOnTurn = false
        }
    }

    restartAttributes() {
        this.restartPoints()
        this.restartStatus()
    }
}

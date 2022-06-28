export default class Player {
    constructor(id, currentTurn) {
        this._id = id
        this.points = 0
        this._currentTurn = currentTurn
        this._status = 'playing' // can be won, lost or playing
        this._wins = 0
        this._losts = 0
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

    getStatus() {
        return this._status
    }

    restartStatus() {
        this._status = 'playing'
    }

    getTurn() {
        return this._currentTurn
    }

    changeTurn() {
        if (this._currentTurn) {
            this._currentTurn = false
        } else {
            this._currentTurn = true
        }
    }

    restartAttributes() {
        this.restartPoints()
        this.restartStatus()
    }
}

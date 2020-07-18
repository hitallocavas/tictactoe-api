module.exports = class Board {

    constructor() {
        // game over positions to check on play
        this.gameOverPositions = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [7, 5, 3]
        ]


        // enumered positions to facilitate play
        this.enumPositions = [
            { x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 },
            { x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 },
            { x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }
        ]

        // matrix with board positions
        this.matrix = [
            ['1', '2', '3'],
            ['4', '5', '6'],
            ['7', '8', '9']
        ]

        // set actual to first user
        this.actual = 'X';
    }

    // set actual to opponent
    reverseActual() {
        switch (this.actual) {
            case 'X':
                this.actual = 'O';
                break;
            case 'O':
                this.actual = 'X';
                break;
            default:
                console.log('Actual is not valid');
        }
    }

    // draws board with actual context
    drawBoard() {
        let boardContext = "";
        for (let posX = 0; posX < this.matrix.length; posX++) {
            for (let posY = 0; posY < this.matrix.length; posY++) {
                boardContext = boardContext + this.matrix[posX][posY] + '    ';
            }
            boardContext = boardContext + '\n\n';
        }
        return boardContext;
    }

    // check if matrix position content is valid
    hasPlayedContent(enumPosition) {
        let pos = ['X', 'O']
        return pos.includes(this.matrix[enumPosition.x][enumPosition.y]);
    }

    // check mate positions
    hasEqualContents(enumPositions) {
        const firstPosition = enumPositions[0];
        const firstCharacter = this.matrix[firstPosition.x][firstPosition.y];

        for (let index = 1; index < enumPositions.length; index++) {
            let actualPosition = enumPositions[index];
            let actualCharacter = this.matrix[actualPosition.x][actualPosition.y];
            if (actualCharacter !== firstCharacter) {
                return false;
            }
        }

        return true;
    }

    winnerMessage(enumPosition) {
        let posX = enumPosition.x;
        let posY = enumPosition.y;

        return "<" + this.matrix[posX][posY] + "> VENCEU O JOGO!";
    }

    checkGameOver() {
        for (let index = 0; index < this.gameOverPositions.length; index++) {
            let enumPosition1 = this.enumPositions[this.gameOverPositions[index][0] - 1];
            let enumPosition2 = this.enumPositions[this.gameOverPositions[index][1] - 1];
            let enumPosition3 = this.enumPositions[this.gameOverPositions[index][2] - 1];

            let canCheckGameOver = this.hasPlayedContent(enumPosition1) &&
                this.hasPlayedContent(enumPosition2) &&
                this.hasPlayedContent(enumPosition3);

            if (canCheckGameOver && this.hasEqualContents([enumPosition1, enumPosition2, enumPosition3])) {
                return this.winnerMessage(enumPosition1)
            }

        }

        return this.drawBoard();
    }

    add(pos) {
        let position = this.enumPositions[pos - 1];
        let posX = position.x;
        let posY = position.y;
        this.matrix[posX][posY] = this.actual;
        this.reverseActual();
        return this.checkGameOver();
    }

}
import letters from './letters'

function convertToFlatBinaryBoard (board: [Array<boolean>, Array<boolean>]): Array<number> {
    const binaryBoard: Array<number> = []
    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            binaryBoard[(i * (board[i].length)) + j] = Number(board[i][j])
        }
    }
    return binaryBoard
}

function getScore (letter: string, binaryBoard: Array<number>): number {
    let score = 0
    const letterBits = letters[letter]
    for (let i = 0; i < binaryBoard.length; i++) {
        score += Math.abs(binaryBoard[i] - letterBits[i])
    }
    return score
}

export default function getNearestLetter (board: [Array<boolean>, Array<boolean>]): string {
    const binaryBoard = convertToFlatBinaryBoard(board)
    const scores: { [name: string]: number } = {}
    for (const letter in letters) {
        const score = getScore(letter, binaryBoard)
        scores[letter] = score
    }

    let lowestScore = 8 // highest possible score to still be considered a match
    let lowestScoreLetter = 'UNKNOWN'

    for (const letter in scores) {
        const score = scores[letter]
        if (score < lowestScore) {
            lowestScore = score
            lowestScoreLetter = letter
        }
    }

    return lowestScoreLetter
}

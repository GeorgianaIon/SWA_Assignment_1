export type Generator<T>= { next:() => T } 

export type Position = {
    row: number,
    col: number
}    

export type Match<T> = {
    matched: T,
    positions: Position[]
}    

export type Board<T> = {
    width: number,
    height: number,
    pieces: T[][]
};

export type Effect<T> = {
    kind: "Match" | "Refill",
    board?: Board<T>,
    match?: Match<T>
};

export type MoveResult<T> = {
    board: Board<T>,
    effects: Effect<T>[]
}    

export function create<T>(generator: Generator<T>, width: number, height: number): Board<T> {
    
    let pieces = []

    for (let i = 0; i < height; i++) {
        pieces[i] = [];
        for (let j = 0; j < width; j++) {
            pieces[i][j] = generator.next()
        }
    }

    return {
        width,
        height,
        pieces
    }
}    

export function piece<T>(board: Board<T>, p: Position): T | undefined {    
    return board.pieces[p.row] ? board.pieces[p.row][p.col] : undefined
}    

export function canMove<T>(board: Board<T>, first: Position, second: Position): boolean {
    if (!piece(board, first) || !piece(board, second))
    {
        return false
    }

    if (first.row !== second.row && first.col !== second.col)
    {
        return false
    }

    swap(board, first, second)
    if (!isValidMatch(board, first) && !isValidMatch(board, second))
    {
        swap(board, first, second)
        return false
    }
    swap(board, first, second)
    return true
}

export function move<T>(generator: Generator<T>, board: Board<T>, first: Position, second: Position): MoveResult<T> {
    
    let effects: Effect<T>[] = []
    if (!canMove(board, first, second))
    {
        return {
            board,
            effects
        }
    }
    
    swap(board, first, second)
    let matches = getValidMatches(board, second)
    matches = matches.concat(getValidMatches(board, first))

    effects = matches.map((match) => {
        return {
            kind: "Match",
            match
        }
    })

    let replacePositions: Position[] = []
    matches.forEach(match => {
        replacePositions = replacePositions.concat(match.positions)
    });

    for (let i = 0; i < board.height; i++) {
        for (let j = 0; j < board.width; j++) {
            if (replacePositions.includes({row: i, col: j}))
            {
                board.pieces[i][j] = undefined;
            }
        }
    }

    effects.push({
        kind: "Refill",
        board
    })
    
    return {
        board,
        effects
    }
}

export function positions<T>(board: Board<T>): Position[]
{
    let positions: Position[] = []
    for (let i = 0; i < board.height; i++) {
        for (let j = 0; j < board.width; j++) {
            positions.push({
                row: i,
                col: j
            })
        }
    }

    return positions
}

function getValidMatches<T>(board: Board<T>, position: Position): Match<T>[]
{
    let col = position.col;
    let row = position.row
    let value = board.pieces[position.row][position.col]
    let matches: Match<T>[] = []

    if (piece(board, {row: row + 1, col}) === value && piece(board, {row: row - 1, col}) === value)
    {
        matches.push({matched: value, positions: [{row: row - 1, col}, {row, col}, {row: row + 1, col}]})
    }
    if (piece(board, {row, col: col + 1}) === value && piece(board, {row, col: col - 1}) === value)
    {
        matches.push({matched: value, positions: [{row, col: col - 1}, {row, col}, {row, col: col + 1}]})
    }
    if (piece(board, {row: row + 1, col}) === value && piece(board, {row: row + 2, col}) === value)
    {
        matches.push({matched: value, positions: [{row, col}, {row: row + 1, col}, {row: row + 2, col}]})
    }
    if (piece(board, {row, col: col + 1}) === value && piece(board, {row, col: col + 2}) === value)
    {
        matches.push({matched: value, positions: [{row, col}, {row, col: col + 1}, {row, col: col + 2}]})
    }
    if (piece(board, {row: row - 1, col}) === value && piece(board, {row: row - 2, col}) === value)
    {
        matches.push({matched: value, positions: [{row: row - 2, col}, {row: row - 1, col}, {row, col}]})
    }
    if (piece(board, {row, col: col - 1}) === value && piece(board, {row, col: col - 2}) === value)
    {
        matches.push({matched: value, positions: [{row, col: col - 2}, {row, col: col - 1}, {row, col}]})
    }
    return matches
}

function isValidMatch<T>(board: Board<T>, position: Position): boolean
{
    return getValidMatches(board, position).length > 0
}

function swap<T>(board: Board<T>, first: Position, second: Position): void {
    let value1 = piece(board, first)
    let value2 = piece(board, second)

    board.pieces[first.row][first.col] = value2
    board.pieces[second.row][second.col] = value1
}
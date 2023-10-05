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
    return {
        width,
        height,
        pieces: [...new Array(height)].map(_ => [...new Array(width)].map(_ => generator.next()))
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
    if (!isValidMatch(board, first, board.pieces[first.row][first.col]) && !isValidMatch(board, second, board.pieces[second.row][second.col]))
    {
        swap(board, first, second)
        return false
    }
    
    swap(board, first, second)
    return true
}

export function move<T>(generator: Generator<T>, board: Board<T>, first: Position, second: Position): MoveResult<T> {
    if (!canMove(board, first, second)) {
        return {
            board,
            effects: []
        }
    }

    swap(board, first, second)

    return {
        board,
        effects: handleNewMatches(generator, board, [])
    }
}

export function positions<T>(board: Board<T>): Position[]
{
    return board.pieces.flatMap((row, ir) => {
        return row.map((_, ic) => {
            return {
                row: ir,
                col: ic
            }
        })
    })
}

const getValidMatches = <T>(board: Board<T>, position: Position, matches: Match<T>[], value: T): Match<T>[] => {
    if (piece(board, {row: position.row + 1, col: position.col}) === value && piece(board, {row: position.row - 1, col: position.col}) === value)
    {
        matches.push({matched: value, positions: [{row: position.row - 1, col: position.col}, {row: position.row, col: position.col}, {row: position.row + 1, col: position.col}]})
    }
    if (piece(board, {row: position.row, col: position.col + 1}) === value && piece(board, {row: position.row, col: position.col - 1}) === value)
    {
        matches.push({matched: value, positions: [{row: position.row, col: position.col - 1}, {row: position.row, col: position.col}, {row: position.row, col: position.col + 1}]})
    }
    if (piece(board, {row: position.row + 1, col: position.col}) === value && piece(board, {row: position.row + 2, col: position.col}) === value)
    {
        matches.push({matched: value, positions: [{row: position.row, col: position.col}, {row: position.row + 1, col: position.col}, {row: position.row + 2, col: position.col}]})
    }
    if (piece(board, {row: position.row, col: position.col + 1}) === value && piece(board, {row: position.row, col: position.col + 2}) === value)
    {
        matches.push({matched: value, positions: [{row: position.row, col: position.col}, {row: position.row, col: position.col + 1}, {row: position.row, col: position.col + 2}]})
    }
    if (piece(board, {row: position.row - 1, col: position.col}) === value && piece(board, {row: position.row - 2, col: position.col}) === value)
    {
        matches.push({matched: value, positions: [{row: position.row - 2, col: position.col}, {row: position.row - 1, col: position.col}, {row: position.row, col: position.col}]})
    }
    if (piece(board, {row: position.row, col: position.col - 1}) === value && piece(board, {row: position.row, col: position.col - 2}) === value)
    {
        matches.push({matched: value, positions: [{row: position.row, col: position.col - 2}, {row: position.row, col: position.col - 1}, {row: position.row, col: position.col}]})
    }

    return matches
}

const isValidMatch = <T>(board: Board<T>, position: Position, value: T): boolean => {
    return getValidMatches(board, position, [], value).length > 0
}

const swap = <T>(board: Board<T>, first: Position, second: Position): void => {
    [board.pieces[first.row][first.col], board.pieces[second.row][second.col]] = [board.pieces[second.row][second.col], board.pieces[first.row][first.col]]
}

const registerMatches = <T>(matches: Match<T>[], effects: Effect<T>[]): Effect<T>[] => {
    matches.forEach((match) => {
        effects = [...effects, {kind: "Match", match}]
    })

    return effects
}

const getAllMatches = <T>(board: Board<T>, matches: Match<T>[]): Match<T>[] => {
    board.pieces.forEach((row, ir) => {
        row.forEach((_, ic) => {
            if (!matches.some(match => match.positions.some(position => position.row === ir && position.col === ic))) {
                matches = matches.concat(getValidMatches(board, {row : ir, col : ic}, [], board.pieces[ir][ic]))
            }
        })
    })

    return matches
}

const removeMatches = <T>(board: Board<T>, positions: Position[]): void => {
    board.pieces.forEach((row, ir) => {
        row.forEach((_, ic) => {
            if (positions.some(position => position.row === ir && position.col === ic))
            {
                board.pieces[ir][ic] = undefined;
            }
        })
    })
}

const refill = <T>(generator: Generator<T>, board: Board<T>): void => {
    board.pieces[0] = board.pieces[0].map(col => {
        if (col === undefined) {
            col = generator.next()
        }
        
        return col
    })

    shiftTilesDown(board)

    if (board.pieces[0].some(piece => piece === undefined)) {
        refill(generator, board)
    }
}

const shiftTilesDown = <T>(board: Board<T>): void => {
    board.pieces.forEach((row, ir) => {
        row.forEach((_, ic) => {
            if (ir < board.height-1 && board.pieces[ir][ic] !== undefined && board.pieces[ir+1][ic] === undefined) 
            {
                board.pieces[ir+1][ic] = board.pieces[ir][ic]
                board.pieces[ir][ic] = undefined
                shiftTilesDown(board)
            }
        })
    })
}

const handleNewMatches = <T>(generator: Generator<T>, board: Board<T>, effects: Effect<T>[]): Effect<T>[] => {
    if (getAllMatches(board, []).length) {
        effects = registerMatches(getAllMatches(board, []), effects)
        removeMatches(board, getAllMatches(board, []).flatMap(match => match.positions))
        shiftTilesDown(board);
        refill(generator, board)
        effects = handleNewMatches(generator, board, [...effects, {kind: "Refill", board: board}])
    }
    
    return effects
}

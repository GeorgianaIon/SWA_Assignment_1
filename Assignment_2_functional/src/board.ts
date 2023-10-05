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

    let copyBoard: Board<T> = JSON.parse(JSON.stringify(board))
    swap(copyBoard, first, second)
    if (!isValidMatch(copyBoard, first) && !isValidMatch(copyBoard, second))
    {
        return false
    }
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
    let replacePositions = GetAllMatches(board, effects, first, second)
    RemoveMatches(board, replacePositions)
    ShiftTilesDown(board);
    Refill(generator, board, effects)
    HandleNewMatches(generator, board, effects)
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

function GetAllMatches<T>(board: Board<T>, effects: Effect<T>[], first: Position = undefined, second: Position = undefined): Position[]
{
    let matches: Match<T>[] = []

    if(first !== undefined && second !== undefined)
    {
        matches = matches.concat(getValidMatches(board, first))
        matches = matches.concat(getValidMatches(board, second))
    }
    else 
    {
        for (let i = 0; i < board.height; i++) {
            for (let j = 0; j < board.width; j++) {
                if (!matches.some(match => match.positions.some(position => position.row === i && position.col === j)))
                {
                matches = matches.concat(getValidMatches(board, {row : i, col : j}))
                }
            }
        }
    }

    matches.forEach((match) => {
        effects.push({
            kind: "Match",
            match
        })
    })

    let replacePositions: Position[] = []
    matches.forEach(match => {
        replacePositions = replacePositions.concat(match.positions)
    })


    return replacePositions
}


function RemoveMatches<T>(board: Board<T>, replacePositions: Position[]): void {
    for (let i = 0; i < board.height; i++) {
        for (let j = 0; j < board.width; j++) {
            if (replacePositions.some(position => {return position.row === i && position.col === j}))
            {
                board.pieces[i][j] = undefined;
            }
        }
    }
}

function Refill<T>(generator: Generator<T>, board: Board<T>, effects: Effect<T>[]): void {
    
    let doesRefill = false
    for (let i = 0; i < board.width; i++) 
    {
        if (board.pieces[0][i] === undefined)
        {
            board.pieces[0][i] = generator.next()
            doesRefill = true
        }
    }
    ShiftTilesDown(board)

    if (doesRefill) {
        Refill(generator, board, effects)
    }
    else {
        effects.push({
            kind: "Refill",
            board
        })
    }
}

function ShiftTilesDown<T>(board: Board<T>): void {
    let shifted = false;
    for (let i = 0; i < board.height - 1; i++) {
        for (let j = 0; j < board.width; j++) {
            if (board.pieces[i][j] !== undefined && board.pieces[i+1][j] === undefined) 
            {
                board.pieces[i+1][j] = board.pieces[i][j]
                board.pieces[i][j] = undefined
                shifted = true
            }
        }
    }
    if (shifted)
    {
        ShiftTilesDown(board)
    }
}


function HandleNewMatches<T>(generator: Generator<T>, board: Board<T>, effects: Effect<T>[])
{
    let replacePositions = GetAllMatches(board, effects)
    if (replacePositions.length)
    {
        RemoveMatches(board, replacePositions)
        ShiftTilesDown(board);
        Refill(generator, board, effects)
        HandleNewMatches(generator, board, effects)
    }
}

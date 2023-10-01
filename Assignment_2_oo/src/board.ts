export type Generator<T> = { next: () => T }

export type Position = {
    row: number,
    col: number
}

export type Piece<T> = {
    position: Position;
    value: T;
}

export type Match<T> = {
    matched: T,
    positions: Position[]
}

export type BoardEvent<T> = {
    kind: `Match` | `Refill`,
    match: Match<T>[]
};

export type BoardListener<T> = (event: T) => void

/**
 * @param 
 */
export class Board<T> {
    width: number;
    height: number;
    listeners: BoardListener<T>[] = [];
    generator: Generator<T>;
    tiles: Piece<T>[][];

    constructor(generator: Generator<T>, columns: number, rows: number) {
        this.width = columns;
        this.height = rows;
        this.generator = generator;
        this.tiles = this.initializeBoard();
    }

    private initializeBoard(): Piece<T>[][] {
        const grid: Piece<T>[][] = [];

        for (let row = 0; row < this.height; row++) {
            const rowArray: Piece<T>[] = [];
            for (let col = 0; col < this.width; col++) {
                const value = this.generator.next();
                rowArray.push({ position: { row, col }, value });
            }
            grid.push(rowArray);
        }

        return grid;
    }

    private addListener(listener: BoardListener<T>) {
        this.listeners.push(listener);
    }

    piece(position: Position): T | undefined {
        //check for undefined
        if (this.isIncorectPosition(position)) {
            return undefined;
        }
        const piece = this.tiles[position.row][position.col];
        return piece ? piece.value : undefined;
    }

    positions(): Position[] {
        const positions: Position[] = [];
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                positions.push({ row, col });
            }
        }
        return positions;
    }

    canMove(first: Position, second: Position): boolean {
        if(this.isIncorectPosition(first) || this.isIncorectPosition(second)) {
            return false;
        }

        if(first.col === second.col && first.row == second.row) {
            return false;
        }

        if(!(first.col === second.col || first.row === second.row)) {
            return false;
        }

        if (this.piece(second) && this.piece(first)) {
            if (first.col === second.col || first.row === second.row) {
                // initialises a new board after the swipes of the 2 pieces
                const board: Board<T> = JSON.parse(JSON.stringify(this)) as Board<T>;
                board.tiles[first.row][first.col] = this.tiles[second.row][second.col];
                board.tiles[second.row][second.col] = this.tiles[first.row][first.col];
                if (this.findMatches(board).length <= 0) return false;
            }
        }
        return true;
    }

    move(first: Position, second: Position) {
    }

    findMatches(board:  Board<T>) : Match<T>[] {
        const matches: Match<T>[] = [];
        // keep track of current match
        // Horizontal moves - left to right
        const match: Match<T> = { matched: undefined, positions: []};
        for (let i = 0; i < board.height; i++) {
            for (let j = 0; j < board.width - 1; j++) {
                // checking whether the current element's value is the same as the next one
                if (board.tiles[i][j].value === board.tiles[i][j + 1].value) {
                    const lastPositionInMatch = match.positions.length > 0 ? match.positions[match.positions.length - 1] : undefined
                    const isDiffPositionFromMatches = !(lastPositionInMatch === board.tiles[i][j].position);
                    if(isDiffPositionFromMatches)
                    {
                        match.positions.push({row: i, col: j})
                    } 
                    // set position to the next element
                    match.matched = board.tiles[i][j + 1].value;
                    // push position of the next val
                    match.positions.push({row: i, col: j + 1})
                } else {
                    this.HandleMatches(match, matches);
                }
            }
            this.HandleMatches(match, matches);
        }
        // Vertical - from top to bottom
        for (let j = board.width - 1; j >= 0; j--) {
            for (let i = 0; i < board.height - 1; i++) {
                if (board.tiles[i][j].value === board.tiles[i + 1][j].value) {
                        const lastPositionInMatch = match.positions.length > 0 ? match.positions[match.positions.length - 1] : undefined
                        const isDiffPositionFromMatches = !(lastPositionInMatch === board.tiles[i][j].position);
                        if(isDiffPositionFromMatches) 
                        {
                            match.positions.push({row: i, col: j})
                        }
                        match.matched = board.tiles[i + 1][j].value;
                        match.positions.push({row: i + 1, col: j})
                } else {
                    this.HandleMatches(match, matches);
                } 
            }
            this.HandleMatches(match, matches);
        }
        return matches;
    }

    private HandleMatches(match: Match<T>, matches: Match<T>[]) : void {
        if (match.positions.length < 3) {
            // Reset
            match.positions = [];
        } else {
            matches.push({ ...match });
            match.positions = [];
        }    
    }
    /**
     * Prevents the player from making incorrect moves
     * Swapping two positions that are outside the board
     * @param position that is to be moved
     * @returns boolean
     */
    isIncorectPosition(position: Position | undefined): boolean {
        if (position === undefined) {
            return true;
        }
        if (position.row >= this.height || position.row < 0) {
            return true;
        }
        if (position.col >= this.width || position.col < 0) {
            return true;
        }
        return false;
    }
}



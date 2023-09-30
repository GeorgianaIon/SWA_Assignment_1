export type Generator<T>= { next:() => T } 

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
    pieces: Piece<T>[]

    constructor(generator: Generator<T>, columns: number, rows: number) {
        this.width = columns;
        this.height = rows;
        this.generator = generator;
    }
    addListener(listener: BoardListener<T>) {
        this.listeners.push(listener);
    }

    piece(position: Position): T | undefined {
        //check for undefined
        if(this.isIncorectPosition(position)) {
            return undefined;
        }
        this.piecePosition(position);
    }

    positions() : Position[] {
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
        // another check for the missing test
        return true;
    }
    
    move(first: Position, second: Position) {
        const firstPiece = this.piecePosition(first);
        const secondPiece = this.piecePosition(second);

        
    }

    refillBoardEvent(): void {
        for(let row = 0; row < this.height; row++) {
            for(let col =0; col< this.width; col++) {

            }
        }
    }

    getRowMatches(row: number): void {
        let pieces = this.getPiecesInRow(row);
        
    }

    /**
     * Prevents the player from making incorrect moves
     * Swapping two positions that are outside the board
     * @param position that is to be moved
     * @returns boolean
     */
    isIncorectPosition(position: Position | undefined) : boolean {
        if (position === undefined) {
            return true;
        }
        if(position.row >= this.height || position.row < 0) {
            return true;
        }
        if(position.col >= this.width || position.col < 0) {
            return true;
        }
        return false;
    }

    /**
     * 
     * @param index of column
     * @returns an array of all pieces in a specified column
     */
    getPiecesInColumn(index: number): Piece<T>[] {
        return this.pieces.filter(element => {
            return element.position.col === index;
        })
    }

    /**
     * 
     * @param index of the row
     * @returns an array of all pieces in the specified row
     */
    getPiecesInRow(index: number): Piece<T>[] {
        return this.pieces.filter(element => {
            return element.position.row === index;
        })
    }

    /**
    * Returns the piece on the position given
    * @param position
    */
    piecePosition(position: Position) : Piece<T> {
        return this.pieces.find(element => {
            if(element.position.row === position.row && element.position.col === position.col) {
                return element;
            }
        });
    }
}



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

    constructor(columns: number, rows: number, generator: Generator<T>) {
        this.width = columns;
        this.height = rows;
        this.generator = generator;
    }
    addListener(listener: BoardListener<T>) {
        this.listeners.push(listener);
    }

    piece(p: Position): T | undefined {

    }

    canMove(first: Position, second: Position): boolean {

    }
    
    move(first: Position, second: Position) {
        const firstPiece = this.#piecePosition(first);
        const secondPiece = this.#piecePosition(second);

        
    }

    #refillBoardEvent(): void {
        for(let row = 0; row < this.height; row++) {
            for(let col =0; col< this.width; col++) {

            }
        }
    }

    /**
     * 
     * @param index of column
     * @returns an array of all pieces in a specified column
     */
    #getPiecesInColumn(index: number): Piece<T>[] {
        return this.pieces.filter(element => {
            return element.position.col === index;
        })
    }

    /**
     * 
     * @param index of the row
     * @returns an array of all pieces in the specified row
     */
    #getPiecesInRow(index: number): Piece<T>[] {
        return this.pieces.filter(element => {
            return element.position.row === index;
        })
    }

    /**
    * Returns the piece on the position given
    * @param position
    */
    #piecePosition(position: Position) : Piece<T> {
        return this.pieces.find(element => {
            if(element.position.row === position.row && element.position.col === position.col) {
                return element;
            }
        });
    }
}



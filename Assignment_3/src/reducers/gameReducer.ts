import * as BoardModel from '../models/board'
import { createSlice } from '@reduxjs/toolkit'

let images: string[] = ["../images/cat1.png", "../images/cat2.png", "../images/cat3.png", "../images/cat4.png", "../images/cat5.jpg"]

export interface StateData {
    score: number,
    gameId: number,
    maxMoveNumber: number,
    currentMoveNumber: number,
    board: BoardModel.Board<string>
}

class RandomGenerator implements BoardModel.Generator<string> {
    private sequence: string[]

    constructor(sequence: string[]) {
        this.sequence = sequence
    }

    next(): string {
        return this.sequence[Math.floor(Math.random() * this.sequence.length)]
    }
}

const generator: RandomGenerator = new RandomGenerator(images)

const initialState: StateData = {
    gameId: -1,
    score: 0,
    maxMoveNumber: 25,
    currentMoveNumber: 0,
    board: BoardModel.create(generator, 6, 6)
}

export const slice = createSlice ({
    name: 'game',
    initialState: initialState, 
    reducers : {
        setInitialBoardGame: (state) => {
            return {
                ...state,
                board: BoardModel.create(generator, 6, 6)
            }
        },
    }
})

export const { setInitialBoardGame } = slice.actions;
export default slice.reducer
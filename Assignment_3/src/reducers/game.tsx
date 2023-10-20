import { LoginModel } from '../models/apiModels'
import * as BoardModel from '../models/board'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

let images: string[] = ["../images/cat1.png", "../images/cat2.png", "../images/cat3.png", "../images/cat4.png", "../images/cat5.jpg"]

export interface StateData {
    token: string,
    userId: number,
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

const initialState : StateData = {
    token: "",
    userId: -1,
    gameId: -1,
    score: 0,
    maxMoveNumber: 25,
    currentMoveNumber: 0,
    board: BoardModel.create(generator, 6, 6)
}

export const slice = createSlice ({
    name: 'slice',
    initialState: initialState, 
    reducers : {
        login: (state: StateData, action: PayloadAction<LoginModel>) => {
            state = { ...initialState };
            state.token = action.payload.token
            state.userId = action.payload.userId
            return state;
        },
        logout: (state: StateData) => {
            state = { ...initialState };
            return state;
        },
        setInitialBoardGame: (state: StateData) => {
            state.board = BoardModel.create(generator, 6, 6)
            return state;
        },
    }
})

export const {
    login,
    logout,
    setInitialBoardGame} = slice.actions;
export default slice.reducer
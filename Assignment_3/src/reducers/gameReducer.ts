import * as BoardModel from '../models/board'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface StateData {
    score: number,
    gameId: number,
    maxMoveNumber: number,
    currentMoveNumber: number,
    board: BoardModel.Board<string>
}

const initialState: StateData = {
    gameId: -1,
    score: 0,
    maxMoveNumber: 25,
    currentMoveNumber: 0,
    board: undefined,
}

export const slice = createSlice ({
    name: 'game',
    initialState: initialState, 
    reducers : {
        setInitialBoardGame: (state, action: PayloadAction<{board: BoardModel.Board<string>, gameId: number}>) => {
            return {
                ...initialState,
                board: action.payload.board,
                gameId: action.payload.gameId,
            }
        },
        boardMoveUpdate: (state, action: PayloadAction<{board: BoardModel.Board<string>, score: number}>) => {
            return {
                ...state,
                board: action.payload.board,
                score: state.score + action.payload.score,
                currentMoveNumber: state.currentMoveNumber + 1
            }
        },
    }
})

export const { setInitialBoardGame, boardMoveUpdate } = slice.actions;
export default slice.reducer
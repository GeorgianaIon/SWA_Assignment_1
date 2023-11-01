import * as BoardModel from '../models/board'
import { GameModel } from '../models/apiModels'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

export interface StateData {
    score: number,
    gameId: number,
    maxMoveNumber: number,
    currentMoveNumber: number,
    board: BoardModel.Board<string>,
    completed: boolean,
    games: GameModel[]
}

const initialState: StateData = {
    gameId: -1,
    score: 0,
    maxMoveNumber: 25,
    currentMoveNumber: 0,
    completed: false,
    board: undefined,
    games: undefined
}

export const gameSlice = createSlice ({
    name: 'game',
    initialState: initialState, 
    reducers : {
        setInitialBoardGame: (_, action: PayloadAction<{board: BoardModel.Board<string>, gameId: number}>) => {
            return {
                ...initialState,
                board: action.payload.board,
                gameId: action.payload.gameId,
            }
        },
        boardMoveUpdate: (state, action: PayloadAction<{board: BoardModel.Board<string>, score: number, completed: boolean}>) => {
            return {
                ...state,
                board: action.payload.board,
                score: state.score + action.payload.score,
                currentMoveNumber: state.currentMoveNumber + 1,
                completed: action.payload.completed
            }
        },
        setPreviousGame: (state, action: PayloadAction<{game: GameModel}>) => {
            return {
                ...state,
                gameId: action.payload.game.id,
                board: action.payload.game.board,
                score: action.payload.game.score,
                completed: action.payload.game.completed,
                currentMoveNumber: action.payload.game.currentMoveNumber
            }
        },
        setUserGames: (state, action: PayloadAction<{games: GameModel[]}>) => {
            return {
                ...state,
                games: action.payload.games
            }
        }
    }
})

export const { setInitialBoardGame, boardMoveUpdate, setPreviousGame, setUserGames } = gameSlice.actions;
export default gameSlice.reducer
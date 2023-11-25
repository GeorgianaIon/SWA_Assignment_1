import * as BoardModel from '../models/board'

export interface GameModel {
    id: number,
    user: number,
    score: number,
    completed: boolean,
    currentMoveNumber: number,
    board: BoardModel.Board<string>
}

export interface UserModel {
    username: string,
    password: string,
    id: number,
    admin: boolean
}

export interface LoginModel {
    token: string 
    userId: number,
}
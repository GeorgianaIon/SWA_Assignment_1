import { Board } from "./board";

export interface GameData<T> {
    userId: number,
    score: number,
    maxMoveNumber: number,
    currentMoveNumber: number,
    board: Board<T>
}
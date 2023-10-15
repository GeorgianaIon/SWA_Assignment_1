import { Board } from "./board";

export interface GameData {
    userId: number,
    points: number,
    score: number, // not sure if score is necessary
    completed: boolean,
    currentMoveNumber: number,
    board: Board<string>
}
import { Board } from "./board";
import { ImageModel } from "../reducers/game";

export interface GameData<T> {
    userId: number,
    score: number,
    maxMoveNumber: number,
    currentMoveNumber: number,
    board: Board<T>
}
import * as BoardModel from '../models/board'
import { Generator } from '../models/board'
import { GameData } from '../models/gameData'
import { createSlice } from '@reduxjs/toolkit'


// to be replaced with a random image
class RandomGenerator implements Generator<ImageModel> {
    private sequence: ImageModel[]

    constructor(sequence: ImageModel[]) {
        this.sequence = sequence
    }

    next(): ImageModel {
        return this.sequence[Math.floor(Math.random() * this.sequence.length)]
    }
}

let images: ImageModel[] = [{src : "../images/cat1.png"}, {src : "../images/cat2.png"}, {src : "../images/cat3.png"}, {src : "../images/cat4.png"}]
const generator: RandomGenerator = new RandomGenerator(images)

const initialState = {
    userId: 0,
    score: 0,
    maxMoveNumber: 25,
    currentMoveNumber: 0
}

export const gameSlice = createSlice({
    name: 'game',
    initialState: initialState, 
    reducers : {
        setInitialBoardGame: (state: GameData<ImageModel>) => {
            const initialBoard = BoardModel.create(generator, 6, 6)
            state = {...initialState, board: initialBoard}
            return state;
        }
    }
})

export const {setInitialBoardGame} = gameSlice.actions;
export default gameSlice.reducer


// export function reduce<T>(state: GameData, action : Action<T>) {
//     switch(action.type) {
//         case 'reset':
//             return BoardModel.create(generator,6,6);
//         default: 
//             return state;
//     }
// }


interface Action<T> {
    type: string;
    payload: T
}

export interface ImageModel {
    src: string
}
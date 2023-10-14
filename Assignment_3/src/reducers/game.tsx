import * as BoardModel from '../models/board'
import { Generator } from '../models/board'
import { useDispatch } from 'react-redux'
import { setImageSrc } from '../actions/imageAction'

// to be replaced with a random image
class CyclicGenerator implements Generator<string> {
    private sequence: string
    private index: number

    constructor(sequence: string) {
        this.sequence = sequence
        this.index = 0
    }

    next(): string {
        const n = this.sequence.charAt(this.index)
        this.index = (this.index + 1) % this.sequence.length
        return n
    }
}

const generator: CyclicGenerator = new CyclicGenerator('ABCD')
const initBoard = BoardModel.create(generator, 6,6);

const InitialState = {
    userId: 0,
    points: 0,
    maxMoves: 25,
    completed: false,
    currentMoveNumber: 0
}

interface Action<T> {
    type: string;
    payload: T
}
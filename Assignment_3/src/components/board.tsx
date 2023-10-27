import * as React from  'react';
import Image from './Image';
import { Position, move, Generator, create, Board } from '../models/board';
import { useAppDispatch, useAppSelector } from '../config/store';
import { setInitialBoardGame, boardMoveUpdate } from '../reducers/gameReducer';
import { createGame, updateGame } from '../api/gameapi';
import { GameModel } from '../models/apiModels';

class RandomGenerator implements Generator<string> {
    images: string[] = ["../images/cat1.png", "../images/cat2.png", "../images/cat3.png", "../images/cat4.png", "../images/cat5.jpg"]
    
    next(): string {
        return this.images[Math.floor(Math.random() * this.images.length)]
    }
}
const generator: RandomGenerator = new RandomGenerator()

const mapToModel = (result: any): GameModel => {
    return {
        id: result.id,
        user: result.user,
        score: result.score,
        completed: result.completed
    }
}

const BoardGame: React.FC = () => {
    const game = useAppSelector((state) => state.gameReducer)
    const user = useAppSelector((state) => state.userReducer)
    const dispatch = useAppDispatch();
    const [selectedPosition, setSelectedPosition] = React.useState<Position>(undefined)

    if (game.board === undefined)
    {
        createGame(user.token).then(result => { 
            var game = mapToModel(result)
            dispatch(setInitialBoardGame({board: create(generator, 6, 6), gameId: game.id}))
        }).catch(_ => alert("Could create a new game"))
    }

    const selectTile = async (ir : number, ic : number) => {
        if (game.currentMoveNumber < game.maxMoveNumber) {
            if (selectedPosition === undefined)
            {
                setSelectedPosition({row: ir, col: ic})
            }
            else
            {
                const newBoard: Board<string> = JSON.parse(JSON.stringify(game.board))
                const result = move(generator, newBoard, selectedPosition, {row: ir, col: ic})
                if (result.effects.length > 0)
                {
                    const score = result.effects.filter(effect => effect.kind == "Match").length * 5;
                    dispatch(boardMoveUpdate({board: result.board, score: score}))
                }
                setSelectedPosition(undefined)
            }
        }
    }

    React.useEffect(() => {
        if (game.currentMoveNumber < game.maxMoveNumber) 
        {
            updateGame(user.token, {id: game.gameId, user: user.id, score: game.score, completed: false}).catch(_ => alert("Could not update the game"))
        } 
        else 
        {
            updateGame(user.token, {id: game.gameId, user: user.id, score: game.score, completed: true}).catch(_ => alert("Could not update the game"))
        }
    }, [game.currentMoveNumber, game.score])

    const resetGame = async () => {
        setSelectedPosition(undefined)
        createGame(user.token).then(result => { 
            var game = mapToModel(result)
            dispatch(setInitialBoardGame({board: create(generator, 6, 6), gameId: game.id}))
        }).catch(_ => alert("Could create a new game"))  
    }

    return (
        <div className='board'>
            <table>
                <tbody>
                    {game.board.pieces.map((row, ir) => { return (
                        <tr key={ir}>
                            {row.map((col, ic) => { return (
                                <td key={ic} className={`tile ${selectedPosition && selectedPosition.col == ic && selectedPosition.row == ir ? "selected-tile" : ""}`} onClick={() => selectTile(ir, ic)}>
                                    <Image src={col}/>
                                </td>)
                            })}
                        </tr>)
                    })}
                </tbody>
            </table>
            <button className='reset-button' onClick={() => resetGame()}>Reset</button>
        </div>
    )
}

export default BoardGame;
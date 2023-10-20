import * as React from  'react';
import Image from './Image';
import { Board } from '../models/board';
import { StateData } from '../reducers/game';
import { useAppSelector } from '../config/store';

const BoardGame: React.FC = () => {
    const board : Board<string> = useAppSelector((state : StateData) => state.board)
    return (
        <table>
            <tbody>
                {board.pieces.map((row, ir) => { return (
                    <tr key={ir}>
                        {row.map((col, ic) => { return (
                            <td key={ic}>
                                <Image src={col}/>
                            </td>)
                        })}
                    </tr>)
                })}
            </tbody>
        </table>
    )
}

export default BoardGame;
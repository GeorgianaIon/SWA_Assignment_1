import * as React from  'react';
import Image from './image';
import { useSelector } from 'react-redux';
import { Board } from '../models/board';
import { ImageModel } from '../reducers/game';

const BoardGame: React.FC = () => {
    const board : Board<ImageModel> = useSelector((state : any) => state).games.board
    return (
        <table>
            <tbody>
                {board.pieces.map((row, ir) => { return (
                    <tr key={ir}>
                        {row.map((col, ic) => { return (
                            <td key={ic}>
                                <Image src={col.src}/>
                            </td>)
                        })}
                    </tr>)
                })}
            </tbody>
        </table>
    )
}

export default BoardGame;
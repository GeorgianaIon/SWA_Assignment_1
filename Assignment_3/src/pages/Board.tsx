import Board  from '../components/Board'
import { useAppSelector } from '../config/store';


const BoardPage = () => {
    const game = useAppSelector((state) => state.gameReducer)

    return ( 
    <div>
        <p className='board-text'>Moves left: {game.maxMoveNumber - game.currentMoveNumber}</p>
        <p className='board-text'>Score: {game.score}</p>
        <Board/>
    </div>
    )
}
export default BoardPage;
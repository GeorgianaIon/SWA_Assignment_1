import Board  from '../components/board'
import { AppDispatch } from '../config/store';
import { useDispatch } from 'react-redux'
import { setInitialBoardGame} from '../reducers/game'

const BoardPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    dispatch(setInitialBoardGame());
    return ( <Board/>)
}
export default BoardPage;
import Board from "../components/Board";
import { useAppSelector } from "../config/store";

const BoardPage = () => {
  const game = useAppSelector((state) => state.gameReducer);

  return (
    <div className="board-page">
      <h1 className="board-text">Score: {game.score}</h1>
      <p className="board-text">
        Moves left: {game.maxMoveNumber - game.currentMoveNumber}
      </p>
      <Board />
    </div>
  );
};
export default BoardPage;

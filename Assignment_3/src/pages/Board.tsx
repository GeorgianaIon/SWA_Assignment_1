import Board from "../components/Board";
import { useAppSelector } from "../config/store";

const BoardPage = () => {
  return (
    <div className="board-page">
      <Board />
    </div>
  );
};
export default BoardPage;

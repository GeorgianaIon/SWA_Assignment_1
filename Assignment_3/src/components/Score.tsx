interface ScoreProps {
  score: number;
  maxMoveNumber: number;
  currentMoveNumber: number;
}

const Score: React.FC<ScoreProps> = ({
  score,
  maxMoveNumber,
  currentMoveNumber,
}) => {
  return (
    <div className="text-container">
      <h1 className="board-text">Score: {score}</h1>
      <p className="board-text">
        Moves left: {maxMoveNumber - currentMoveNumber}
      </p>
    </div>
  );
};

export default Score;

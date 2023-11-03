import { GameModel } from "../models/apiModels";
import { useAppDispatch, useAppSelector } from "../config/store";
import { useEffect, useState } from "react";
import HighScoreTable from "../components/HighScoreTable";
import { getAllGamesThunk } from "../config/thunks";

const HighScorePage = () => {
  const user = useAppSelector((state) => state.userReducer);
  const game = useAppSelector((state) => state.gameReducer);
  const [games, setGames] = useState<GameModel[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllGamesThunk(user.token));
  }, [dispatch, user.token]);

  useEffect(() => {
    if (game.games) {
      setGames(game.games);
    }
  }, [game.games]);

  const top10Games = games
    .filter((game) => game.completed)
    .sort((a, b) => b.score - a.score)
    .slice(0, 10);

  const top3OwnGames = games
    .filter((game) => game.user == user.id && game.completed)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);

  return (
    <div className="highscores">
      {top10Games.length !== 0 && (
        <>
          <h3 className="bigger-font">High scores</h3>
          <HighScoreTable games={top10Games} />
        </>
      )}
      <br />
      {top3OwnGames.length !== 0 && (
        <>
          {" "}
          <h3>Top 3 high scores</h3>
          <HighScoreTable games={top3OwnGames} />
        </>
      )}
    </div>
  );
};
export default HighScorePage;

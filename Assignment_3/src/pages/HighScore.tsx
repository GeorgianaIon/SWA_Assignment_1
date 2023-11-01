import { getAllGames } from "../api/gameapi";
import { GameModel } from "../models/apiModels";
import { useAppSelector } from "../config/store";
import { useEffect, useState } from "react";
import HighScoreTable from "../components/HighScoreTable";

const HighScorePage = () => {
  const user = useAppSelector((state) => state.userReducer);
  const [games, setGames] = useState<GameModel[]>([]);

  useEffect(() => {
    getAllGames(user.token)
      .then((result: GameModel[]) => {
        setGames(result);
      })
      .catch((_) => alert("Could not get the high scores"));
  }, [user.token]);

  const top10Games = games
    .filter((game) => game.completed)
    .sort((a, b) => a.score - b.score)
    .reverse()
    .slice(0, 10);
  const top3OwnGames = games
    .filter((game) => game.user == user.id && game.completed)
    .sort((a, b) => a.score - b.score)
    .reverse()
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

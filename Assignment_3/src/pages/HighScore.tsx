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
        const highestScores = Object.values(
          result.reduce((acc, game) => {
            if (!acc[game.user] || acc[game.user].score < game.score) {
              acc[game.user] = game;
            }
            return acc;
          }, {} as { [key: string]: GameModel })
        ).sort((a, b) => b.score - a.score);

        setGames(highestScores);
      })
      .catch((_) => alert("Could not get the high scores"));
  }, [user.token]);

  return (
    <div className="highscores">
      <h3 className="bigger-font">High scores</h3>
      <HighScoreTable games={games} />
      <br />
    </div>
  );
};
export default HighScorePage;

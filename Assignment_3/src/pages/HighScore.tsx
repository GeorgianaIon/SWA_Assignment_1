import { getAllGames } from "../api/gameapi";
import { GameModel } from "../models/apiModels";
import { useAppSelector } from "../config/store";
import { useState } from "react";
import HighScoreTable from "../components/HighScoreTable";

const mapToModel = (result: any): GameModel[] => {
  return result.map((game: any) => {
    return {
      id: game.id,
      user: game.user,
      score: game.score,
      completed: game.completed,
    };
  });
};

const HighScorePage = () => {
  const user = useAppSelector((state) => state.userReducer);
  const [games, setGames] = useState<GameModel[]>([]);

  if (games.length === 0) {
    getAllGames(user.token)
      .then((result) => {
        setGames(mapToModel(result));
      })
      .catch((_) => alert("Could not get the high scores"));
  }

  const top10Games = games
    .filter((game) => game.completed)
    .sort((a, b) => a.score - b.score)
    .reverse()
    .slice(0, 10);

  return (
    <div className="highscores">
      <h2>High scores</h2>
      <HighScoreTable games={top10Games} />
      <br />
    </div>
  );
};
export default HighScorePage;

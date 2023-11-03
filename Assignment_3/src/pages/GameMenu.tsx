import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../config/store";
import { createGameThunk, getAllGamesThunk, getUserGame } from "../config/thunks";
import { GameModel } from "../models/apiModels";

const GameMenu: React.FC = () => {
  const game = useAppSelector((state) => state.gameReducer);
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [games, setGames] = useState<GameModel[]>([]);
  let navigate = useNavigate();

  React.useEffect(() => {
    if (game.games) {
      setGames(game.games);
    }
  }, [game.games]);

  useEffect(() => {
    dispatch(getAllGamesThunk(user.token));
  }, [dispatch, user.token]);

  const continueGame = async (id: number) => {
    dispatch(getUserGame(user.token, id));
    navigate("/board");
  };

  const resetGame = async () => {
    dispatch(createGameThunk(user.token));
    navigate("/board");
  };

  return (
    <div className="board-body">
      <div className="start-container">
        <h1>Resume your games:</h1>
        <div className="row">
          {games
            ?.filter(
              (game) => !game.completed && game.user === user.id && game.board && game.score !== 0
            )
            .map((game) => (
              <button
                className="start-game"
                key={game.id}
                onClick={() => continueGame(game.id)}
              >
                {" "}
                Game {game.id}
              </button>
            ))}
        </div>
      </div>
      <h3>Or</h3>
      <button className="start-new" onClick={() => resetGame()}>
        Start a new game
      </button>
    </div>
  );
};

export default GameMenu;

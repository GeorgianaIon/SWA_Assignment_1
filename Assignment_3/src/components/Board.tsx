import * as React from "react";
import Image from "./Image";
import { Position, move, Generator, create, Board } from "../models/board";
import { useAppDispatch, useAppSelector } from "../config/store";
import {
  setInitialBoardGame,
  boardMoveUpdate,
  setPreviousGame,
} from "../reducers/gameReducer";
import { createGame, updateGame, getGame } from "../api/gameapi";
import { GameModel } from "../models/apiModels";
import {
  createGameThunk,
  updateGameThunk,
  getAllGamesThunk,
  getUserGame,
  setSelectTile,
} from "../config/thunks";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";

const BoardGame: React.FC = () => {
  const game = useAppSelector((state) => state.gameReducer);
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [selectedPosition, setSelectedPosition] =
    React.useState<Position>(undefined);
  const [gameStarted, setGameStarted] = React.useState<boolean>(false);
  const [games, setGames] = React.useState<GameModel[]>([]);

  // React.useEffect(() => {
  //   if (game.board === undefined) {
  //     dispatch(createGameThunk(user.token));
  //     setGameStarted(true);
  //   }
  // }, []);

  const mapToModel = (result: any): GameModel => {
    return {
      id: game.gameId,
      user: user.id,
      score: result.score,
      currentMoveNumber: result.currentMoveNumber,
      completed: result.completed,
      board: result.board,
    };
  };

  const selectTile = async (ir: number, ic: number) => {
    if (game.currentMoveNumber < game.maxMoveNumber) {
      if (selectedPosition === undefined) {
        setSelectedPosition({ row: ir, col: ic });
      } else {
        dispatch(setSelectTile(selectedPosition, ir, ic, game));
        setSelectedPosition(undefined);
      }
    }
  };

  const continueGame = async (id: number) => {
    dispatch(getUserGame(user.token, id));
  };

  React.useEffect(() => {
    if (game.gameId !== -1 && game.currentMoveNumber < game.maxMoveNumber) {
      dispatch(updateGameThunk(user.token, mapToModel(game)));
    }
    else if (game.gameId !== -1) {
      dispatch(updateGameThunk(user.token, mapToModel({ id: game.gameId, user: user.id, score: game.score, completed: true })));
    }
  }, [game.currentMoveNumber, game.score]);

  React.useEffect(() => {
    dispatch(getAllGamesThunk(user.token));
  }, [dispatch, user.token]);

  React.useEffect(() => {
    if (!gameStarted) {
    }
    if (game.games) {
      setGames(game.games);
    }
  }, [gameStarted, game.games]);

  const resetGame = async () => {
    setGameStarted(true);
    setSelectedPosition(undefined);
    dispatch(createGameThunk(user.token));
  };

  return (
    <div>
      <div className="text-container">
        <h1 className="board-text">Score: {game.score}</h1>
        <p className="board-text">
          Moves left: {game.maxMoveNumber - game.currentMoveNumber}
        </p>
      </div>
      <div className="board-container">
        {gameStarted ? (
          <>
            <button
              className="reset-button"
              onClick={() => continueGame(game.gameId)}>
              Resume unfinished game
            </button>
            <div className="container">
              Resume your games:
              <div className="row">
                {games
                  ?.filter(
                    (game) => !game.completed && game.user === user.id && game.board
                  )
                  .map((game) => (
                    <button
                      className="reset-button"
                      key={game.id}
                      onClick={() => continueGame(game.id)}
                    >
                      {" "}
                      Game {game.id}
                    </button>
                  ))}
              </div>
            </div>
          </>
        ) : (
          <div className="board">

            <table>
              <tbody>
                {game.board?.pieces?.map((row, ir) => {
                  return (
                    <tr key={ir}>
                      {row.map((col, ic) => {
                        return (
                          <td
                            key={ic}
                            className={`tile ${selectedPosition &&
                              selectedPosition.col == ic &&
                              selectedPosition.row == ir
                              ? "selected-tile"
                              : ""
                              }`}
                            onClick={() => selectTile(ir, ic)}
                          >
                            <Image src={col} />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        Or:
        < button className="reset-button" onClick={() => resetGame()}>
          Start a new game
        </button>
      </div >
    </div>
  );
};

export default BoardGame;

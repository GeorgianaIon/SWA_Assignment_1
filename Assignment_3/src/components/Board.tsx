import * as React from "react";
import Image from "./Image";
import { Position, move, Generator, create, Board } from "../models/board";
import { useAppDispatch, useAppSelector } from "../config/store";
import { setInitialBoardGame, boardMoveUpdate, setPreviousGame } from "../reducers/gameReducer";
import { createGame, updateGame, getGame } from "../api/gameapi";
import { GameModel } from "../models/apiModels";
import { createGameThunk, updateGameThunk, getAllGamesThunk, getUserGame } from "../config/thunks";
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom'


class RandomGenerator implements Generator<string> {
  images: string[] = [
    "../images/cat1.png",
    "../images/cat2.png",
    "../images/cat3.png",
    "../images/cat4.png",
    "../images/cat5.jpg",
  ];

  next(): string {
    return this.images[Math.floor(Math.random() * this.images.length)];
  }
}
const generator: RandomGenerator = new RandomGenerator();

const BoardGame: React.FC = () => {
  const game = useAppSelector((state) => state.gameReducer);
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [selectedPosition, setSelectedPosition] = React.useState<Position>(undefined);
  const [gameStarted, setGameStarted] = React.useState<boolean>(false);
  const [games, setGames] = React.useState<GameModel[]>([]);

  React.useEffect(() => {
    if (game.board === undefined) {
      dispatch(createGameThunk(user.token));
    }
  }, []);

  const mapToModel = (result: any): GameModel => {
    return {
      id: game.gameId,
      user: user.id,
      score: result.score,
      currentMoveNumber: result.currentMoveNumber,
      completed: result.completed,
      board: result.board
    };
  };

  const selectTile = async (ir: number, ic: number) => {
    if (game.currentMoveNumber < game.maxMoveNumber) {
      if (selectedPosition === undefined) {
        setSelectedPosition({ row: ir, col: ic });
      } else {
        const newBoard: Board<string> = JSON.parse(JSON.stringify(game.board));
        const result = move(generator, newBoard, selectedPosition, {
          row: ir,
          col: ic,
        });
        if (result.effects.length > 0) {
          const score =
            result.effects.filter((effect) => effect.kind == "Match").length *
            5;
          dispatch(boardMoveUpdate({ board: result.board, score: score, completed: false }));
        }
        setSelectedPosition(undefined);
      }
    }
  }; 

  const continueGame = async (id: number) => {
    setGameStarted(true);
    dispatch(getUserGame(user.token, game.gameId))
  }

  React.useEffect(() => {
    if (game.currentMoveNumber < game.maxMoveNumber) {
      dispatch(updateGameThunk(user.token, mapToModel(game)))
    } else {
      dispatch(updateGameThunk(user.token, mapToModel(game)))
    }
  }, [game.currentMoveNumber, game.score]);

  React.useEffect(() => {
    dispatch(getAllGamesThunk(user.token));
    if (!gameStarted) {

      // if(game.gameId != -1) {
      //   getGame(user.token, game.gameId).then((result) => { 
      //     dispatch(setPreviousGame(result)) })
      // }
      }
      if (game.games) {
        setGames(game.games);
      }
  }, [gameStarted, game.games]);

  const resetGame = async () => {
    setSelectedPosition(undefined);
    setGameStarted(true);
    dispatch(createGameThunk(user.token));
  };

  return (
    <div className="board-container">
    <div className="board"> 
       { gameStarted ? (
       <button className="reset-button" onClick={() => continueGame(game.gameId)}>Resume unfinished game</button>
       ) : 
       <table>
          <tbody>
             {game.board?.pieces?.map((row, ir) => {
             return (
             <tr key={ir}>
                {row.map((col, ic) => {
                return (
                <td
                key={ic}
                className={`tile ${
                selectedPosition &&
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
       }
       <h2>Resume your games:</h2>
        <div className='container'>
            <div className='row'>
                {games?.filter((game) => !game.completed && game.user === user.id && game.board).map((game) => (
                    <button className="reset-button" key={game.id} onClick={() => continueGame(game.id)}> Game {game.id}</button>
                ))}
            </div>
        </div>
       <button className="reset-button" onClick={() => resetGame()}>
       Start a new game
       </button>
    </div>
    </div>
    );
};

export default BoardGame;

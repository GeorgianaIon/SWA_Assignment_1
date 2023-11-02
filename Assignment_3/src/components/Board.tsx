import * as React from "react";
import Image from "./Image";
import { Position } from "../models/board";
import { useAppDispatch, useAppSelector } from "../config/store";
import { GameModel } from "../models/apiModels";
import { updateGameThunk, setSelectTile } from "../config/thunks";
import { useEffect } from "react";

const BoardGame: React.FC = () => {
  const game = useAppSelector((state) => state.gameReducer);
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [selectedPosition, setSelectedPosition] =
    React.useState<Position>(undefined);

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

  useEffect(() => {
    console.log(game?.board);
    if (game.gameId !== -1 && game.currentMoveNumber < game.maxMoveNumber) {
      dispatch(updateGameThunk(user.token, mapToModel(game)));
      console.log(game);
    } else if (game.gameId !== -1) {
      dispatch(
        updateGameThunk(
          user.token,
          mapToModel({
            id: game.gameId,
            user: user.id,
            score: game.score,
            completed: true,
          })
        )
      );
    }
  }, [game.currentMoveNumber, game.score]);

  return (
    <div>
      <div className="text-container">
        <h1 className="board-text">Score: {game.score}</h1>
        <p className="board-text">
          Moves left: {game.maxMoveNumber - game.currentMoveNumber}
        </p>
      </div>
      <div className="board-container">
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
        </div>
      </div>
    </div>
  );
};

export default BoardGame;

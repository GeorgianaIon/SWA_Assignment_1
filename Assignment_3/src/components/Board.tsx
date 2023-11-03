import * as React from "react";
import Image from "./Image";
import { Position } from "../models/board";
import { useAppDispatch, useAppSelector } from "../config/store";
import { GameModel } from "../models/apiModels";
import { updateGameThunk, setSelectTile, getUserGame } from "../config/thunks";
import { useEffect } from "react";
import Score from "./Score";
import { StateData } from "../reducers/gameReducer";

const BoardGame: React.FC = () => {
  const game = useAppSelector((state) => state.gameReducer);
  const user = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [selectedPosition, setSelectedPosition] =
    React.useState<Position>(undefined);

  const mapToModel = (result: StateData): GameModel => {
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
    if (game.gameId === -1 && parseInt(localStorage.getItem("gameId"))) {
      dispatch(getUserGame(user.token, parseInt(localStorage.getItem("gameId"))));
    }

    if (game.gameId === -1) {
      return;
    }

    if (game.currentMoveNumber < game.maxMoveNumber) {
      dispatch(updateGameThunk(user.token, mapToModel(game)));
    } else if (game.gameId !== -1) {
      dispatch(
        updateGameThunk(
          user.token,
          mapToModel({
            ...game,
            completed: true,
          })
        )
      );
    }
  }, [game.currentMoveNumber, game.score]);

  return (
    <div>
      <Score
        score={game.score}
        maxMoveNumber={game.maxMoveNumber}
        currentMoveNumber={game.currentMoveNumber}
      />
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

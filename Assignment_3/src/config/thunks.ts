import { AppDispatch, RootState}  from "./store"
import { StateData, gameSlice } from "../reducers/gameReducer";
import { userSlice } from "../reducers/userReducer"
import { GameModel, UserModel } from "../models/apiModels";
import { Position, move, Generator, create, Board } from "../models/board";
import * as api from "../api/gameapi";

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

export const createGameThunk = (userToken: string) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
      try {
        const game: GameModel = await api.createGame(userToken);
        dispatch(gameSlice.actions.setInitialBoardGame({
          board: create(generator, 6,6),
          gameId: game.id
        }));
      } 
      catch (error) 
      { alert("Could not create a new game");}
    };
};

export const setSelectTile = (selectedPosition: Position, ir: number, ic: number, game: StateData) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const newBoard: Board<string> = JSON.parse(JSON.stringify(game.board));
      const result = move(generator, newBoard, selectedPosition, {
        row: ir,
        col: ic
      });
      if (result.effects.length > 0) {
        const score =
          result.effects.filter((effect) => effect.kind == "Match").length * 5;
        dispatch(gameSlice.actions.boardMoveUpdate({ board: result.board, score: score, completed: false }));
      }
    } 
    catch (error) 
    { alert("Could not make move");}
  };
  
}

export const getUserGame = (userToken: string, gameId: number) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const game: GameModel = await api.getGame(userToken, gameId);
      dispatch(gameSlice.actions.setPreviousGame({game}));
    } 
    catch (error) 
    { alert("Could not retrieve the previous game");}
  };
}

export const getAllGamesThunk = (userToken: string) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      const games: GameModel[] = await api.getAllGames(userToken);
      dispatch(gameSlice.actions.setUserGames({games}));
    } 
    catch (error) 
    { alert("Could not get user's games");}
  };
}

export const updateGameThunk = (userToken: string, gameModel: GameModel) => {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    try {
      await api.updateGame(userToken, {
          id: gameModel.id,
          user: gameModel.user,
          score: gameModel.score,
          currentMoveNumber: gameModel.currentMoveNumber,
          completed: gameModel.completed,
          board: gameModel.board
        });
      } catch (error) 
      { alert("Could not update a new game");}
  };
};

export const updateUserThunk = (token: string, userModel: UserModel) => {
  return async (dispatch: AppDispatch) => {
    try {
      await api.updateUser(token, userModel)
      dispatch(userSlice.actions.updateUserAction({...userModel, token: token}))
      alert("Your password was successfully changed!");
    }
    catch(error) { alert("Could not update the user");}
  }
}

export const createUserThunk = (username: string, password: string) => {
  return async () => {
    try {
      await api.createUser(username, password)
    }
    catch(error) { alert("Could not register user");}
  }
}

import { AppDispatch, RootState}  from "./store"
import { gameSlice } from "../reducers/gameReducer";
import { userSlice } from "../reducers/userReducer"
import { GameModel } from "../models/apiModels";
import { NavigateFunction } from 'react-router'
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { Position, move, Generator, create, Board } from "../models/board";
import * as api from "../api/gameapi";
import { useState } from "react";

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

type Thunk = (dispatch: AppDispatch, getState: RootState) => Promise<void>

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
      console.log("here");
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
import {  useDispatch} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import gameReducer from '../reducers/game'

export const store = configureStore({
    reducer: {
      games: gameReducer
    }
})

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();


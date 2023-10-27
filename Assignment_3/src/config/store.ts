import { TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import { configureStore } from '@reduxjs/toolkit'
import { loadState, saveState } from './localStorage';
import gameReducer from '../reducers/gameReducer';
import userReducer from '../reducers/userReducer';
import debounce from 'debounce';

export const store = configureStore({
    reducer: {
        gameReducer,
        userReducer
    },
    preloadedState: loadState(),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

store.subscribe(
    debounce(() => {
        saveState(store.getState());
    }, 800)
);
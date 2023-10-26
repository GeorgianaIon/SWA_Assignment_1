import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface LoggedInUserModel {
    id: number,
    username: string,
    password: string,
    admin: boolean,
    token: string
}

const loadTokenFromStorage = () => {
    return localStorage.getItem('token') 
  }

const initialState: LoggedInUserModel = {
    id: undefined,
    username: undefined,
    password: undefined,
    admin: undefined,
    token: loadTokenFromStorage()
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<LoggedInUserModel>) => {
            localStorage.setItem('token', action.payload.token);

            return {
                ...action.payload
            }
        },
        logoutAction: () => {
            localStorage.removeItem('token');
            return {
                ...initialState
            }
        },
        updateUserAction: (state, action: PayloadAction<LoggedInUserModel>) => {
            return {
                ...state,
                password: action.payload.password
            }
        }
    }
})

export const { loginAction, logoutAction, updateUserAction } = slice.actions
export default slice.reducer
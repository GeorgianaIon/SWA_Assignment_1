import { PayloadAction, createSlice } from "@reduxjs/toolkit"

interface LoggedInUserModel {
    id: number,
    username: string,
    password: string,
    admin: boolean,
    token: string
}

const initialState: LoggedInUserModel = {
    id: undefined,
    username: undefined,
    password: undefined,
    admin: undefined,
    token: localStorage.getItem('userToken')
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<LoggedInUserModel>) => {
            localStorage.setItem('userToken', action.payload.token) 
            return {
                ...action.payload
            }
        },
        logoutAction: () => {
            localStorage.removeItem('userToken') 
            return {
                ...initialState
            }
        },
        updateUserAction: (state, action: PayloadAction<LoggedInUserModel>) => {
            return {
                ...state,
                password: action.payload.password
            }
        },
        updateUser: (state, action: PayloadAction<LoggedInUserModel>) => {
            return {
                admin: action.payload.admin,
                id: action.payload.id,
                password: action.payload.password,
                token: action.payload.token,
                username: action.payload.username
            }
        }
    }
})

export const { loginAction, logoutAction, updateUserAction, updateUser } = userSlice.actions
export default userSlice.reducer
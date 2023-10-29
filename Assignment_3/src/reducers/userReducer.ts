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
    token: localStorage.getItem('userToken') // get token from local storage
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<LoggedInUserModel>) => {
            localStorage.setItem('userToken', action.payload.token) // store token in local storage
            return {
                ...action.payload
            }
        },
        logoutAction: () => {
            localStorage.removeItem('userToken') // remove token from local storage
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

export const { loginAction, logoutAction, updateUserAction } = userSlice.actions
export default userSlice.reducer
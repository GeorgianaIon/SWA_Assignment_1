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
    token: undefined
}

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<LoggedInUserModel>) => {
            state = { ...action.payload }
            return state
        },
        logoutAction: (state) => {
            state = { ...initialState }
            return state
        },
        updateUserAction: (state, action: PayloadAction<LoggedInUserModel>) => {
            state.password = action.payload.password
            return state
        }
    }
})

export const { loginAction, logoutAction, updateUserAction } = slice.actions
export default slice.reducer
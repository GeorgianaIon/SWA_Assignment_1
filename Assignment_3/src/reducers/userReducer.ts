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

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginAction: (state, action: PayloadAction<LoggedInUserModel>) => {
            return {
                ...action.payload
            }
        },
        logoutAction: () => {
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
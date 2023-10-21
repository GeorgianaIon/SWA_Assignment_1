import React, { useState } from "react"
import { UserModel } from "../models/apiModels"
import { updateUser } from "../api/gameapi"
import { useAppDispatch, useAppSelector } from "../config/store"
import { updateUserAction } from "../reducers/userReducer"
import "./Profile.css"

const Profile: React.FC = () => {
    const userData = useAppSelector((state) => state.userReducer)
    const dispatch = useAppDispatch();

    const [showPassword, setShowPassword] = useState(false)
    const [password, setPassword] = useState(userData.password)

    const changePassword = async () => {
        if (password === userData.password) {
            return
        }

        const confirmed = confirm("Are you sure you want to change your password?")
        if (!confirmed) {
            return
        }

        try {
            const updatedUser: UserModel = {
                id: userData.id,
                username: userData.username,
                password: password,
                admin: userData.admin
            }

            await updateUser(userData.token, updatedUser)
            dispatch(updateUserAction({ ...updatedUser, token: userData.token }))
            alert("Your password was successfully changed!")
        }
        catch (ex) {
            alert(`Error occured while updating password of user: '${userData.username}'`)
        }
    }

    // TODO - Change to use 'FormGroup' component?
    return (
        <div className="profile-wrapper">
            <h3>Welcome to your profile</h3>
            <div>
                <p>User id: <strong>{userData.id}</strong></p>
                <p>Username: <strong>{userData.username}</strong></p>
                <p>Is administrator: <strong>{userData.admin ? "Yes" : "No"}</strong></p>
                <div className="password-wrapper">
                    <label htmlFor="password">Change password</label>
                    <div>
                        <input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button onClick={() => setShowPassword(!showPassword)}>{showPassword ? "Hide password" : "Show password"}</button>
                    </div>
                    <button onClick={changePassword}>Change password</button>
                </div>
            </div>
        </div>
    )
}

export default Profile
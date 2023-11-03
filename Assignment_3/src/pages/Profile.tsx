import React, { useEffect, useState } from "react";
import { UserModel } from "../models/apiModels";
import { useAppDispatch, useAppSelector } from "../config/store";
import FormGroup from "../components/FormGroup";
import { getUserThunk, updateUserThunk } from "../config/thunks";

const Profile: React.FC = () => {
  const userData = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState(userData.password);

  useEffect(() => {
    {
      dispatch(getUserThunk(userData.token, userData.id));
    }
  }, [dispatch, userData.token]);
  

  const changePassword = async () => {
    if (password === userData.password) {
      return;
    }

    const confirmed = confirm("Are you sure you want to change your password?");
    if (!confirmed) {
      return;
    }

    const updatedUser: UserModel = {
      id: userData.id,
      username: userData.username,
      password: password,
      admin: userData.admin,
    };

    dispatch(updateUserThunk(userData.token, updatedUser));
  };

  return (
    <div className="profile-wrapper">
      <h1>Welcome to your profile</h1>
      <div className="content-wrapper">
        <h3>
          Username: <strong className="bigger-font">{userData.username}</strong>
        </h3>
        <h3>
          Is administrator:{" "}
          <strong className="bigger-font">
            {userData.admin ? "Yes" : "No"}
          </strong>
        </h3>
        <div className="password-wrapper">
          <div>
            <FormGroup
              label="Change Password:"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isPassword={true}
            />
          </div>

          <button onClick={changePassword}>Change password</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

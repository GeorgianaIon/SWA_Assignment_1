import React, { useState } from "react";
import { GameModel, UserModel } from "../models/apiModels";
import { getAllGames, updateUser } from "../api/gameapi";
import { useAppDispatch, useAppSelector } from "../config/store";
import { updateUserAction } from "../reducers/userReducer";
import HighScoreTable from "../components/HighScoreTable";
import FormGroup from "../components/FormGroup";

const Profile: React.FC = () => {
  const userData = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const mapToModel = (result: any): GameModel[] => {
    return result.map((game: any) => {
      return {
        id: game.id,
        user: game.user,
        score: game.score,
        completed: game.completed,
      };
    });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState(userData.password);
  const [games, setGames] = useState<GameModel[]>([]);

  if (games.length === 0) {
    getAllGames(userData.token)
      .then((result) => {
        setGames(mapToModel(result));
      })
      .catch((_) => alert("Could not get the high scores"));
  }

  const top3OwnGames = games
    .filter((game) => game.user == userData.id && game.completed)
    .sort((a, b) => a.score - b.score)
    .reverse()
    .slice(0, 3);

  const changePassword = async () => {
    if (password === userData.password) {
      return;
    }

    const confirmed = confirm("Are you sure you want to change your password?");
    if (!confirmed) {
      return;
    }

    try {
      const updatedUser: UserModel = {
        id: userData.id,
        username: userData.username,
        password: password,
        admin: userData.admin,
      };

      await updateUser(userData.token, updatedUser);
      dispatch(updateUserAction({ ...updatedUser, token: userData.token }));
      alert("Your password was successfully changed!");
    } catch (ex) {
      alert(
        `Error occured while updating password of user: '${userData.username}'`
      );
    }
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
        <h3>Top 3 high scores</h3>
        <HighScoreTable games={top3OwnGames} />
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

import React, { useState } from "react";
import { GameModel, UserModel } from "../models/apiModels";
import { useAppDispatch, useAppSelector } from "../config/store";
import HighScoreTable from "../components/HighScoreTable";
import FormGroup from "../components/FormGroup";
import { updateUserThunk } from "../config/thunks";

const Profile: React.FC = () => {
  const userData = useAppSelector((state) => state.userReducer);
  const game = useAppSelector((state) => state.gameReducer);
  const dispatch = useAppDispatch();
  const [password, setPassword] = useState(userData.password);
  const [games, setGames] = useState<GameModel[]>([])

  React.useEffect(() => {
    setGames(game?.games
      .filter((game) => game.user == userData.id && game.completed)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3))
  }, [game.games])

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

    dispatch(updateUserThunk(userData.token, updatedUser))
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
        <HighScoreTable games={games} />
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

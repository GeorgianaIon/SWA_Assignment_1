import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../config/store";
import { logoutAction } from "../reducers/userReducer";
import { logoutUser } from "../api/gameapi";
import { deleteState } from "../config/localStorage";
import { logoutUserThunk } from "../config/thunks";

const Navbar = () => {
  const token = useAppSelector((state) => state.userReducer.token);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const logOut = async () => {
      dispatch(logoutUserThunk(token, navigate))
  };

  return (
    <nav>
      <div>
        <h2>Kitty Crush</h2>
      </div>
      <div className="menu">
        {token ? (
          <>
            <Link to="/menu">
              <button className="button">Menu</button>
            </Link>
            <Link to="/highscore">
              <button className="button">High Scores</button>
            </Link>
            <Link to="/profile">
              <button className="button">My Profile</button>
            </Link>
            <Link to="/" onClick={logOut}>
              <button className="button">Logout</button>
            </Link>
          </>
        ) : (
          <>
            <Link to="/register">
              <button className="button">Register</button>
            </Link>
            <Link to="/">
              <button className="button">Login</button>
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

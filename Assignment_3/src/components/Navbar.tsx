import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../config/store";
import { logoutAction } from "../reducers/userReducer";
import { logoutUser } from "../api/gameapi";
import { deleteState } from "../config/localStorage";

const Navbar = () => {
  const token = useAppSelector((state) => state.userReducer.token);
  const dispatch = useAppDispatch();

  const logOut = async () => {
    try {
      const response = await logoutUser(token);
      if (response.ok) {
        dispatch(logoutAction());
        dispatch(deleteState);
      } else {
        dispatch(logoutAction());
        dispatch(deleteState);
        console.error(response);
      }
    } catch {
      dispatch(logoutAction());
    }
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

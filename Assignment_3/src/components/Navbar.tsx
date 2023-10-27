import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../config/store";
import { logoutAction } from "../reducers/userReducer";
import { logoutUser } from "../api/gameapi";

const Navbar = () => {
  const token = useAppSelector((state) => state.userReducer.token);
  const dispatch = useAppDispatch();

  const logOut = async () => {
    try {
      const response = await logoutUser(token);
      if (response.ok) {
        dispatch(logoutAction());
      } else {
        dispatch(logoutAction());
        console.error(response);
      }
    }
    catch
    {
      dispatch(logoutAction());
    }
  };

  return (
    <nav>
      <div>
        {token ? (
          <>
            <Link to="/board" className="btn btn-outline-info">
              Board
            </Link>
            <Link to="/highscore" className="btn btn-outline-info">
              High Scores
            </Link>
            <Link to="/profile" className="btn btn-outline-info">
              My Profile
            </Link>
            <Link to="/" onClick={logOut} className="btn btn-outline-info">
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link to="/register" className="btn btn-outline-info">
              Register
            </Link>
            <Link to="/" className="btn btn-outline-info">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

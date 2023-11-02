import { Link, useNavigate, useNavigation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../config/store";
import { logoutAction } from "../reducers/userReducer";
import { logoutUser } from "../api/gameapi";
import { deleteState } from "../config/localStorage";
import { logoutUserThunk } from "../config/thunks";
import AuthNav from "./AuthNav";
import NotAuthNav from "./NotAuthNav";

const Navbar = () => {
  const token = useAppSelector((state) => state.userReducer.token);
  const dispatch = useAppDispatch();
  let navigate = useNavigate();

  const logOut = async () => {
    dispatch(logoutUserThunk(token, navigate));
  };

  return (
    <nav>
      <div>
        <h2>Kitty Crush</h2>
      </div>
      <div className="menu">
        {token ? <AuthNav onLogout={logOut} /> : <NotAuthNav />}
      </div>
    </nav>
  );
};

export default Navbar;

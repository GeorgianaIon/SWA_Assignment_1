import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import BoardPage from "./pages/Board";
import HighScorePage from "./pages/HighScore";
import { useAppDispatch, useAppSelector } from "./config/store";
import { StateData, logout } from "./reducers/game";
import { logoutUser } from "./api/gameapi";
import ProtectedRoute from "./components/ProtectedRoute";

const AppRouter = () => {
  let token = useAppSelector((state: StateData) => state.token);

  const dispatch = useAppDispatch();

  const logOut = async() => {
    await logoutUser(token).then(() => dispatch(logout()));
  };
  
  return (
    <BrowserRouter>
     <div>
        <nav>
          <div>
            {token ? (
              <>
                <Link to="board" className='btn btn-outline-info'>Board</Link>
                <Link to="/highscore" className='btn btn-outline-info'>High Scores</Link>
                <Link to="/" onClick={logOut} className='btn btn-outline-info'>Logout</Link>
              </>
            )
            :  <> </>
            }
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/board" element = {<BoardPage/>} />
          <Route path="/highscore" element = {<HighScorePage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

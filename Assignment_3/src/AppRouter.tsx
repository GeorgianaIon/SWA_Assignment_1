import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import BoardPage from "./pages/Board";
import HighScorePage from "./pages/HighScore";
import { useAppDispatch, useAppSelector } from "./config/store";
import { logoutAction } from "./reducers/userReducer";
import { logoutUser } from "./api/gameapi";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";

const AppRouter = () => {
  const token = useAppSelector((state) => state.userReducer.token);
  const dispatch = useAppDispatch();

  const logOut = async () => {
    const response = await logoutUser(token);
    if (response.ok) {
      dispatch(logoutAction())
    }
    else {
      console.error(response)
    }
  };
  
  return (
    <BrowserRouter>
      {token && 
        <div>
          <nav>
            <div>
              <Link to="/board" className='btn btn-outline-info'>Board</Link>
              <Link to="/highscore" className='btn btn-outline-info'>High Scores</Link>
              <Link to="/profile" className="btn btn-outline-info">My Profile</Link>
              <Link to="/" onClick={logOut} className='btn btn-outline-info'>Logout</Link>
            </div>
          </nav>
        </div>
      }
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/board" element = {<BoardPage/>} />
          <Route path="/highscore" element = {<HighScorePage/>} />
          <Route path="/profile" element={<Profile/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import BoardPage from "./pages/Board";
import HighScorePage from "./pages/HighScore";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";
import GameMenu from "./pages/GameMenu";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/board" element={<BoardPage />} />
          <Route path="/highscore" element={<HighScorePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/menu" element={<GameMenu />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import BoardPage from "./pages/Board";
import HighScorePage from "./pages/HighScore";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/board" element = {<BoardPage/>} />
        <Route path="/highscore" element = {<HighScorePage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import BoardPage from "./pages/Board";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/board" element = {<BoardPage/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

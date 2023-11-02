import { getUser, loginUser } from "../api/gameapi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../config/store";
import Form from "../components/Form";
import LoginLink from "../components/LoginLink";
import { loginAction } from "../reducers/userReducer";
import { loginUserThunk } from "../config/thunks";

const LoginPage: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
      dispatch(loginUserThunk(credentials.username, credentials.password))
      navigate("/menu");
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <Form onSubmit={handleLogin} />
      <LoginLink />
    </div>
  );
};

export default LoginPage;

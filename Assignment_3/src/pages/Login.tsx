import { getUser, loginUser } from "../api/gameapi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../config/store";
import Form from "../components/Form";
import LoginLink from "../components/LoginLink";
import { loginAction } from "../reducers/userReducer";

const LoginPage: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      const result = await loginUser(credentials.username, credentials.password)
      const userData = await getUser(result.token, result.userId)
      dispatch(loginAction({ ...userData, token: result.token }))
      navigate("/board");
    } catch (error) {
      alert("Login failed");
    }
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

import { loginUser } from "../api/gameapi";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../config/store";
import Form from "../components/Form";
import LoginLink from "../components/LoginLink";
import { login } from "../reducers/game";

const LoginPage: React.FC = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      await loginUser(credentials.username, credentials.password).then(result => {
        if (result.token) {
          dispatch(login(result))
          navigate("/board");
        }
      })
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

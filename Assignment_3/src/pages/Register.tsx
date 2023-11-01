import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import { createUserThunk } from "../config/thunks";
import { useAppDispatch } from "../config/store";

const RegisterPage = () => {
  let navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleSubmit = async (credentials: {
    username: string;
    password: string;
  }) => {
    dispatch(createUserThunk(credentials.username, credentials.password))
    navigate("/");
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <Form onSubmit={handleSubmit} isRegister={true} />
    </div>
  );
};

export default RegisterPage;

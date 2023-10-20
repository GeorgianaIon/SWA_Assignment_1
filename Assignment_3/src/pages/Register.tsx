import { useState } from "react";
import { createUser } from "../api/gameapi";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      await createUser(credentials.username, credentials.password);
      navigate("/");
    } catch (error) {
      alert("Register failed");
    }
  };

  return (
    <div className="container">
      <h1>Register</h1>
      <Form onSubmit={handleSubmit} isRegister={true} />
    </div>
  );
};

export default RegisterPage;

import { ChangeEvent, FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { loginUser } from "../api/gameapi";
import { useNavigate } from "react-router-dom";
import Form from "../components/Form";
import LoginLink from "../components/LoginLink";

const LoginPage: React.FC = () => {
  let navigate = useNavigate();

  const handleLogin = async (credentials: {
    username: string;
    password: string;
  }) => {
    try {
      await loginUser(credentials.username, credentials.password);
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

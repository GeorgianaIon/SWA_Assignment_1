import { ChangeEvent, FormEvent, useState } from "react";
import { createUser } from "../api/gameapi";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await createUser(username, password);
      alert("Registration successful!");
    } catch (error) {
      alert(`Registration failed: ${error.message}`);
    }
  };

  return (
    <div className="register-container">
      <h1 className="register-title">Register</h1>
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-form-group">
          <label className="register-form-label" htmlFor="username">
            Username:
          </label>
          <input
            className="register-form-input"
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="register-form-group">
          <label className="register-form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="register-form-input"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="register-form-group">
          <label className="register-form-label" htmlFor="confirm-password">
            Confirm Password:
          </label>
          <input
            className="register-form-input"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button className="register-form-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;

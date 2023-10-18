import React, { ChangeEvent, FormEvent, useState } from "react";

interface FormProps {
  onSubmit: (credentials: { username: string; password: string }) => void;
  isRegister?: boolean;
}

const Form: React.FC<FormProps> = ({ onSubmit, isRegister = false }) => {
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

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isRegister && password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    onSubmit({ username, password });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label" htmlFor="username">
          Username:
        </label>
        <input
          className="form-input"
          type="text"
          id="username"
          value={username}
          onChange={handleUsernameChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="password">
          Password:
        </label>
        <input
          className="form-input"
          type="password"
          id="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </div>
      {isRegister && (
        <div className="form-group">
          <label className="form-label" htmlFor="confirm-password">
            Confirm Password:
          </label>
          <input
            className="form-input"
            type="password"
            id="confirm-password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
      )}
      <button className="form-button" type="submit">
        {isRegister ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default Form;

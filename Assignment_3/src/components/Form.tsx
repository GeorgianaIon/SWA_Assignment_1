import React, { ChangeEvent, FormEvent, useState } from "react";
import FormGroup from "./FormGroup";

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
      <FormGroup
        label="Username:"
        type="text"
        value={username}
        onChange={handleUsernameChange}
      />
      <FormGroup
        label="Password:"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      {isRegister && (
        <FormGroup
          label="Confirm Password:"
          type="password"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        />
      )}
      <button className="form-button" type="submit">
        {isRegister ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default Form;

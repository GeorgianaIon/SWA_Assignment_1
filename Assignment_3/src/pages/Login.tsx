import { ChangeEvent, FormEvent, useState } from "react";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className="login-container">
      <h1 className="login-title">Login</h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-form-group">
          <label className="login-form-label" htmlFor="username">
            Username:
          </label>
          <input
            className="login-form-input"
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="login-form-group">
          <label className="login-form-label" htmlFor="password">
            Password:
          </label>
          <input
            className="login-form-input"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button className="login-form-button" type="submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;

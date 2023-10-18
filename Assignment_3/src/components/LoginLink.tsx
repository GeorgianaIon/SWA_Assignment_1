import React from "react";
import { Link } from "react-router-dom";

const LoginLink: React.FC = () => {
  return (
    <div className="go-to-register">
      <p>Don't have an account? </p>
      <Link to="/register">Register here</Link>
    </div>
  );
};

export default LoginLink;

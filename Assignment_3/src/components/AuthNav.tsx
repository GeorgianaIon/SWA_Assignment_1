import React from "react";
import { Link } from "react-router-dom";
import NavButton from "./NavButton";

interface AuthNavProps {
  onLogout: () => void;
}

const AuthNav: React.FC<AuthNavProps> = ({ onLogout }) => (
  <>
    <NavButton to="/menu" label="Menu" />
    <NavButton to="/highscore" label="High Scores" />
    <NavButton to="/profile" label="My Profile" />
    <Link to="/" onClick={onLogout}>
      <button className="button">Logout</button>
    </Link>
  </>
);

export default AuthNav;

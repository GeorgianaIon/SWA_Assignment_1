import React from "react";
import { Link } from "react-router-dom";

interface NavButtonProps {
  to: string;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ to, label }) => (
  <Link to={to}>
    <button className="button">{label}</button>
  </Link>
);

export default NavButton;

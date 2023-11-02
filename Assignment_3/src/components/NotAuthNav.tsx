import React from "react";
import NavButton from "./NavButton";

const NotAuthNav: React.FC = () => (
  <>
    <NavButton to="/register" label="Register" />
    <NavButton to="/" label="Login" />
  </>
);

export default NotAuthNav;

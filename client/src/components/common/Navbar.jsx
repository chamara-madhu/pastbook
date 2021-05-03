import React from "react";
import { Link } from "react-router-dom";

import "../../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar sticky-top p-3 client-nav-bar">
      <Link to="/" className="text-white" style={{ textDecoration: "none" }}>
        <h4>Pastbook</h4>
      </Link>
    </nav>
  );
}

export default Navbar;

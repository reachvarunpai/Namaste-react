import { useState } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");

  return (
    <div
      className="header"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f8f8f8",
        borderBottom: "1px solid #ddd",
      }}
    >
      <div className="logo-container">
        <img
          className="logo"
          src={LOGO_URL}
          alt="app-logo"
          style={{ height: "50px" }}
        />
      </div>

      <div className="nav-items">
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            gap: "20px",
            margin: 0,
            padding: 0,
            alignItems: "center",
          }}
        >
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li>Cart</li>
          <li>
            <button
              className="login"
              onClick={() =>
                setBtnNameReact((prev) => (prev === "Login" ? "Logout" : "Login"))
              }
              style={{
                padding: "6px 12px",
                backgroundColor: "#6200ee",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              {btnNameReact}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;

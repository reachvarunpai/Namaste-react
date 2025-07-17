// src/components/Header.js
import { useState, useContext } from "react";
import { LOGO_URL } from "../utils/constant";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnNameReact, setBtnNameReact] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);

  const cartItems = useSelector((store) => store.cart.items);

  const totalCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="flex flex-col sm:flex-row items-center justify-between p-4 bg-white shadow-md border-b">
      <div className="flex items-center gap-2 mb-4 sm:mb-0">
        <img src={LOGO_URL} alt="App Logo" className="h-12 w-auto" />
        <span className="text-lg font-bold text-purple-700">Namaste React</span>
      </div>

      <nav>
        <ul className="flex flex-wrap items-center gap-5 text-gray-800 font-medium">
          <li>Online Status: <span>{onlineStatus ? "✅" : "🔴"}</span></li>
          <li><Link to="/" className="hover:text-purple-600">Home</Link></li>
          <li><Link to="/about" className="hover:text-purple-600">About</Link></li>
          <li><Link to="/contact" className="hover:text-purple-600">Contact</Link></li>
          <li><Link to="/grocery" className="hover:text-purple-600">Grocery</Link></li>
          <li><Link to="/cart" className="hover:text-purple-600">Cart - ({totalCount} items)</Link></li>
          <li className="text-purple-600 font-semibold">👤 {loggedInUser}</li>
          <li>
            <button
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
              onClick={() => setBtnNameReact((prev) => (prev === "Login" ? "Logout" : "Login"))}
            >
              {btnNameReact}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

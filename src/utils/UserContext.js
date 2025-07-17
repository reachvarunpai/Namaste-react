// src/utils/UserContext.js
import { createContext } from "react";

const UserContext = createContext({
  loggedInUser: "Default User",
  setUserName: () => {},
});

export default UserContext;

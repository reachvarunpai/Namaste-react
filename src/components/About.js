// src/components/About.js
import { Component } from "react";
import UserContext from "../utils/UserContext";
import UserClass from "./UserClass";

class About extends Component {
  static contextType = UserContext;

  render() {
    const { loggedInUser, setUserName } = this.context;

    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-2">About Class Component</h1>
        <div className="mb-4">
          <p className="mb-2">Logged-in User: <strong>{loggedInUser}</strong></p>

          {/* Input to change user */}
          <input
            type="text"
            placeholder="Enter new name"
            onChange={(e) => setUserName(e.target.value)}
            className="border px-3 py-2 rounded shadow-sm"
          />
        </div>

        <UserClass name={"Varun Pai (class)"} location={"Karnataka"} />
      </div>
    );
  }
}

export default About;

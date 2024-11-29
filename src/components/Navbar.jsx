import React from "react";
import { UserAuth } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      console.log("Logged out successfully");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="navbar fixed z-10 bg-neutral text-neutral-content sm:px-4 md:px-8 lg:px-16">
      <div className="containerWrap flex justify-between">
        
        <a className="btn btn-ghost normal-case text-xl"><img src="livechat.png" alt="livechat.png" className="h-12 w-18 mx-2" />LiveChat</a>
        {currentUser ? (
          <button onClick={handleLogout} className="font-semibold">
            Logout
          </button>
        ) : null}
      </div>
    </div>
  );
};

export default Navbar;


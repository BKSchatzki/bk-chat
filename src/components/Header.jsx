import React from "react";
import { LogOut } from "react-feather";
import { useAuth } from "../utils/AuthContext";

const Header = () => {
  const { user, handleUserLogout } = useAuth();

  return (
    <div
      className="bg-slate-950 mb-4 px-6 pt-8 pb-4 border-0 border-b-2 border-slate-800 rounded-3xl shadow-slate-800/50 shadow-lg flex justify-between font-semibold"
      id="header--wrapper"
    >
      {user ? (
        <>
          <span>Welcome, {user.name}</span>
          <LogOut
            className="header--link cursor-pointer text-slate-600 hover:text-slate-400 transition duration-150 ease-in-out"
            onClick={handleUserLogout}
          />
        </>
      ) : (
        <button>Login</button>
      )}
    </div>
  );
};

export default Header;

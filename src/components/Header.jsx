import React from "react";
import { LogOut } from "react-feather";
import { useAuth } from "../utils/AuthContext";

const Header = () => {
  const { user, handleUserLogout } = useAuth();

  return (
    <div
      className="mb-4 flex cursor-default justify-between rounded-3xl border-0 border-b-2 border-slate-800 bg-slate-950 px-6 pb-4 pt-8 font-semibold shadow-lg shadow-slate-800/50"
      id="header--wrapper"
    >
      {user ? (
        <>
          <span>Welcome, {user.name} ~</span>
          <LogOut
            className="cursor-pointer text-slate-600 transition duration-150 ease-in-out hover:text-slate-400"
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

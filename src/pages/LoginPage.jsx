import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const LoginPage = () => {
  const { user, handleUserLogin } = useAuth();
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="auth--container flex h-screen items-center justify-center">
      <div className="form-wrapper w-96 rounded-3xl border-b-2 border-slate-600 bg-slate-800 p-8 shadow-xl shadow-slate-600/50">
        <form
          onSubmit={(e) => {
            handleUserLogin(e, credentials);
          }}
        >
          <div className="field--wrapper mb-4 flex flex-col">
            <label className="hidden" htmlFor="login__email">
              Email:
            </label>
            <input
              className="w-full rounded-lg border-0 border-b-2 border-slate-500 bg-slate-700 p-4 shadow-md shadow-slate-500/50 outline-0 transition duration-300 ease-in-out placeholder:text-slate-400 hover:bg-slate-600 focus:-translate-y-1 focus:bg-slate-600 focus:text-white focus:shadow-lg focus:shadow-slate-400/50"
              id="login__email"
              name="email"
              placeholder="Enter your email ~"
              required
              type="email"
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper mb-4 flex flex-col">
            <label className="hidden" htmlFor="password">
              Password:
            </label>
            <input
              className="w-full rounded-lg border-0 border-b-2 border-slate-500 bg-slate-700 p-4 shadow-md shadow-slate-500/50 outline-0 transition duration-300 ease-in-out placeholder:text-slate-400 hover:bg-slate-600 focus:-translate-y-1 focus:bg-slate-600 focus:text-white focus:shadow-lg focus:shadow-slate-400/50"
              id="password"
              name="password"
              placeholder="Enter your password ~"
              required
              type="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper mb-4 flex flex-col">
            <input
              className="btn btn--lg btn--main cursor-pointer rounded-lg bg-emerald-600 p-4 font-bold uppercase shadow-md shadow-emerald-400/50 transition duration-300 ease-in-out hover:bg-emerald-500 hover:shadow-emerald-300/50 active:translate-y-1 active:bg-emerald-600 active:shadow-sm active:shadow-emerald-400/50"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <p className="cursor-default text-center">
          Don't have an account?{" "}
          <Link
            className="bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text font-bold text-transparent hover:from-green-300 hover:to-emerald-300"
            to="/register"
          >
            Register here ~
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

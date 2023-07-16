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
    <div className="auth--container h-screen flex justify-center items-center">
      <div className="form-wrapper p-8 w-96 bg-slate-800 border-b-2 border-slate-600 rounded-3xl shadow-slate-600/50 shadow-xl">
        <form
          onSubmit={(e) => {
            handleUserLogin(e, credentials);
          }}
        >
          <div className="field--wrapper flex flex-col mb-4">
            {/* <label htmlFor="login__email">Email:</label> */}
            <input
              className="bg-slate-700 border-0 border-b-2 border-slate-500 rounded-lg w-full outline-0 p-4 shadow-slate-500/50 shadow-md transition ease-in-out focus:-translate-y-1 focus:shadow-lg"
              id="login__email"
              name="email"
              placeholder="Enter your email..."
              required
              type="email"
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper flex flex-col mb-4">
            {/* <label htmlFor="password">Password:</label> */}
            <input
              className="bg-slate-700 border-0 border-b-2 border-slate-500 rounded-lg w-full outline-0 p-4 shadow-slate-500/50 shadow-md"
              id="password"
              name="password"
              placeholder="Enter password..."
              required
              type="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper flex flex-col mb-4">
            <input
              className="btn btn--lg btn--main p-4 rounded-lg cursor-pointer bg-gradient-to-b from-green-500 to-emerald-500 shadow-emerald-300/50 shadow-md font-bold uppercase transition ease-in-out active:translate-y-1 active:from-green-600 active:to-emerald-600"
              type="submit"
              value="Login"
            />
          </div>
        </form>
        <p className="text-center">
          Don't have an account?{" "}
          <Link
            className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-300 hover:to-emerald-300"
            to="/register"
          >
            Register here.
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

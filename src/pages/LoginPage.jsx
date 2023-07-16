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
          <div className="field--wrapper flex flex-col gap-4">
            {/* <label htmlFor="login__email">Email:</label> */}
            <input
              className="bg-slate-700 border-0 border-b-2 border-slate-500 rounded-lg w-full outline-0 p-4 shadow-slate-500/50 shadow-md"
              id="login__email"
              name="email"
              placeholder="Enter your email..."
              required
              type="email"
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper flex flex-col gap-4">
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
          <div className="field--wrapper flex flex-col gap-4">
            <input
              className="btn btn--lg btn--main p-4 rounded-lg cursor-pointer bg-gradient-to-b from-green-500 to-emerald-500 shadow-emerald-300/50 shadow-md"
              type="submit"
              value="Login"
            />
          </div>
        </form>

        <p>
          Don't have an account? Register <Link to="/register">here</Link>.
        </p>
      </div>
    </div>
  );
};

export default LoginPage;

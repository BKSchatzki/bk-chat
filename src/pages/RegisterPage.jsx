import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const RegisterPage = () => {
  const { handleUserRegister } = useAuth();

  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const handleInputChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    setCredentials({ ...credentials, [name]: value });
  };

  return (
    <div className="auth--container">
      <div className="form-wrapper">
        <form
          onSubmit={(e) => {
            handleUserRegister(e, credentials);
          }}
        >
          <div className="field--wrapper">
            <label htmlFor="register__name">Name:</label>
            <input
              id="register__name"
              name="name"
              placeholder="Enter your name..."
              required
              type="text"
              value={credentials.name}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label htmlFor="register__email">Email:</label>
            <input
              id="register__email"
              name="email"
              placeholder="Enter your email..."
              required
              type="email"
              value={credentials.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              placeholder="Enter password..."
              required
              type="password"
              value={credentials.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <label htmlFor="passwordConfirm">Confirm Password:</label>
            <input
              id="passwordConfirm"
              name="passwordConfirm"
              placeholder="Confirm password..."
              required
              type="password"
              value={credentials.passwordConfirm}
              onChange={handleInputChange}
            />
          </div>
          <div className="field--wrapper">
            <input
              className="btn btn--lg btn--main"
              type="submit"
              value="Login"
            />
          </div>
        </form>

        <p>
          Already have an account? Log in <Link to="/login">here</Link>.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

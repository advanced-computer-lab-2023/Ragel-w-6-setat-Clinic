import React from "react";
import { Link } from "react-router-dom";

function Login() {
  console.log("Login.js");
  return (
    <div>
      <h1>Login</h1>
      <form>
        <label>
          Email:
          <input type="email" name="email" />
        </label>
        <br />
        <label>
          Password:
          <input type="password" name="password" />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
      <br />
      <Link to="/registration">Don't have an account? Register here.</Link>
    </div>
  );
}

export default Login;

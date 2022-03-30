import React from "react";
import "./login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login">
        <h1>Login to Spotify</h1>
        <button className="login-btn">
          <a href={process.env.REACT_APP_AUTH_URL}>Login!</a>
        </button>
      </div>
    </div>
  );
};

export default Login;

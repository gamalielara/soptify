import * as React from "react";
import Navbar from "../../components/Navbar/Navbar";
import "./login.css";

const Login: React.FC = () => {
  return (
    <div className="login-container w-full h-screen my-0">
      <Navbar isLogin={false} />
      <div className="login w-full">
        <div className="hero-container fixed md:w-1/2 md:top-1/2 top-1/4 w-3/4 right-8 flex flex-col items-end">
          <h1 className="text-5xl font-bold text-right">
            Music for everyone.
            <br />
            Music at your fingertips
          </h1>
          <h4 className="text-3xl font-semibold text-right my-4">
            Discover millions of music now.
          </h4>
          <a href={process.env.REACT_APP_AUTH_URL}>
            <button className="login-btn my-1 py-4 px-8 bg-greenSpotify">
              Login!
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

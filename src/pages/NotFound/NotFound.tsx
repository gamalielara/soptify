import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  const isLoggedIn = localStorage.getItem("user") || null;

  return (
    <>
      <section className="p-8 flex flex-col items-center justify-center w-screen h-screen">
        <img
          src="./img/logo.png"
          alt="Spotify by gamalielboanerges"
          className="w-1/2 md:w-1/3 object-contain mx-auto mb-4"
        />
        <h1 className="text-base md:text-lg lg:text-xl font-bold text-center">
          It seems that you're lost. The page you're loking for is not available
        </h1>
        <button className="mx-auto my-8 px-4 py-2">
          <Link to="/">{isLoggedIn ? "Go Back" : "Login"}</Link>
        </button>
      </section>
    </>
  );
};

export default NotFound;

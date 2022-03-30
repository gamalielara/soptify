import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import React, { useEffect, useState } from "react";

function App() {
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const query = window.location.hash.substr(1).split(/&/g);
    if (query) {
      setAccessToken(query[0].split("=")[1]);
      localStorage.setItem("user", accessToken);
    }
  }, []);

  return <>{accessToken ? <Home token={accessToken} /> : <Login />}</>;
}

export default App;

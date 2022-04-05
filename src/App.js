import "./App.css";
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist";
import PlaylistSummary from "./pages/PlaylistSummary/PlaylistSummary";
import Login from "./pages/Login/Login";
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [playlistID, setPlaylistID] = useState(null);

  useEffect(() => {
    const query = window.location.hash.substr(1).split(/&/g);
    if (query) {
      setAccessToken(query[0].split("=")[1]);
      localStorage.setItem("user", accessToken);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            accessToken ? (
              <CreatePlaylist
                token={accessToken}
                setPlaylistID={setPlaylistID}
              />
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/summary"
          element={
            accessToken ? (
              <PlaylistSummary playlistID={playlistID} token={accessToken} />
            ) : (
              <Login />
            )
          }
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;

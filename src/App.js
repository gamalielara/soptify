import "./App.css";
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist";
import PlaylistSummary from "./pages/PlaylistSummary/PlaylistSummary";
import Login from "./pages/Login/Login";
import React, { useEffect, useState } from "react";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "./redux/tokenSlice";

function App() {
  const token = useSelector((state) => state.token.value);
  const dispatch = useDispatch();
  const [playlistID, setPlaylistID] = useState(null);

  useEffect(() => {
    const query = window.location.hash.substr(1).split(/&/g);
    if (query) {
      dispatch(getToken(query[0].split("=")[1]));
      localStorage.setItem("user", token);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            token ? (
              <CreatePlaylist token={token} setPlaylistID={setPlaylistID} />
            ) : (
              <Login />
            )
          }
        ></Route>
        <Route
          path="/summary"
          element={
            token ? (
              <PlaylistSummary playlistID={playlistID} token={token} />
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

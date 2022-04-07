import "./App.css";
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist";
import PlaylistSummary from "./pages/PlaylistSummary/PlaylistSummary";
import Login from "./pages/Login/Login";
import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getToken } from "./redux/tokenSlice";
import { Redirect } from "react-router-dom";
import Home from "./components/Home/Home";

function App() {
  const token = localStorage.getItem("user");
  const dispatch = useDispatch();
  const [playlistID, setPlaylistID] = useState(null);

  return (
    <Router>
      <Switch>
        <Route path="/summary">
          {token ? (
            <PlaylistSummary playlistID={playlistID} token={token} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/create">
          {token ? (
            <CreatePlaylist token={token} setPlaylistID={setPlaylistID} />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route path="/">
          <Home setPlaylistID={setPlaylistID} />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

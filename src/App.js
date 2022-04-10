import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import "./App.css";
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist";
import PlaylistSummary from "./pages/PlaylistSummary/PlaylistSummary";
import Login from "./pages/Login/Login";
import Home from "./components/Home/Home";
import { useState } from "react";

function App() {
  const token = localStorage.getItem("user");
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

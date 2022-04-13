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
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";

function App() {
  const token = localStorage.getItem("user");
  const [playlistID, setPlaylistID] = useState(null);

  return (
    <Router>
      <Switch>
        <ChakraProvider theme={theme}>
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
        </ChakraProvider>
      </Switch>
    </Router>
  );
}

export default App;

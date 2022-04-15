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
import { useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { useSelector } from "react-redux";
import Auth from "./pages/Auth/Auth";

function App() {
  const token =
    useSelector((state) => state.token.value) || localStorage.getItem("user");
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
            {token ? <Redirect to="/create" /> : <Login />}
          </Route>
          <Route path="/create">
            {token ? (
              <CreatePlaylist token={token} setPlaylistID={setPlaylistID} />
            ) : (
              <Redirect to="/login" />
            )}
          </Route>
          <Route path="/callback">
            <Auth />
          </Route>
          <Route exact path="/">
            {token ? <Redirect to="/create" /> : <Redirect to="/login" />}
          </Route>
        </ChakraProvider>
      </Switch>
    </Router>
  );
}

export default App;

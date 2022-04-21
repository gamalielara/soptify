import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import "./App.css";
import CreatePlaylist from "./pages/CreatePlaylist/CreatePlaylist";
import Login from "./pages/Login/Login";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./theme/theme";
import { useSelector } from "react-redux";
import { Token } from "./global/interface";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import MyPlaylists from "./pages/MyPlaylists/MyPlaylists";
import NotFound from "./pages/NotFound/NotFound";
import Playlist from "./pages/Playlist/Playlist";

function App() {
  const token =
    useSelector((state: Token) => state.token.value) ||
    localStorage.getItem("user");

  return (
    <Router>
      <ChakraProvider theme={theme}>
        <Switch>
          <Route path="/login">
            {token ? <Redirect to="/create" /> : <Login />}
          </Route>
          <Route path="/create">
            {token ? <CreatePlaylist /> : <Redirect to="/login" />}
          </Route>
          <Route path="/callback">
            <Auth />
          </Route>
          <Route path="/me">
            {token ? <Profile /> : <Redirect to="/login" />}
          </Route>
          <Route path="/myplaylists">
            {token ? <MyPlaylists /> : <Redirect to="/login" />}
          </Route>
          <Route path="/playlist/:id">
            {token ? <Playlist /> : <Redirect to="/login" />}
          </Route>
          <Route exact={true} path="/">
            {token ? <Redirect to="/create" /> : <Redirect to="/login" />}
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </ChakraProvider>
    </Router>
  );
}

export default App;

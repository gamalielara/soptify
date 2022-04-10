import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CreatePlaylist from "../../pages/CreatePlaylist/CreatePlaylist";
import { updateToken } from "../../redux/tokenSlice";
import Login from "../../pages/Login/Login";

const Home = ({ setPlaylistID }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const query = window.location.hash.substr(1).split(/&/g);
    const urlToken = query[0].split("=")[1];
    if (urlToken) {
      dispatch(updateToken(urlToken));
      localStorage.setItem("user", urlToken);
    }
  }, [dispatch]);
  const token = useSelector((state) => state.token.value);

  return (
    <>
      {token ? (
        <CreatePlaylist token={token} setPlaylistID={setPlaylistID} />
      ) : (
        <Login />
      )}
    </>
  );
};

export default Home;

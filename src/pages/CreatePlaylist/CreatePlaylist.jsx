import { useEffect, useState } from "react";
import { updateInput } from "../../redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import "./createplaylist.css";
import axios from "axios";
import SongsLists from "../../components/SongsLists/SongsLists";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CreatePlaylist = ({ token, setPlaylistID }) => {
  useEffect(() => {
    window.history.pushState({}, "", "/create");
    setAuthToken(token);
  }, [token]);

  const history = useHistory();
  const query = useSelector((state) => state.search.query);
  const dispatch = useDispatch();
  const [authToken, setAuthToken] = useState(null);
  const [fetchedSongs, setFetchedSongs] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistInfo, setPlaylistInfo] = useState({});

  const ENDPOINTAPI = "https://api.spotify.com/v1";
  const USERID = process.env.REACT_APP_USER_ID;
  const HEADERAUTH = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };

  const inputChangeHandler = (e) => {
    dispatch(updateInput(e.target.value));
  };

  const searchSongHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${ENDPOINTAPI}/search?q=track:${query}&type=album,track`,
        HEADERAUTH
      );
      const tracks = res.data.tracks.items;
      setFetchedSongs(tracks);
    } catch (err) {
      console.log(err);
    }
  };

  const playlistInfoInputHandler = (e) =>
    setPlaylistInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

  const createPlaylist = async () => {
    try {
      const res = await axios.post(
        `${ENDPOINTAPI}/users/${USERID}/playlists`,
        {
          name: playlistInfo.title,
          public: false,
          collaborative: false,
          description: playlistInfo.desc,
        },
        HEADERAUTH
      );
      addSongsToPlaylist(res.data.id);
      return res.data.id;
    } catch (err) {
      console.log(err);
    }
  };

  const addSongsToPlaylist = async (playlistID) => {
    try {
      await axios.post(
        `${ENDPOINTAPI}/playlists/${playlistID}/tracks`,
        {
          uris: selectedSongs,
          position: 0,
        },
        HEADERAUTH
      );
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createPlaylist().then((playlistID) => {
      setPlaylistID(playlistID);
      history.push("/summary");
    });
  };

  return (
    <div className="playlist-container">
      <form action="" onSubmit={submitHandler}>
        <div className="form-container">
          <div className="form-top">
            <img
              src="https://img.freepik.com/free-photo/handsome-man-listening-music-headphones_144627-18957.jpg"
              alt=""
            />
            <div className="form-desc-playlist">
              <h1>Create Playlist</h1>
              <input
                type="text"
                name="title"
                id="title"
                className="input"
                placeholder="Insert Title (Required)"
                onChange={playlistInfoInputHandler}
              />
              <textarea
                name="desc"
                id="desc"
                className="input"
                placeholder="Insert Descrtiption"
                onChange={playlistInfoInputHandler}
              ></textarea>
            </div>
          </div>
          <h2>Add Songs</h2>
          <div className="search-input">
            <input
              type="text"
              placeholder="Find songs ..."
              onChange={inputChangeHandler}
              onKeyPress={(e) => e.key === "Enter" && searchSongHandler(e)}
            />
            <button className="search-btn" onClick={searchSongHandler}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
          {fetchedSongs && (
            <SongsLists
              songs={fetchedSongs}
              selectedSongs={selectedSongs}
              setSelectedSongs={setSelectedSongs}
            />
          )}
          <button type="submit" className="button-submit" id="button-submit">
            <h3>Create Playlist</h3>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePlaylist;

import React, { useEffect, useState } from "react";
import "./createplaylist.css";
import SongsLists from "../../components/SongsLists/SongsLists";
import axios from "axios";
import { useNavigate } from "react-router";

const CreatePlaylist = ({ token, setPlaylist }) => {
  useEffect(() => {
    window.history.pushState({}, "", "/");
    setAuthToken(token);
  }, [token]);

  const navigate = useNavigate();

  const [searchValue, setSearchValue] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const [fetchedSongs, setFetchedSongs] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistInfo, setPlaylistInfo] = useState({});
  const ENDPOINTAPI = "https://api.spotify.com/v1/search";

  const inputChangeHandler = (e) => {
    setSearchValue(e.target.value);
  };

  const searchSongHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${ENDPOINTAPI}?q=track:${searchValue}&type=album,track`,
        {
          headers: {
            Authorization: "Bearer " + authToken,
          },
        }
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

  const submitHandler = (e) => {
    e.preventDefault();
    setPlaylist({ ...playlistInfo, tracks: selectedSongs });
    navigate("/summary");
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

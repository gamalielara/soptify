import React, { useEffect, useState } from "react";
import "./home.css";
import AddSong from "../../components/AddSong/AddSong";
import PlaylistInfo from "../../components/PlaylistInfo/PlaylistInfo";
import SongsLists from "../../components/SongsLists/SongsLists";
import axios from "axios";

const Home = ({ token }) => {
  useEffect(() => {
    window.history.pushState({}, "", "/");
    setAuthToken(token);
  }, [token]);

  const [searchValue, setSearchValue] = useState("");
  const [authToken, setAuthToken] = useState(null);
  const [data, setData] = useState(null);

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
      const tracks = res.data.tracks;
      setData(tracks.items);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="playlist-container">
      <PlaylistInfo
        image={
          "https://upload.wikimedia.org/wikipedia/id/0/0a/Taylor_Swift_-_Evermore.png"
        }
        name={"My Playlist"}
        desc={"This is gamalielboanerges's playlist"}
        songNumber={data ? data.length : 0}
      />

      <div className="bottom-menu-wrapper">
        <button className="play-btn">
          <i className="fa-solid fa-play"></i>
        </button>
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
      </div>

      <SongsLists items={data} />
    </div>
  );
};

export default Home;

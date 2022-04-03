import React, { useEffect } from "react";
import PlaylistInfo from "../../components/PlaylistInfo/PlaylistInfo";
import { useState } from "react";
import axios from "axios";
import SongsLists from "../../components/SongsLists/SongsLists";
import "./playlistsummary.css";

const PlaylistSummary = ({ token, playlistInfo }) => {
  const ENDPOINTAPI = "https://api.spotify.com/v1/tracks";
  const [tracks, setTracks] = useState([]);

  useEffect(() => fetchSongs(), [playlistInfo]);

  const fetchSongs = () => {
    playlistInfo.tracks.forEach(async (id) => {
      try {
        console.log(id);
        const res = await axios.get(`${ENDPOINTAPI}/${id}`, {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        setTracks((prev) => [...prev, res.data]);
      } catch (err) {
        console.log(err);
      }
    });
  };

  return (
    <div className="summary">
      <PlaylistInfo
        image="https://img.freepik.com/free-photo/man-park-listening-music_23-2147747878.jpg?w=996&t=st=1648881682~exp=1648882282~hmac=5d06f149bb9242d352cdb121dde853f411d33da01a307e4540987e713c5f3db4"
        name={playlistInfo.title || "My Playlist"}
        desc={playlistInfo.desc || ""}
        songNumber={playlistInfo.tracks.length}
      />
      {tracks.length > 0 ? <SongsLists songs={tracks} /> : <h1>No Tracks</h1>}
    </div>
  );
};

export default PlaylistSummary;

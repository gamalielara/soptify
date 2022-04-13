import React, { useEffect } from "react";
import PlaylistInfo from "../../components/PlaylistInfo/PlaylistInfo";
import { useState } from "react";
import axios from "axios";
import SongsLists from "../../components/SongsLists/SongsLists";
import "./playlistsummary.css";

const PlaylistSummary = ({ token, playlistID }) => {
  const [fetchedPlaylist, setFetchedPlaylist] = useState(null);
  const [fetchedSongs, setFetchedSongs] = useState([]);
  const ENDPOINTAPI = "https://api.spotify.com/v1";
  const HEADERAUTH = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };

  const fetchPlaylist = async () => {
    try {
      const res = await axios.get(
        `${ENDPOINTAPI}/playlists/${playlistID}`,
        HEADERAUTH
      );
      setFetchedPlaylist(res.data);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const fetchSongs = (data) => {
    console.log(data);
    const tracks = data.tracks.items;
    tracks.forEach(async (song) => {
      try {
        const id = song.track.id;
        const res = await axios.get(`${ENDPOINTAPI}/tracks/${id}`, HEADERAUTH);
        setFetchedSongs((prev) => [...prev, res.data]);
      } catch (err) {
        console.log(err);
      }
    });
  };

  useEffect(() => fetchPlaylist().then((data) => fetchSongs(data)), []);
  console.log(fetchedPlaylist, fetchedSongs);

  return (
    fetchedPlaylist &&
    fetchedSongs && (
      <div className="summary">
        <PlaylistInfo
          image={fetchedPlaylist.images[0].url}
          name={fetchedPlaylist.name || "My Playlist"}
          desc={fetchedPlaylist.description || ""}
          songNumber={fetchedPlaylist.tracks.items.length}
          user={fetchedPlaylist.owner.display_name}
          url={fetchedPlaylist.owner.external_urls.spotify}
        />
        {fetchedSongs.length > 0 ? (
          <SongsLists songs={fetchedSongs} />
        ) : (
          <h1>No Tracks</h1>
        )}
      </div>
    )
  );
};

export default PlaylistSummary;

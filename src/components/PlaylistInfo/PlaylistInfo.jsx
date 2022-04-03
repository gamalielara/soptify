import React from "react";
import "./playlistinfo.css";

const PlaylistInfo = ({ image, name, desc, songNumber }) => {
  return (
    <div className="playlist-info">
      <img src={image} />
      <div className="desc-playlist">
        <p>PLAYLIST</p>
        <h1>{name}</h1>
        <p>{desc}</p>
        <h4>
          <a href="#">gamalielboanerges</a> &#9679; {songNumber} songs
        </h4>
      </div>
    </div>
  );
};

export default PlaylistInfo;

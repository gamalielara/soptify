import React from "react";
import "./playlistinfo.css";

const PlaylistInfo = ({ image, name, desc, songNumber }) => {
  return (
    <div className="playlist-info-wrapper">
      <div className="playlist-info">
        <img src={image} />
        <div className="desc-playlist">
          <h1>{name}</h1>
          <p>{desc}</p>
          <h4>
            <a href="#">gamalielboanerges</a> &#9679; {songNumber} songs
          </h4>
        </div>
      </div>
      <button className="play-btn">
        <i className="fa-solid fa-play"></i>
      </button>
    </div>
  );
};

export default PlaylistInfo;

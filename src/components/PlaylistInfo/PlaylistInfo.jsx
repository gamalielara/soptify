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
      <div className="bottom-menu-wrapper">
        <button className="play-btn">
          <i className="fa-solid fa-play"></i>
        </button>
        <div className="search-input">
          <input type="text" placeholder="Find songs ..." />
          <button className="search-btn">
            <i class="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaylistInfo;

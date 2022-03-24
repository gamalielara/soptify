import React from "react";

const PlaylistInfo = ({ image, name, desc }) => {
  return (
    <div className="playlist-info">
      <img src={image} />
      <div className="desc-playlist">
        <h1>{name}</h1>
        <p>{desc}</p>
        <button className="play-btn">
          <span>
            <i className="fa-solid fa-play"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

export default PlaylistInfo;

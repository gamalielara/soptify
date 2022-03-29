import React from "react";
import "./rowitem.css";

const RowItem = ({ image, title, artist, album, index, link, releaseDate }) => {
  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="song-wrapper">
          <img src={image} alt="" />
          <div className="song-title-info">
            <p>
              <strong>{title}</strong>
            </p>
            <p>{artist}</p>
          </div>
        </div>
      </td>
      <td>{album}</td>
      <td>{releaseDate}</td>
      <td>
        <a href={link} target="_blank">
          <button>Select</button>
        </a>
      </td>
    </tr>
  );
};

export default RowItem;

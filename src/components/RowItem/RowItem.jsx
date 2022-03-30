import React from "react";
import "./rowitem.css";

const RowItem = ({ data, index }) => {
  const title = data.name;
  const image = data.album.images[2].url;
  const artist = data.artists[0].name;
  const album = data.album.name;
  const releaseDate = data.album.release_date;
  const link = data.external_urls.spotify;

  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="song-wrapper">
          <img src={image} alt="" />
          <div className="song-title-info">
            <p>
              <strong>{title}</strong>
              {data.explicit && <i class="fa-solid fa-e explicit"></i>}
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

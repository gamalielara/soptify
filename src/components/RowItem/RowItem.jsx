import React, { useState } from "react";
import "./rowitem.css";

const RowItem = ({
  song,
  index,
  setSelectedSongs,
  selectedSongs,
  isSelected,
}) => {
  const [selectedButton, setSelectedButton] = useState(isSelected);
  const title = song.name;
  const image = song.album.images[2].url;
  const artist = song.artists[0].name;
  const album = song.album.name;
  const releaseDate = song.album.release_date;
  const link = song.external_urls.spotify;

  const selectedSongsHandler = (e, isSelected) => {
    e.preventDefault();
    if (isSelected) {
      setSelectedButton(!selectedButton);
      setSelectedSongs(
        selectedSongs.filter((selectedSong) => selectedSong !== song.id)
      );
    } else {
      setSelectedButton(!selectedButton);
      setSelectedSongs((prev) => [...prev, song.id]);
    }
  };

  return (
    <tr>
      <td>{index}</td>
      <td>
        <div className="song-wrapper">
          <img src={image} alt="" />
          <div className="song-title-info">
            <p>
              <strong>
                <a href={link} className="title-link" target="_blank">
                  {title}
                </a>
              </strong>
              {song.explicit && <i className="fa-solid fa-e explicit"></i>}
            </p>
            <p>{artist}</p>
          </div>
        </div>
      </td>
      <td>{album}</td>
      <td>{releaseDate}</td>
      <td>
        {setSelectedSongs && (
          <button onClick={(e) => selectedSongsHandler(e, isSelected)}>
            {selectedButton ? "Deselect" : "Select"}
          </button>
        )}
      </td>
    </tr>
  );
};

export default RowItem;

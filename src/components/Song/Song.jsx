import { useState } from "react";
import "./song.css";

const Song = ({ song, index, setSelectedSongs, selectedSongs, isSelected }) => {
  const [selectedButton, setSelectedButton] = useState(isSelected);
  const title = song.name;
  const image = song.album.images[0].url;
  const album = song.album.name;
  const releaseDate = song.album.release_date;
  const link = song.external_urls.spotify;

  const selectedSongsHandler = (e, isSelected) => {
    e.preventDefault();
    if (isSelected) {
      setSelectedButton(!selectedButton);
      setSelectedSongs(
        selectedSongs.filter((selectedSong) => selectedSong !== song.uri)
      );
    } else {
      setSelectedButton(!selectedButton);
      setSelectedSongs((prev) => [...prev, song.uri]);
    }
  };

  return (
    <div className="song-container">
      <img src={image} alt="" />
      <div className="song-detail">
        <p>
          <strong>
            <a
              href={link}
              rel="noreferrer"
              className="title-link"
              target="_blank"
            >
              {title}
            </a>
          </strong>
          {song.explicit && <i className="fa-solid fa-e explicit"></i>}
        </p>
        <p>{album}</p>
        <p>{releaseDate}</p>
        {setSelectedSongs && (
          <button onClick={(e) => selectedSongsHandler(e, isSelected)}>
            {selectedButton ? "Deselect" : "Select"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Song;

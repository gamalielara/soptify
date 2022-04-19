import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedSongs } from "../../redux/selectedSongsSlice";
import "./song.css";

const Song = ({
  title,
  image,
  album,
  releaseDate,
  link,
  isSelected,
  isExplicit,
  uri,
}) => {
  const [selectedButton, setSelectedButton] = useState(isSelected);
  const selectedSongs = useSelector((state) => state.selectedSongs.value);
  const dispatch = useDispatch();

  const selectedSongsHandler = (e, isSelected) => {
    e.preventDefault();
    if (isSelected) {
      setSelectedButton(!selectedButton);
      const updatedSongs = selectedSongs.filter(
        (selectedSong) => selectedSong !== uri
      );
      dispatch(setSelectedSongs(updatedSongs));
    } else {
      setSelectedButton(!selectedButton);
      dispatch(setSelectedSongs([...selectedSongs, uri]));
    }
  };

  return (
    <div className="song-container">
      <img src={image} alt={title} />
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
          {isExplicit && <i className="fa-solid fa-e explicit"></i>}
        </p>
        <p>{album}</p>
        <p>{releaseDate}</p>
      </div>
      {setSelectedSongs && (
        <button onClick={(e) => selectedSongsHandler(e, isSelected)}>
          {selectedButton ? "Deselect" : "Select"}
        </button>
      )}
    </div>
  );
};

export default Song;

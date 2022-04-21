import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SelectedSongs } from "../../global/interface";
import { setSelectedSongs } from "../../redux/selectedSongsSlice";
import "./song.css";

interface Props {
  title: string;
  image: string;
  album: string;
  artist: string;
  link: string;
  isSelected: boolean;
  isExplicit: boolean;
  uri: string;
}

const Song: React.FC<Props> = ({
  title,
  image,
  album,
  artist,
  link,
  isSelected,
  isExplicit,
  uri,
}) => {
  const [selectedButton, setSelectedButton] = useState<boolean>(isSelected);
  const selectedSongs = useSelector(
    (state: SelectedSongs) => state.selectedSongs.value
  );
  const dispatch = useDispatch();

  const selectedSongsHandler = (
    e: React.MouseEvent<HTMLButtonElement>,
    isSelected: boolean
  ) => {
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
    <div className="song-container flex p-4 my-4 md:my-8 rounded-md items-center justify-around">
      <img
        src={image}
        alt={title}
        className="w-1/3 md:w-1/4 lg:w-1/5 mr-2 md:mr-4 object-contain rounded"
      />
      <div className="song-detail w-2/3">
        <p className="text-sm sm:text-lg md:text-xl">
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
          {isExplicit && (
            <span
              className="explicit ml-1 inline-block bg-black/[.2] rounded"
              title="explicit"
            >
              <i className="fa-solid fa-e explicit"></i>
            </span>
          )}
        </p>
        <p className="text-xs sm:text-base font-semibold">{artist}</p>
        <p className="text-xs sm:text-base">{album}</p>
        <button
          onClick={(e) => selectedSongsHandler(e, isSelected)}
          className="block md:hidden mt-2"
        >
          <span className="text-sm">
            {selectedButton ? "Deselect" : "Select"}
          </span>
        </button>
      </div>
      <button
        onClick={(e) => selectedSongsHandler(e, isSelected)}
        className="hidden md:block h-max"
      >
        <span className="text-lg">
          {selectedButton ? "Deselect" : "Select"}
        </span>
      </button>
    </div>
  );
};

export default Song;

import Song from "../Song/Song";
import "./songlists.css";

const SongsLists = ({ songs, selectedSongs, setSelectedSongs }) => {
  return (
    <section className="songs-container">
      {songs.map((song, i) => (
        <Song
          key={song.id}
          song={song}
          index={i + 1}
          selectedSongs={selectedSongs}
          setSelectedSongs={setSelectedSongs}
          isSelected={selectedSongs && selectedSongs.includes(song.uri)}
        />
      ))}
    </section>
  );
};

export default SongsLists;

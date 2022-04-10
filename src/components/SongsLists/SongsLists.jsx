import RowItem from "../RowItem/RowItem";

const SongsLists = ({ songs, selectedSongs, setSelectedSongs }) => {
  return (
    <table cellPadding="5">
      <thead>
        <tr>
          <th>#</th>
          <th>TITLE</th>
          <th>ALBUM</th>
          <th>RELEASE DATE</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="tbody">
        {songs.map((song, i) => (
          <RowItem
            key={song.id}
            song={song}
            index={i + 1}
            selectedSongs={selectedSongs}
            setSelectedSongs={setSelectedSongs}
            isSelected={selectedSongs && selectedSongs.includes(song.uri)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default SongsLists;

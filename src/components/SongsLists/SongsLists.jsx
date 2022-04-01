import React from "react";
import RowItem from "../RowItem/RowItem";

const SongsLists = ({ songs, selectedSongs, setSelectedSongs }) => {
  return (
    <table cellPadding="5">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Album</th>
          <th>Relase Date</th>
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
            isSelected={selectedSongs.includes(song.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default SongsLists;

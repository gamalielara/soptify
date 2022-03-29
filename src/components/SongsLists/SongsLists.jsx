import React from "react";
import RowItem from "../RowItem/RowItem";

const SongsLists = ({ data }) => {
  return (
    <table cellPadding="5">
      <thead>
        <tr>
          <th>#</th>
          <th>Title</th>
          <th>Artist</th>
          <th>Relase Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="tbody">
        {data.map((item, i) => (
          <RowItem
            key={item.id}
            image={item.album.images[2].url}
            title={item.name}
            artist={item.artists[0].name}
            album={item.album.name}
            link={item.external_urls.spotify}
            releaseDate={item.album.release_date}
            index={i + 1}
          />
        ))}
      </tbody>
    </table>
  );
};

export default SongsLists;

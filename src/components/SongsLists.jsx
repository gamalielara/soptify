import React from "react";
import RowItem from "./RowItem";

const SongsLists = ({ data }) => {
  return (
    <table cellPadding="5">
      <thead>
        <tr>
          <th></th>
          <th>Title</th>
          <th>Artist</th>
          <th>Album</th>
          <th></th>
        </tr>
      </thead>
      <tbody id="tbody">
        <RowItem
          image={data.album.images[2].url}
          title={data.name}
          artist={data.artists[0].name}
          album={data.album.name}
        />
        <RowItem
          image={data.album.images[2].url}
          title={data.name}
          artist={data.artists[0].name}
          album={data.album.name}
        />
        <RowItem
          image={data.album.images[2].url}
          title={data.name}
          artist={data.artists[0].name}
          album={data.album.name}
        />
      </tbody>
    </table>
  );
};

export default SongsLists;

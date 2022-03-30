import React from "react";
import RowItem from "../RowItem/RowItem";

const SongsLists = ({ items }) => {
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
        {items &&
          items.map((item, i) => (
            <RowItem key={item.id} data={item} index={i + 1} />
          ))}
      </tbody>
    </table>
  );
};

export default SongsLists;

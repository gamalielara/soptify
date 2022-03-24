import React from "react";

const RowItem = ({ image, title, artist, album }) => {
  return (
    <tr>
      <td>
        <img src={image} alt="" />
      </td>
      <td>{title}</td>
      <td>{artist}</td>
      <td>{album}</td>
      <td>
        <button>Select</button>
      </td>
    </tr>
  );
};

export default RowItem;

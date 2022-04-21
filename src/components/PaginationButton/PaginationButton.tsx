import React from "react";

interface Props {
  songsPerPage: number;
  totalSongs: number;
  paginate: (pageNumber: number) => void;
}

const PaginationButton: React.FC<Props> = ({
  songsPerPage,
  totalSongs,
  paginate,
}) => {
  const pagination = Math.ceil(totalSongs / songsPerPage);
  return (
    <>
      {Array(pagination)
        .fill(0)
        .map((i, n) => (
          <button
            key={n + 1}
            className="mx-4 w-8 h-8"
            onClick={() => paginate(n + 1)}
          >
            {n + 1}
          </button>
        ))}
    </>
  );
};

export default PaginationButton;

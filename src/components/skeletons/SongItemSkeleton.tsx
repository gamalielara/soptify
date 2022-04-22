import React from "react";

const SongItemSkeleton: React.FC = () => {
  return (
    <div className="song-container flex p-4 my-4 md:my-8 rounded-md items-center w-full mx-auto">
      <div className="w-1/4 h-24 lg:w-1/12 mr-2 md:mr-4 object-contain rounded bg-gray-500/[.5] animate-pulse"></div>
      <div className="song-detail w-2/3">
        <div className="skeleton-heading bg-gray-500/[.5] rounded h-6 w-1/2 my-2 animate-pulse"></div>
        <div className="skeleton-text bg-gray-500/[.5] rounded h-4 w-full my-2 animate-pulse"></div>
        <div className="skeleton-text bg-gray-500/[.5] rounded h-4 w-full my-2 animate-pulse"></div>
        <div className="skeleton-text bg-gray-500/[.5] rounded h-4 w-full my-2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default SongItemSkeleton;

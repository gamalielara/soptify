import React from "react";

const TopArtistSkeleton: React.FC = () => {
  return (
    <div
      className="sekeleton-artist relative bg-gray-600/[.5] rounded animate-pulse"
      style={{ paddingTop: "100%" }}
    >
      <div className="skeleton-details absolute bottom-0 w-full p-4">
        <div className="skeleton-heading bg-gray-500/[.5] rounded h-6 w-1/2 my-2 animate-pulse"></div>
        <div className="skeleton-text bg-gray-500/[.5] rounded h-4 w-full my-2 animate-pulse"></div>
        <div className="skeleton-text bg-gray-500/[.5] rounded h-4 w-full my-2 animate-pulse"></div>
        <div className="skeleton-text bg-gray-500/[.5] rounded h-4 w-1/4 my-2 animate-pulse"></div>
      </div>
    </div>
  );
};

export default TopArtistSkeleton;

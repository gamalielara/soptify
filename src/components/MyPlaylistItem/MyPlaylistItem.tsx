import React from "react";

interface Props {
  name: string;
  desc: string;
  img: string;
  totalTracks: number;
  id: string;
}

const MyPlaylistItem: React.FC<Props> = ({
  name,
  desc,
  img,
  totalTracks,
  id,
}) => {
  return (
    <div className="song-container flex p-4 my-4 md:my-8 rounded-md items-center mx-auto">
      <div
        className="image-container w-1/5 mr-4 relative"
        style={{ paddingTop: "20%" }}
      >
        <img
          src={img}
          alt={name}
          className="w-full h-full object-cover rounded absolute top-0 left-0"
        />
      </div>
      <div className="song-detail w-2/3">
        <p className="text-sm sm:text-lg md:text-2xl hover:text-greenSpotify">
          <a href={`/playlist/${id}`}>
            <strong>{name}</strong>
          </a>
        </p>
        <p className="text-xs md:text-base my-2">{desc}</p>
        <p className="text-sm md:text-lg">{totalTracks} songs</p>
      </div>
    </div>
  );
};

export default MyPlaylistItem;

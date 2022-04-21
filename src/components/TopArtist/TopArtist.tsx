import React, { useState } from "react";

interface Props {
  src: string;
  name: string;
  followers: number;
}

const TopArtist: React.FC<Props> = ({ src, name, followers }) => {
  const [transparent, setTransparent] = useState<boolean>(true);
  return (
    <div
      className="artist relative"
      onMouseEnter={() => setTransparent(false)}
      onMouseLeave={() => setTransparent(true)}
    >
      <div
        className={`details absolute bottom-0 left-0 w-full h-full bg-black/[.3] flex flex-col justify-end p-4 hover:cursor-pointer rounded-md 
            ${transparent ? "opacity-0" : "opacity-100"}
            `}
      >
        <h3 className="text-base lg:text-2xl font-semibold">{name}</h3>
        <p className="text-sm">{followers} followers</p>
      </div>
      <img src={src} alt={name} className="w-full object-contain rounded-md" />
    </div>
  );
};

export default TopArtist;

import React from "react";

interface Props {
  n: number | null;
  title: string;
  image: string;
  album: string;
  artist: string;
  link: string;
  isExplicit: boolean;
}

const Track: React.FC<Props> = ({
  n,
  title,
  image,
  album,
  artist,
  link,
  isExplicit,
}) => {
  return (
    <div className="song-container flex p-4 my-4 md:my-8 rounded-md items-center">
      {n && <p className="font-bold text-lg mr-2 md:mr-4">{n}</p>}
      <img
        src={image}
        alt={title}
        className="w-1/4 lg:w-1/12 mr-2 md:mr-4 object-contain rounded"
      />
      <div className="song-detail w-2/3">
        <p className="text-sm sm:text-lg md:text-xl">
          <strong>
            <a
              href={link}
              rel="noreferrer"
              className="title-link"
              target="_blank"
            >
              {title}
            </a>
          </strong>
          {isExplicit && (
            <span
              className="explicit ml-1 inline-block bg-black/[.2] rounded"
              title="explicit"
            >
              <i className="fa-solid fa-e explicit"></i>
            </span>
          )}
        </p>
        <p className="text-xs sm:text-base font-semibold">{artist}</p>
        <p className="text-xs sm:text-base">{album}</p>
      </div>
    </div>
  );
};

export default Track;

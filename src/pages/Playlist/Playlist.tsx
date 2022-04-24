import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useParams } from "react-router";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import PaginationButton from "../../components/PaginationButton/PaginationButton";
import SongItemSkeleton from "../../components/skeletons/SongItemSkeleton";
import Track from "../../components/Track/Track";
import { PlaylistTrackItem } from "../../global/interface";
import { ENDPOINTAPI, HEADERAUTH } from "../../global/variables";

interface Params {
  id: string;
}

interface FetchedPlaylist {
  description: string;
  name: string;
  images: [{ url: string }];
  owner: {
    display_name: string;
  };
  tracks: {
    items: PlaylistTrackItem[];
    total: number;
  };
}

const Playlist: React.FC = () => {
  const [playlist, setPlaylist] = useState<FetchedPlaylist | null>(null);
  const [showedSongs, setShowedSongs] = useState<PlaylistTrackItem[] | null>(
    null
  );
  const params = useParams<Params>();
  params.id || <Redirect to="/" />;

  useEffect(() => {
    const getPlaylistInfo = async () => {
      try {
        const res = await axios.get(
          `${ENDPOINTAPI}/playlists/${params.id}?limit=500`,
          HEADERAUTH(localStorage.getItem("user")!)
        );
        const data = res.data;
        setPlaylist(data);
        paginate(1);
      } catch (err) {
        console.log(err);
        const error = err as AxiosError;
        if (error.response && error.response.status === 401) {
          alert("Token expired!");
          localStorage.clear();
          window.location.reload();
        }
      }
    };
    getPlaylistInfo();
  });

  // pagination
  const songsPerPage = 20;
  const paginate = (pageNumber: number) => {
    const lastSongIndex = pageNumber * songsPerPage;
    const firstSongIndex = lastSongIndex - songsPerPage;
    playlist &&
      setShowedSongs(
        playlist.tracks.items.slice(firstSongIndex, lastSongIndex)
      );
  };

  // updating pagination
  // useEffect(() => {
  //   paginate(1);
  // }, [playlist.tracks]);

  return (
    <>
      <Navbar page={null} />
      <section className="playlist w-full p-4 md:p-8 lg:w-2/3 mx-auto">
        <div className="playlist-info w-full flex flex-col md:flex-row">
          <div className="image-wrapper md:w-1/5 w-1/2 mx-auto md:mx-0 mb-4 md:mb-0">
            <div
              className="image-container w-full relative"
              style={{ paddingTop: "100%" }}
            >
              <img
                src={playlist?.images[0].url}
                alt=""
                className="rounded w-full object-cover absolute top-0 left-0 h-full"
              />
            </div>
          </div>
          {playlist && (
            <div className="desc md:ml-4 flex flex-col justify-center">
              <p className="lg:text-3xl md:text-2xl text-lg font-bold">
                {playlist.name}
              </p>
              <p className="lg:text-xl md:text-base text-xs font-semibold">
                {playlist.description}
              </p>
              <p className="md:text-lg text-xs">
                {playlist?.owner.display_name} - {playlist.tracks.total} songs
              </p>
            </div>
          )}
        </div>
        <div className="songs-container">
          {showedSongs
            ? showedSongs.map((song) => (
                <Track
                  n={null}
                  key={song.track.id}
                  title={song.track.name}
                  image={song.track.album.images[0].url}
                  album={song.track.album.name}
                  artist={song.track.artists[0].name}
                  link={song.track.external_urls.spotify}
                  isExplicit={song.track.explicit}
                />
              ))
            : Array(10)
                .fill(0)
                .map((item, i) => <SongItemSkeleton key={i} />)}
        </div>
        {playlist && (
          <div className="pagination-button flex w-full justify-center mt-8">
            <PaginationButton
              songsPerPage={songsPerPage}
              totalSongs={playlist.tracks.items.length}
              paginate={paginate}
            />
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default Playlist;

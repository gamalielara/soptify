import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { Redirect, useHistory, useParams } from "react-router";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import PaginationButton from "../../components/PaginationButton/PaginationButton";
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
  const history = useHistory();
  params.id || <Redirect to="/" />;

  useEffect(() => {
    const getPlaylistInfo = async () => {
      try {
        const res = await axios.get(
          `${ENDPOINTAPI}/playlists/${params.id}?limit=500`,
          HEADERAUTH
        );
        const data = res.data;
        setPlaylist(data);
      } catch (err) {
        console.log(err);
        const error = err as AxiosError;
        if (error.response && error.response.status === 401) {
          alert("Token expired!");
          localStorage.clear();
          history.push("/");
        }
      }
    };
    getPlaylistInfo();
  }, []);

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

  useEffect(() => {
    paginate(1);
  }, [playlist?.tracks]);

  return (
    <>
      <Navbar page={null} />
      <section className="playlist w-full p-4 md:p-8 lg:w-2/3 mx-auto">
        <div className="playlist-info w-2/3 md:w-full flex">
          <div className="image-wrapper w-1/5">
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
            <div className="desc ml-4 flex flex-col justify-center">
              <p className="text-3xl font-bold">{playlist.name}</p>
              <p className="text-xl font-semibold">{playlist.description}</p>
              <p className="text-lg">
                {playlist?.owner.display_name} - {playlist.tracks.total} songs
              </p>
            </div>
          )}
        </div>
        <div className="songs-container">
          {showedSongs &&
            showedSongs.map((song) => (
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
            ))}
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

import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { ENDPOINTAPI } from "../../global/variables";
import MyPlaylistItem from "../../components/MyPlaylistItem/MyPlaylistItem";
import Navbar from "../../components/Navbar/Navbar";
import PlaylistItemSkeleton from "../../components/skeletons/PlaylistItemSkeleton";
import Footer from "../../components/Footer/Footer";
import { useHistory } from "react-router";

interface Playlist {
  description: string;
  id: string;
  external_urls: {
    spotify: string;
  };
  images: [
    {
      url: string;
    }
  ];
  name: string;
  public: boolean;
  tracks: {
    href: string;
    total: number;
  };
}

const MyPlaylists: React.FC = () => {
  const [myPlaylists, setMyPlaylists] = useState<Playlist[] | null>(null);
  const history = useHistory();

  useEffect(() => {
    const getMyPlaylists = async () => {
      try {
        const res = await axios.get(`${ENDPOINTAPI}/me/playlists`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user"),
          },
        });
        const data = res.data.items;
        setMyPlaylists(data);
        console.log(data);
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
    getMyPlaylists();
  }, []);

  return (
    <>
      <Navbar page={"MyPlaylists"} />
      <main className="my-playlists lg:p-8 md:p-4 p-2">
        <h1 className="text-4xl font-bold">My Playlists</h1>
        <section className="w-full md:w-3/4 playlists-container mx-auto">
          {myPlaylists
            ? myPlaylists.map((playlist) => (
                <MyPlaylistItem
                  key={playlist.id}
                  name={playlist.name}
                  desc={playlist.description}
                  totalTracks={playlist.tracks.total}
                  img={playlist.images[0].url}
                  id={playlist.id}
                />
              ))
            : Array(10)
                .fill(0)
                .map(() => <PlaylistItemSkeleton />)}
        </section>
      </main>
      <Footer />
    </>
  );
};

export default MyPlaylists;

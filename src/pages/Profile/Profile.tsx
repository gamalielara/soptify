import axios, { AxiosError } from "axios";
import React, { useEffect, useState } from "react";
import { ENDPOINTAPI } from "../../global/variables";
import Navbar from "../../components/Navbar/Navbar";
import TopArtistSkeleton from "../../components/skeletons/TopArtistSkeleton";
import TopTrackSkeleton from "../../components/skeletons/TopTrackSkeleton";
import TopArtist from "../../components/TopArtist/TopArtist";
import Track from "../../components/Track/Track";
import { SongItem } from "../../global/interface";
import { useHistory } from "react-router";
import Footer from "../../components/Footer/Footer";

interface User {
  display_name: string;
  external_urls: object;
  followers: {
    total: number;
  };
  href: string;
  id: string;
  images: [{ url: string }];
  type: string;
  uri: string;
}

interface ArtistItem {
  external_urls: {
    spotify: string;
  };
  followers: {
    total: number;
  };
  genres: string[];
  href: string;
  id: string;
  images: [
    {
      url: string;
      width: number;
    }
  ];
  name: string;
  uri: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<null | User>(null);
  const [topArtists, setTopArtists] = useState<null | ArtistItem[]>(null);
  const [topTracks, setTopTracks] = useState<null | SongItem[]>(null);
  const history = useHistory();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${ENDPOINTAPI}/me`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user"),
          },
        });
        const data = res.data;
        setUser(data);
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
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const res = await axios.get(`${ENDPOINTAPI}/me/top/tracks?limit=10`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user"),
          },
        });
        const data = res.data.items;
        setTopTracks(data);
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
    fetchTopTracks();
  }, []);

  useEffect(() => {
    const fetchTopArtists = async () => {
      try {
        const res = await axios.get(`${ENDPOINTAPI}/me/top/artists?limit=10`, {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("user"),
          },
        });
        const data = res.data.items;
        setTopArtists(data);
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
    fetchTopArtists();
  }, []);

  return (
    <>
      <Navbar page={"Profile"} />
      <main className="my-profile w-full bg-blackSpotify p-2 md:p-4 lg:p-8 lg:px-24">
        {user && (
          <div className="profile-summary flex items-center w-full">
            <img
              src={user.images[0].url}
              alt=""
              className="rounded-full h-32 w-32 md:w-52 md:h-52 object-cover mr-4"
            />
            <div className="profile-details">
              <h1 className="profile-name text-xl md:text-4xl font-bold my-4">
                {user.display_name}
              </h1>
              <p className="text-lg md:text-xl font-semibold">
                {user.followers.total} Followers
              </p>
            </div>
          </div>
        )}
        <section className="my-top-artists mt-8 md:mt-16">
          <h3 className="text-3xl font-bold mb-8">My Top Artist</h3>
          <div className="artists grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-self-center">
            {topArtists && topArtists.length === 10
              ? topArtists.map((artist) => (
                  <TopArtist
                    key={artist.id}
                    src={artist.images[0].url}
                    name={artist.name}
                    followers={artist.followers.total}
                  />
                ))
              : Array(10)
                  .fill(0)
                  .map((item, i) => <TopArtistSkeleton key={i} />)}
          </div>
        </section>

        <section className="my-top-tracks mt-8 md:mt-16">
          <h3 className="text-3xl font-bold">My Top Tracks</h3>
          <div className="top-tracks-container">
            {topTracks && topTracks.length >= 10
              ? topTracks.map((track, i) => (
                  <Track
                    n={i + 1}
                    key={track.id}
                    title={track.name}
                    image={track.album.images[0].url}
                    album={track.album.name}
                    artist={track.artists[0].name}
                    link={track.external_urls.spotify}
                    isExplicit={track.explicit}
                  />
                ))
              : Array(10)
                  .fill(0)
                  .map((item, i) => <TopTrackSkeleton key={i} />)}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Profile;

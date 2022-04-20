import axios from "axios";
import React, { useEffect, useState } from "react";
import { ENDPOINTAPI } from "../../App";
import Artist from "../../components/Artist/Artist";
import Navbar from "../../components/Navbar/Navbar";

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

interface Track {
  album: {
    name: string;
  };
  artists: [
    {
      href: string;
      name: string;
    }
  ];
  duration: number;
  explicit: boolean;
  href: string;
  id: string;
  name: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<null | User>(null);
  const [topArtists, setTopArtists] = useState<null | ArtistItem[]>(null);
  const [topTracks, setTopTracks] = useState<null | Track[]>(null);

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
        console.log(data);
        setTopTracks(data);
      } catch (err) {
        console.log(err);
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
      }
    };
    fetchTopArtists();
  }, []);

  return (
    <>
      <Navbar isLogin={true} />
      <section className="my-profile w-screen bg-blackSpotify p-2 md:p-4 lg:p-8 lg:px-24">
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

        {topArtists && (
          <div className="my-top-artists mt-8 md:mt-16">
            <h3 className="text-3xl font-bold mb-8">My Top Artist</h3>
            <div className="artists grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 justify-self-center">
              {topArtists.map((artist) => (
                <Artist
                  key={artist.id}
                  src={artist.images[0].url}
                  name={artist.name}
                  followers={artist.followers.total}
                />
              ))}
            </div>
          </div>
        )}

        <div className="my-top-tracks mt-8 md:mt-16">
          <h3 className="text-3xl font-bold">My Top Tracks</h3>
        </div>
      </section>
    </>
  );
};

export default Profile;

import React from "react";
import "./home.css";
import data from "../../single-sample";
import AddSong from "../../components/AddSong/AddSong";
import PlaylistInfo from "../../components/PlaylistInfo/PlaylistInfo";
import SongsLists from "../../components/SongsLists/SongsLists";

const Home = () => {
  return (
    <>
      {/* <AddSong /> */}

      <div className="playlist-container">
        <PlaylistInfo
          image={
            "https://upload.wikimedia.org/wikipedia/id/0/0a/Taylor_Swift_-_Evermore.png"
          }
          name={"My Playlist"}
          desc={"This is gamalielboanerges's playlist"}
          songNumber={10}
        />
        <SongsLists data={data} />
      </div>
    </>
  );
};

export default Home;

import React from "react";
import "./home.css";
import data from "../single-sample";

const Home = () => {
  //   console.log(data);

  return (
    <>
      {/* ---FORM--- */}
      {/* <div className="form-container">
      <img
        src="https://img.freepik.com/free-photo/handsome-man-listening-music-headphones_144627-18957.jpg"
        alt=""
      />
      <form action="">
        <h4>Add A New Song</h4>
        <input
          type="text"
          name="title"
          id="title"
          className="input"
          placeholder="Insert Title (Required)"
        />
        <input
          type="text"
          name="artist"
          id="artist"
          className="input"
          placeholder="Insert Artist"
        />
        <input
          type="text"
          name="album"
          id="album"
          className="input"
          placeholder="Insert Album"
        />
        <textarea
          name="desc"
          id="desc"
          className="input"
          placeholder="Insert Descrtiption"
        ></textarea>
        <button type="submit" className="button-submit" id="button-submit">
          Get the song!
        </button>
      </form>
    </div> */}

      <div className="playlist-container">
        <div className="playlist-info">
          <img
            src="https://upload.wikimedia.org/wikipedia/id/0/0a/Taylor_Swift_-_Evermore.png"
            alt="evermoretaylorswift"
          />
          <div className="desc-playlist">
            <h1>My Playlist</h1>
            <p>
              This is Gamalielboanerges's Playlist during Generasi GIGIH 2.0
              event
            </p>
            <button className="play-btn">
              <span>
                <i className="fa-solid fa-play"></i>
              </span>
            </button>
          </div>
        </div>
        <table cellPadding="5">
          <thead>
            <tr>
              <th></th>
              <th>Title</th>
              <th>Artist</th>
              <th>Album</th>
              <th></th>
            </tr>
          </thead>
          <tbody id="tbody">
            <tr>
              <td>
                <img src={data.album.images[2].url} alt="" />
              </td>
              <td>{data.name}</td>
              <td>{data.artists[0].name}</td>
              <td>{data.album.name}</td>
              <td>
                <button>Select</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;

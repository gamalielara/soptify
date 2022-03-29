import React from "react";
import "./addsong.css";

const AddSong = () => {
  return (
    <div className="form-container">
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
    </div>
  );
};

export default AddSong;

import { useEffect, useState } from "react";
import { updateInput } from "../../redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import "./createplaylist.css";
import axios from "axios";
import SongsLists from "../../components/SongsLists/SongsLists";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Button,
  Image,
  Flex,
  Text,
  Box,
} from "@chakra-ui/react";

import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const CreatePlaylist = ({ token, setPlaylistID }) => {
  const history = useHistory();
  const query = useSelector((state) => state.search.query);
  const dispatch = useDispatch();
  const [authToken, setAuthToken] = useState(null);
  const [fetchedSongs, setFetchedSongs] = useState(null);
  const [selectedSongs, setSelectedSongs] = useState([]);
  const [playlistInfo, setPlaylistInfo] = useState({});

  const ENDPOINTAPI = "https://api.spotify.com/v1";
  const USERID = process.env.REACT_APP_USER_ID;
  const HEADERAUTH = {
    headers: {
      Authorization: "Bearer " + authToken,
    },
  };

  useEffect(() => {
    setAuthToken(token);
  }, [token]);

  const inputChangeHandler = (e) => {
    dispatch(updateInput(e.target.value));
  };

  const searchSongHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(
        `${ENDPOINTAPI}/search?q=track:${query}&type=album,track`,
        HEADERAUTH
      );
      const tracks = res.data.tracks.items;
      setFetchedSongs(tracks);
    } catch (err) {
      console.log(err);
    }
  };

  const playlistInfoInputHandler = (e) =>
    setPlaylistInfo((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });

  const createPlaylist = async () => {
    try {
      const res = await axios.post(
        `${ENDPOINTAPI}/users/${USERID}/playlists`,
        {
          name: playlistInfo.title,
          public: false,
          collaborative: false,
          description: playlistInfo.desc,
        },
        HEADERAUTH
      );
      addSongsToPlaylist(res.data.id);
      return res.data.id;
    } catch (err) {
      console.log(err);
    }
  };

  const addSongsToPlaylist = async (playlistID) => {
    try {
      await axios.post(
        `${ENDPOINTAPI}/playlists/${playlistID}/tracks`,
        {
          uris: selectedSongs,
          position: 0,
        },
        HEADERAUTH
      );
    } catch (err) {
      console.log(err);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    createPlaylist().then((playlistID) => {
      setPlaylistID(playlistID);
      history.push("/summary");
    });
  };

  const checkTitleError = playlistInfo.title && playlistInfo.title.length < 10;

  return (
    <>
      <Flex m="50px auto" bg="white" width="50%" borderRadius="10px">
        <Image
          src="https://img.freepik.com/free-photo/handsome-man-listening-music-headphones_144627-18957.jpg"
          alt=""
          width="30%"
          variant="form-image"
        />
        <Box p={10} width="70%">
          <FormControl isInvalid={checkTitleError}>
            <Text fontSize="xl" mb={15} fontWeight={600} color="black">
              Create A New playlist
            </Text>
            <FormLabel htmlFor="playlist-title">
              Playlist Title (min. 10 words)
            </FormLabel>
            <Input
              id="playlist-title"
              placeholder="Insert Playlist Title Here ...."
              name="title"
              color="black"
              onChange={playlistInfoInputHandler}
            />
            {checkTitleError ? (
              <FormHelperText>
                The playlist title must contain 10 characters or more.
              </FormHelperText>
            ) : (
              <FormHelperText>Insert playlist title Here</FormHelperText>
            )}
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="playlist-desc" mt={5}>
              Playlist Description
            </FormLabel>
            <Input
              id="playlist-desc"
              placeholder="Insert Playlist Description Here ...."
              name="desc"
              color="black"
              onChange={playlistInfoInputHandler}
            />
          </FormControl>
        </Box>
      </Flex>
      <Box width="50%" margin="10px auto">
        <Flex>
          <Input
            type="text"
            placeholder="Find songs ..."
            color="white"
            onChange={inputChangeHandler}
            onKeyPress={(e) => e.key === "Enter" && searchSongHandler(e)}
          />
          <Button onClick={searchSongHandler} ml={5}>
            <i className="fa-solid fa-magnifying-glass"></i>
          </Button>
        </Flex>
      </Box>

      {fetchedSongs && (
        <SongsLists
          songs={fetchedSongs}
          selectedSongs={selectedSongs}
          setSelectedSongs={setSelectedSongs}
        />
      )}
      <Button
        mt={4}
        bg="greenSpotify"
        type="submit"
        variant="test"
        onClick={submitHandler}
        m="50px auto 0"
        display="block"
      >
        Create Playlist
      </Button>
    </>
  );
};

export default CreatePlaylist;

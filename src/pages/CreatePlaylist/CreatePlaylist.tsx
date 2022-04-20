import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import { updateInput } from "../../redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SongsLists from "../../components/SongsLists/SongsLists";
import { useHistory } from "react-router-dom";
import { SelectedSongs, SongItem } from "../../interface/interface";
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
import "./createplaylist.css";

interface Props {
  token: string;
  setPlaylistID: (playlistID: string) => void;
}

interface Search {
  search: {
    query: string;
  };
}

interface PlaylistInfo {
  title: string;
  desc?: string;
}

const CreatePlaylist: React.FC<Props> = ({ token, setPlaylistID }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useSelector((state: Search) => state.search.query);
  const selectedSongs = useSelector(
    (state: SelectedSongs) => state.selectedSongs.value
  );

  const [authToken, setAuthToken] = useState<string | null>(null);
  const [fetchedSongs, setFetchedSongs] = useState<SongItem[] | null>(null);
  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo>({
    title: "",
    desc: "",
  });

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

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateInput(e.target.value));
  };

  const searchSongHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
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

  const playlistInfoInputHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
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

  const addSongsToPlaylist = async (playlistID: string) => {
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

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createPlaylist().then((playlistID: string) => {
      setPlaylistID(playlistID);
      history.push("/summary");
    });
  };

  const checkTitleError: boolean = playlistInfo.title.length < 10;

  return (
    <>
      <Navbar isLogin={true} />
      <Box p={["3", "5", "10"]} minHeight={["120vh", "auto"]}>
        <Flex
          m="0 auto 20px"
          bg="white"
          width={{ sm: "100%", lg: "75%", xl: "50%" }}
          borderRadius="10px"
          direction={["column", "row"]}
        >
          <Image
            src="https://img.freepik.com/free-photo/this-song-rocks-man-listening-favourite-song-headphones-with-smartphone-guy-earphones-listens-rock-music-man-concentrated-face-enjoy-listening-music-isolated-white-background-rock-radio-channel_474717-10137.jpg"
            alt=""
            width={["100%", "40%"]}
            borderTopLeftRadius="10px"
            borderTopRightRadius="10px"
            borderBottomLeftRadius={{ sm: 0, md: "10px" }}
          />
          <Box p={[5, 5, 5, 10, 10]} width={["100%", "60%"]}>
            <FormControl isInvalid={checkTitleError}>
              <Text
                fontSize={["xl", "3xl", "5xl"]}
                mb={15}
                fontWeight={600}
                color="black"
              >
                Create A New Playlist
              </Text>
              <FormLabel htmlFor="playlist-title">
                <Text fontSize={["sm", "lg"]}>
                  Playlist Title (min. 10 words)
                </Text>
              </FormLabel>
              <Input
                id="playlist-title"
                placeholder="Insert Playlist Title Here ...."
                name="title"
                color="black"
                onChange={playlistInfoInputHandler}
              />
              {checkTitleError ? (
                <FormHelperText fontSize={["xs", "sm"]}>
                  The playlist title must contain 10 characters or more.
                </FormHelperText>
              ) : (
                <FormHelperText fontSize={["xs", "sm"]}>
                  Insert playlist title Here
                </FormHelperText>
              )}
            </FormControl>

            <FormControl>
              <FormLabel htmlFor="playlist-desc" mt={5} fontSize={["sm", "lg"]}>
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

        <Box width={{ sm: "100%", lg: "75%", xl: "50%" }} margin="10px auto">
          <Flex>
            <Input
              type="text"
              placeholder="Find songs ..."
              color="white"
              onChange={inputChangeHandler}
            />
            <Button onClick={searchSongHandler} ml={5}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </Button>
          </Flex>
        </Box>

        {fetchedSongs && <SongsLists songs={fetchedSongs} />}

        <Button
          mt={4}
          bg="greenSpotify"
          type="submit"
          variant="test"
          onClick={submitHandler}
          m="50px auto 0"
          display="block"
          isDisabled={selectedSongs.length === 0 || checkTitleError}
        >
          Create Playlist
        </Button>
      </Box>
    </>
  );
};

export default CreatePlaylist;

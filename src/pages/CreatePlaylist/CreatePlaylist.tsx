import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { useState } from "react";
import { updateInput } from "../../redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import axios, { AxiosError } from "axios";
import SongsLists from "../../components/SongsLists/SongsLists";
import { useHistory } from "react-router-dom";
import { SelectedSongs, SongItem } from "../../global/interface";
import { ENDPOINTAPI, HEADERAUTH } from "../../global/variables";
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
import SongItemSkeleton from "../../components/skeletons/SongItemSkeleton";
import Footer from "../../components/Footer/Footer";

interface Search {
  search: {
    query: string;
  };
}

interface PlaylistInfo {
  title: string;
  desc?: string;
}

const CreatePlaylist: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const query = useSelector((state: Search) => state.search.query);
  const selectedSongs = useSelector(
    (state: SelectedSongs) => state.selectedSongs.value
  );

  const [fetchedSongs, setFetchedSongs] = useState<SongItem[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [playlistInfo, setPlaylistInfo] = useState<PlaylistInfo>({
    title: "",
    desc: "",
  });

  const USERID = process.env.REACT_APP_USER_ID;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(updateInput(e.target.value));
  };

  const searchSongHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.get(
        `${ENDPOINTAPI}/search?q=track:${query}&type=album,track`,
        HEADERAUTH
      );
      const tracks = res.data.tracks.items;
      setFetchedSongs(tracks);
    } catch (err) {
      console.log(err);
      const error = err as AxiosError;
      if (error.response && error.response.status === 401) {
        alert("Token expired!");
        localStorage.clear();
        window.location.reload();
      }
    } finally {
      setIsLoading(false);
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
          public: true,
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
      console.log(isLoading);
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
      const error = err as AxiosError;
      if (error.response && error.response.status === 401) {
        alert("Token expired!");
        localStorage.clear();
        window.location.reload();
      }
    }
  };

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    createPlaylist().then(() => {
      alert(`Playlist ${playlistInfo.title} is successfully created!`);
      history.push("/myplaylists");
    });
  };

  const checkTitleError: boolean = playlistInfo.title.length < 10;

  return (
    <>
      <Navbar page={"Create"} />
      <section className="create-playlist min-h-screen sm:min-h-fit pb-28 md:pb-4 p-4">
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
              <FormLabel htmlFor="playlist-title" fontSize={["sm", "lg"]}>
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

        {isLoading ? (
          <div className="loading-songs w-full lg:w-2/3 mx-auto">
            {Array(10)
              .fill(0)
              .map(() => (
                <SongItemSkeleton />
              ))}
          </div>
        ) : (
          fetchedSongs && <SongsLists songs={fetchedSongs} />
        )}

        {fetchedSongs && fetchedSongs.length === 0 && (
          <p className="font-bold text-lg md:text-xl text-center mt-8">
            No songs found
          </p>
        )}

        <Button
          mt={4}
          bg="greenSpotify"
          type="submit"
          variant="test"
          onClick={submitHandler}
          m="0 auto"
          display="block"
          isDisabled={selectedSongs.length === 0 || checkTitleError}
        >
          Create Playlist
        </Button>
      </section>
      <Footer />
    </>
  );
};

export default CreatePlaylist;

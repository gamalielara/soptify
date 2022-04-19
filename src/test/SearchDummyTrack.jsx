import { useState } from "react";
import axios from "axios";
import SongsLists from "../components/SongsLists/SongsLists";
import { Button, Flex, Box } from "@chakra-ui/react";

const SearchDummyTrack = () => {
  const [fetchedSongs, setFetchedSongs] = useState(null);

  const searchSongHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get("/tracks");
      const tracks = res.data.tracks.items;
      setFetchedSongs(tracks);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Box width="50%" margin="10px auto">
        <Flex>
          <input type="text" placeholder="Find songs ..." color="white" />
          <Button onClick={searchSongHandler} ml={5}>
            Search
          </Button>
        </Flex>
      </Box>
      {fetchedSongs && <SongsLists songs={fetchedSongs} />}
    </>
  );
};

export default SearchDummyTrack;

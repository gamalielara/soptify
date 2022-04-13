// theme.js
import { extendTheme } from "@chakra-ui/react";

// Version 1: Using objects
const theme = extendTheme({
  styles: {
    global: {
      // styles for the `body`
      body: {
        backgroundColor: "#1c1c1c",
      },
      img: {
        objectFit: "cover",
      },
      h1: { color: "white" },
      h2: { color: "white" },
      h3: { color: "white" },
      h4: { color: "white" },
      h5: { color: "white" },
      h6: { color: "white" },
      p: { color: "white" },
      span: { color: "white" },
      button: {
        backgroundColor: "#1ed760",
        color: "white",
        borderRadius: "10px",
        padding: "5px 10px",
      },
    },
  },
  colors: {
    blackSpotify: "#1c1c1c",
    whiteSpotify: "#FFF",
    greenSpotify: "#1ed760",
  },
  components: {
    Button: {
      baseStyle: {
        color: "#FFF",
        backgroundColor: "#1ed760 !important",
      },
    },
    Image: {
      variants: {
        "form-image": {
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
        },
      },
    },
  },
});

export default theme;

export const ENDPOINTAPI = "https://api.spotify.com/v1";
export const HEADERAUTH = {
  headers: {
    Authorization: "Bearer " + localStorage.getItem("user"),
  },
};

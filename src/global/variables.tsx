export const ENDPOINTAPI = "https://api.spotify.com/v1";
export const USERID = process.env.REACT_APP_USER_ID;
export const HEADERAUTH = (token: string) => {
  return {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
};

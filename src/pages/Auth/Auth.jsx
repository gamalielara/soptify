import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { updateToken } from "../../redux/tokenSlice";
import { Link } from "react-router-dom";
import "./auth.css";

const Auth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const query = window.location.hash.substr(1).split(/&/g);
    const urlToken = query[0].split("=")[1];
    if (urlToken) {
      dispatch(updateToken(urlToken));
      localStorage.setItem("user", urlToken);
      window.history.pushState({}, "", "/auth");
    }
  });

  const token = useSelector((state) => state.token.value);
  console.log(token);

  return (
    token && (
      <div className="auth">
        <h1>Authentication is Successful!</h1>
        <Link to="/create">Continue to Spotify</Link>
      </div>
    )
  );
};

export default Auth;

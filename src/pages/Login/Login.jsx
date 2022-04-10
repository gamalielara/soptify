import "./login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login">
        <h1>Login to Spotify</h1>
        <a href={process.env.REACT_APP_AUTH_URL}>
          <button className="login-btn">Login!</button>
        </a>
      </div>
    </div>
  );
};

export default Login;

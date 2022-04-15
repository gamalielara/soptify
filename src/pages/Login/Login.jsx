import "./login.css";

const Login = () => {
  return (
    <div className="login-container">
      <div className="login">
        <img
          src="img/logo.png"
          alt="Soptify by gamalielboanerges"
          className="logo-image"
        />
        <div className="hero-container">
          <h1>
            Music for everyone.
            <br />
            Music at your fingertips
          </h1>
          <h4>Discover millions of music now.</h4>
          <a href={process.env.REACT_APP_AUTH_URL}>
            <button className="login-btn">Login!</button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;

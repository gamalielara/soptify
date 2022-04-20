import React from "react";
import MobileNavbar from "./MobileNavbar";

interface Props {
  isLogin: boolean;
}

const Navbar: React.FC<Props> = ({ isLogin }) => {
  return (
    <>
      <header className="w-full h-16 sticky top-0 left-0 z-50 flex md:justify-between justify-center items-center px-8 bg-blackSpotify">
        <img
          src="img/logo.png"
          alt="Soptify by gamalielboanerges"
          className="lg:h-3/4 h-1/2 object-contain my-auto"
        />
        {isLogin && (
          <nav>
            <ul className="menus hidden md:flex justify-around my-auto">
              <li className="mx-4 font-semibold lg:text-xl md:text-base text-white hover:text-greenSpotify hover:cursor-pointer">
                Create Playlist
              </li>
              <li className="mx-4 font-semibold lg:text-xl md:text-base text-white hover:text-greenSpotify hover:cursor-pointer">
                My Profile
              </li>
              <li className="mx-4 font-semibold lg:text-xl md:text-base text-white hover:text-greenSpotify hover:cursor-pointer">
                My Playlists
              </li>
            </ul>
          </nav>
        )}
      </header>
      <div className="mobile-nav block sm:hidden">
        {isLogin && <MobileNavbar show={true} />}
      </div>
    </>
  );
};

export default Navbar;

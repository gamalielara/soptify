import React from "react";
import { Link } from "react-router-dom";
import MobileNavbar from "./MobileNavbar";
import "./navbar.css";

interface Props {
  page: "Create" | "Profile" | "MyPlaylists" | null;
}

const Navbar: React.FC<Props> = ({ page }) => {
  const setClass = (menuName: string) =>
    menuName === page
      ? "selected-menu mx-4 font-semibold lg:text-xl md:text-base hover:cursor-pointer"
      : "menu mx-4 font-semibold lg:text-xl md:text-base hover:cursor-pointer";

  return (
    <>
      <header className="w-full h-16 sticky top-0 left-0 z-50 flex md:justify-between justify-center items-center px-8 bg-blackSpotify">
        <img
          src="https://soptifygamaliel.vercel.app/img/logo.png"
          alt="Soptify by gamalielboanerges"
          className="lg:h-3/4 h-1/2 object-contain my-auto"
        />
        <nav>
          <ul className="menus hidden md:flex justify-around my-auto">
            <li className={`${setClass("Create")}`}>
              <Link to="/create">Create Playlist</Link>
            </li>
            <li className={`${setClass("Profile")}`}>
              <Link to="/me">My Profile</Link>
            </li>
            <li className={`${setClass("MyPlaylists")}`}>
              <Link to="/myplaylists">My Playlists</Link>
            </li>
          </ul>
        </nav>
      </header>
      <div className="mobile-nav block sm:hidden">
        <MobileNavbar page={page} />
      </div>
    </>
  );
};

export default Navbar;

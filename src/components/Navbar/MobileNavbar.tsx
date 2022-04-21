import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faUser,
  faCompactDisc,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

interface Props {
  page: "Create" | "Profile" | "MyPlaylists" | null;
}

const MobileNavbar: React.FC<Props> = ({ page }) => {
  const setClass = (menuName: string) =>
    menuName === page
      ? "selected-menu mx-4 my-auto font-semibold text-3xl text-white hover:cursor-pointer"
      : "menu mx-4 my-auto font-semibold text-3xl text-white hover:cursor-pointer";

  return (
    <nav className="menus bg-blackSpotify fixed h-16 w-full bottom-0 left-0 z-50 flex justify-center">
      <ul className="menus flex justify-around w-full">
        <li className={`${setClass("Profile")}`}>
          <Link to="/me">
            <FontAwesomeIcon icon={faUser} />
          </Link>
        </li>
        <li className={`${setClass("MyPlaylists")}`}>
          <Link to="/myplaylists">
            <FontAwesomeIcon icon={faCompactDisc} />
          </Link>
        </li>
        <li className={`${setClass("Create")}`}>
          <Link to="/create">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbar;

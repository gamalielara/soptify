import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import {
  faUser,
  faCompactDisc,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

interface Props {
  show: boolean;
}

const MobileNavbar: React.FC<Props> = ({ show }) => {
  return (
    <nav className="menus bg-blackSpotify fixed h-16 w-full bottom-0 left-0 z-50 flex justify-center">
      <ul className="menus flex justify-around w-full">
        <li className="mx-4 my-auto font-semibold text-3xl text-white hover:cursor-pointer">
          <FontAwesomeIcon icon={faUser} />
        </li>
        <li className="mx-4 my-auto font-semibold text-3xl text-white hover:cursor-pointer">
          <FontAwesomeIcon icon={faCompactDisc} />
        </li>
        <li className="mx-4 my-auto font-semibold text-3xl text-white hover:cursor-pointer">
          <FontAwesomeIcon icon={faPlus} />
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavbar;
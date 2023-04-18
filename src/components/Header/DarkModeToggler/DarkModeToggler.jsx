/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

import React from "react";
import "./darkModeToggler.css";

const DarkModeToggler = (props) => {
  return (
    <button
      type="button"
      className="dark-mode-toggler"
      onClick={() => {
        props.darkModeToggler();
      }}
    ></button>
  );
};

export default DarkModeToggler;

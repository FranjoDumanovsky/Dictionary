import React from "react";
import { useState } from "react";
import { ThemeContext, themes } from "../../context/ThemeContext";
import { FaBook } from "react-icons/fa";
import DarkModeToggler from "./DarkModeToggler/DarkModeToggler";
import FontSelector from "../FontSelector/FontSelector";
import "./header.css";

const Header = () => {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <header className="header">
      <nav className="nav container">
        <div className="flex-container jc-sb ai-c">
          <div className="logo">
            <FaBook className="logo-icon" />
            <span>The Dictionary</span>
          </div>
          <div className="flex-container ai-c">
            <FontSelector />
            <ThemeContext.Consumer>
              {({ darkModeToggler }) => (
                <DarkModeToggler
                  darkModeToggler={() => {
                    setDarkMode(!darkMode);
                    darkModeToggler(darkMode ? themes.light : themes.dark);
                  }}
                />
              )}
            </ThemeContext.Consumer>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;

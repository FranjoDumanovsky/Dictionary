import React, { useState, useEffect } from "react";
import { ThemeContext, themes } from "../context/ThemeContext";

export default function ThemeContextWrapper(props) {
  const [theme, setTheme] = useState(themes.dark);

  function darkModeToggler(theme) {
    setTheme(theme);
  }

  useEffect(() => {
    switch (theme) {
      case themes.light:
        document.body.classList.add("dark-theme");
        break;
      case themes.dark:
      default:
        document.body.classList.remove("dark-theme");
        break;
    }
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{ theme: theme, darkModeToggler: darkModeToggler }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
}

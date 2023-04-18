import { createContext } from "react";

export const themes = {
  light: "",
  dark: "dark-theme",
};

export const ThemeContext = createContext({
  theme: themes.light,
  darkModeToggler: () => {},
});

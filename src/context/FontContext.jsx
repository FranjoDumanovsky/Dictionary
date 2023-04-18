import { createContext } from "react";

const FontContext = createContext();

export function FontProvider({ children }) {
  const changeFont = (font) => {
    let fontLowerCase = font.toLowerCase();
    document.body.classList.add(fontLowerCase);
  };

  return (
    <FontContext.Provider value={{ changeFont }}>
      {children}
    </FontContext.Provider>
  );
}

export default FontContext;

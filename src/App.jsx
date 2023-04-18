import React from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header/Header";
import "./css/style.css";
import ThemeContextWrapper from "./theme/ThemeWrapper";

import { FontProvider } from "./context/FontContext";
import Dictionary from "./components/Dictionary/Dictionary";

const App = () => {
  return (
    <div>
      <FontProvider>
        <ThemeContextWrapper>
          <React.StrictMode>
            <Header></Header>
            <Dictionary />
          </React.StrictMode>
        </ThemeContextWrapper>
      </FontProvider>
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);

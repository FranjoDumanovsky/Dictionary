import React from "react";
import { useState, useEffect, useContext } from "react";
import Select from "react-select";
import FontContext from "../../context/FontContext";
import fontOptions from "./fontData";

const FontSelector = () => {
  const { changeFont } = useContext(FontContext);
  const [font, setFont] = useState(fontOptions[0].value);

  const styles = {
    control: (styles, state) => ({
      ...styles,
      backgroundColor: "transparent",
      border: state.isFocused
        ? "var(--accent) 1px solid"
        : "transparent 1px solid",
      borderRadius: "50px",
      borderColor: "transparent",
      boxShadow: "none",
      color: "var(--dark)",
      marginRight: "1rem",
      transition: "border 0.3s ease-in",
      "&:hover": {
        border: "transparent 1px solid",
      },
    }),
    placeholder: (styles) => ({
      ...styles,
      color: "var(--dark)",
    }),

    dropdownIndicator: (styles) => ({
      ...styles,
      color: "var(--accent)",
      paddingLeft: "0",
      border: "inherit",
      "&:hover": {
        color: "var(--accent)",
        boder: "var(--accent) 1px solid",
      },
    }),
    option: (styles, state) => ({
      ...styles,
      color: "var(--dark)",
      backgroundColor: state.isFocused ? "var(--accent-light)" : "var(--white)",
    }),
    // option: (styles, {isFocused, isSelected})
  };

  useEffect(() => {
    document.body.className = "";
    changeFont(font);
  }, [font]);

  const handleChange = (selectedOption) => {
    setFont(selectedOption.value);
  };

  return (
    <div type="button" className="">
      <Select
        options={fontOptions}
        placeholder={font}
        onChange={handleChange}
        styles={styles}
        components={{
          IndicatorSeparator: () => null,
        }}
      ></Select>
    </div>
  );
};
export default FontSelector;

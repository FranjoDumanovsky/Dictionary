import React from "react";
import { useState } from "react";
import "./dictionary.css";
import "../../css/style.css";
import { FiSearch } from "react-icons/fi";
import { BsPlayFill } from "react-icons/bs";
import { Autocomplete, TextField } from "@mui/material";

const Dictionary = () => {
  const [searchWord, setSearchWord] = useState("");
  const [data, setData] = useState("");
  const [playIcon, setPlayIcon] = useState(false);
  const [audio, setAudio] = useState("");
  const [isInvalidWord, setIsInvalidWord] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const fetchTextFileAndExtractWords = async (fileURL) => {
    try {
      const response = await fetch(fileURL);
      const fileContent = await response.text();
      const wordsArray = fileContent.split(/\s+/);
      setSuggestions(wordsArray);
      return wordsArray;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  function getSuggestionArray() {
    // Usage
    const fileURL = "../../english.txt";
    fetchTextFileAndExtractWords(fileURL)
      .then((words) => {
        console.log(words);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function getMeaning() {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        setIsInvalidWord(true);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const responseData = await response.json();
      setIsInvalidWord(false);
      setData(responseData[0]);
      getAudio(responseData[0]);
      getSuggestionArray();
    } catch (error) {
      console.error(error);
    }
  }

  function getAudio(data) {
    let getAudio = data.phonetics[0]?.audio || data.phonetics[1]?.audio || "";

    getAudio ? setPlayIcon(true) : setPlayIcon(false);
    setAudio(getAudio);
  }

  const splitArray = function (arr) {
    return arr.join(", ");
  };

  const handleKeyPress = function (e) {
    if (e.keyCode === 13) {
      getMeaning();
    }
  };

  const playAudio = function () {
    const audioElement = new Audio(audio);

    audioElement.play();
  };

  const mapDefinitions = function (arr, definitionNumber) {
    let definitonArray = [];

    for (let i = 0; i < arr.length; i++) {
      if (arr[i].definition) {
        if (definitonArray.length + 1 <= definitionNumber) {
          definitonArray.push(arr[i].definition);
        }
      }
    }

    let result = definitonArray.map((definition, index) => (
      <li className="definition" key={index}>
        {definition}
      </li>
    ));
    return result;
  };

  if (isInvalidWord) {
    return (
      <section className="container main">
        <div>
          <div className="search-box">
            <input
              type="text"
              className="search-bar"
              placeholder="Search.."
              onChange={(e) =>
                setSearchWord(e.target.value.replace(/\s/g, "%20"))
              }
              onKeyDown={(e) => handleKeyPress(e)}
            />
            <Autocomplete
              options={suggestions}
              renderInput={(params) => (
                <TextField {...params} label="suggestions" />
              )}
            />

            <button
              type="button"
              className="search-button"
              onClick={getMeaning}
            >
              <FiSearch className="search-icon" />
            </button>
          </div>
        </div>

        <div className="error-container">
          <p className="error-title">No Definitions Found</p>
          <p className="error-message">
            Sorry pal, we couldn&apos;t find definitions for the word you were
            looking for.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="container main">
      <div>
        <div className="search-box">
          <input
            type="text"
            className="search-bar"
            placeholder="Search.."
            onChange={(e) =>
              setSearchWord(e.target.value.replace(/\s/g, "%20"))
            }
            onKeyDown={(e) => handleKeyPress(e)}
          />

          <button type="button" className="search-button" onClick={getMeaning}>
            <FiSearch className="search-icon" />
          </button>
        </div>
      </div>

      {data && (
        <>
          <div className="flex-container jc-sb ai-c">
            <div className="search-word__container">
              <p className="search-word">{data.word}</p>
              <p className="search-phonetic">{data.phonetic}</p>
            </div>
            {playIcon && (
              <button className="search-word-sound__button" onClick={playAudio}>
                <BsPlayFill className="play-icon" />
              </button>
            )}
          </div>
          <div className="flex-container ai-c part-of-speach-container">
            <p className="part-of-speach">{data.meanings[0].partOfSpeech}</p>
            <div className="border"></div>
          </div>
          <div className="showResults">
            <p className="gray-text">Meaning</p>
            <ul className="meaning-list">
              {mapDefinitions(data.meanings[0].definitions, 3)}
            </ul>

            {data.meanings[0].synonyms && (
              <div className="synonym-wrapper flex-container">
                <p className="gray-text">Synonym: </p>
                <p className="accent-text">
                  {splitArray(data.meanings[0].synonyms)}
                </p>
              </div>
            )}
          </div>

          {data.meanings[1] && (
            <>
              <div className="flex-container ai-c part-of-speach-container">
                <p className="part-of-speach">
                  {data.meanings[1].partOfSpeech}
                </p>
                <div className="border"></div>
              </div>
              <div className="showResults">
                <ul>{mapDefinitions(data.meanings[1].definitions, 1)}</ul>
                {data.meanings[1].definitions[0].example && (
                  <p className="example">
                    &#34;{data.meanings[1].definitions[0].example}&#34;
                  </p>
                )}
              </div>
            </>
          )}
          <div className="flex-container ai-c part-of-speach-container">
            <div className="border full-width"></div>
          </div>
        </>
      )}
      {data.sourceUrls && (
        <p className="source">
          Source:{" "}
          <a
            href={`https://en.wiktionary.org/wiki/${data.word}`}
            rel="noreferrer"
            target="_blank"
          >
            {`https://en.wiktionary.org/wiki/${data.word}`}
          </a>
        </p>
      )}
    </section>
  );
};

export default Dictionary;

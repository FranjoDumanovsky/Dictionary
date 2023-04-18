import React from "react";
import { useState } from "react";
import "./dictionary.css";
import "../../css/style.css";
import { FiSearch } from "react-icons/fi";
import { BsPlayFill } from "react-icons/bs";

const Dictionary = () => {
  const [searchWord, setSearchWord] = useState("");
  const [data, setData] = useState("");

  async function getMeaning() {
    const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${searchWord}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      setData(data[0]);
    } catch (error) {
      console.error(error);
    }
  }

  const splitArray = function (arr) {
    let synonymArray = [];
    for (let i = 0; i < arr.length; i++) {
      if (i === 0) {
        synonymArray.push(arr[i]);
      } else {
        synonymArray.push(", " + arr[i]);
      }
    }

    return synonymArray;
  };

  const handleKeyPress = function (e) {
    if (e.keyCode === 13) {
      getMeaning();
    }
  };

  const playAudio = function () {
    var audio = new Audio(
      `https://api.dictionaryapi.dev/media/pronunciations/en/${data.word}-us.mp3`
    );
    audio.play();
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

            <button className="search-word-sound__button" onClick={playAudio}>
              <BsPlayFill className="play-icon" />
            </button>
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

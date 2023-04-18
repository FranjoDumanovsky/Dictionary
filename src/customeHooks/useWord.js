import { useState, useEffect } from "react";

const localCache = {};

const useWord = (word) => {
  const [wordList, setWordList] = useState("");
  const [status, setStatus] = useState("unloaded");
  useEffect(() => {
    if (!word) {
      setWordList([]);
    } else if (localCache[word]) {
      setWordList(localCache[word]);
    } else {
      requestWord();
    }
    async function requestWord() {
      setWordList([]);
      setStatus("loading");

      const res = await fetch(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );
      const json = await res.json();
      localCache[word] = json.word || [];
      setWordList(localCache[word]);
      setStatus("loaded");
    }
  }, [word]);
  return [wordList, status];
};

export default useWord;

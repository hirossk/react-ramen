import React, { useState, useEffect } from "react";

export const AutoSuggestForm = ({onKeyDown,inputValue,setInputValue}) => {
//   const [inputValue, setInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // 履歴をローカルストレージから読み込む
    const savedHistory = localStorage.getItem("inputHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    // 入力値に基づいてサジェスチョンを更新
    if (inputValue) {
      const filteredSuggestions = history.filter((item) =>
        item.toLowerCase().startsWith(inputValue.toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [inputValue, history]);

  const onKey = (e) => {
    if (e.key === 'Enter') { 
    e.preventDefault();
    if (inputValue.trim() && !history.includes(inputValue.trim())) {
      const updatedHistory = [...history, inputValue.trim()];
      setHistory(updatedHistory);
      localStorage.setItem("inputHistory", JSON.stringify(updatedHistory));
    }
    onKeyDown(e);
}
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
        <label htmlFor="input">お店の名前:</label>
        <input
          id="input"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={onKey}
          list="suggestions"
          autoComplete="off"
        />
        <datalist id="suggestions">
          {suggestions.map((suggestion, index) => (
            <option key={index} value={suggestion} />
          ))}
        </datalist>
    </div>
  );
};


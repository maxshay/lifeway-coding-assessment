import "./App.css";

import { useState } from "react";

import { searchUser } from "../../utils";
import SearchInput from "./SearchInput";
import ResultsTable from "./ResultsTable";
import CharacterProfile from "./CharacterProfile";

export default function App() {
  const [characterProfile, setCharacterProfile] = useState(null);
  const [searchValue, setSearchValue] = useState("");

  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleUserSearchPress = async () => {
    if (searchValue === "") return;

    setError(null);
    setLoading(true);
    const [data, error] = await searchUser(searchValue);
    if (error) {
      setError(error);
    } else {
      setCharacterProfile(null);
      // console.log(data.results);
      setSearchResults(data);
    }

    setLoading(false);
  };

  return (
    <div className="App overflow-auto">
      <h1 className="text-4xl text-center font-bold mt-4">Star Wars!</h1>
      <p className="text-center font-bold text-gray-600">
        Lifeway Coding Assessment
      </p>
      <div className="mt-5 spacer"></div>

      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        handleUserSearchPress={handleUserSearchPress}
        setCharacterProfile={setCharacterProfile}
      />

      <div className="mt-5 spacer"></div>

      {(() => {
        if (error)
          return (
            <p className="mx-4" data-testid="fetch-error">
              Error: {JSON.stringify(error)}
            </p>
          );
        else if (loading)
          return (
            <p className="mx-4" data-testid="loading">
              Loading{" "}
              <span className="inline-block spinning" role="img">
                ⏳
              </span>
            </p>
          );
        else if (!searchResults)
          return (
            <p className="mx-4 text-center">
              🔎 Please use the search bar to search for a star wars character
            </p>
          );
        else if (searchResults.length < 1)
          return (
            <p className="mx-4" data-testid="no-results">
              No results
            </p>
          );
        else if (characterProfile) {
          const character = searchResults.filter(
            (x) => x.name === characterProfile
          )[0];
          return (
            <CharacterProfile
              setCharacterProfile={setCharacterProfile}
              character={character}
            />
          );
        } else
          return (
            <ResultsTable
              searchResults={searchResults}
              setCharacterProfile={setCharacterProfile}
            />
          );
      })()}
    </div>
  );
}

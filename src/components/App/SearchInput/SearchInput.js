const SearchInput = ({
  searchValue,
  setSearchValue,
  handleUserSearchPress
}) => {
  //
  return (
    <>
      <div className="w-1/2 mx-auto font-bold text-gray-800">
        <span>Search Character:</span>
      </div>
      <div className="flex justify-center">
        <div className="flex w-1/2">
          <input
            className="grow border-2 border-gray-300 focus:border-blue-500 p-1 rounded outline-none"
            type="text"
            placeholder="Luke Skywalker"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") handleUserSearchPress();
            }}
          />
          <button
            className="bg-blue-500 px-2.5 py-1 rounded ml-4 text-white hover:bg-gradient-to-br from-blue-500 to-blue-700"
            onClick={() => handleUserSearchPress()}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchInput;

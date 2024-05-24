import { createContext, useState, useEffect } from "react";

const SearchContext = createContext({});

export const SearchProvider = ({ children }) => {
  const [searchValue, setSearchValue] = useState([]);

  console.log("searchValue", searchValue);
  return (
    <SearchContext.Provider value={{ searchValue, setSearchValue }}>
      {children}
    </SearchContext.Provider>
  );
};

export default SearchContext;

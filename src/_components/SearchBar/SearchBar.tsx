"use client";
import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import useSearchStore from "@/stores/searchStore";

export default function SearchBar() {
  const { searchQuery, setSearchQuery, clearSearch } = useSearchStore();
  const [inputValue, setInputValue] = useState(searchQuery);

  useEffect(() => {
    setInputValue(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    setSearchQuery(value);
  };

  const handleClear = () => {
    setInputValue("");
    clearSearch();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.currentTarget.blur();
    }
  };

  return (
    <div className="flex items-center gap-2 sm:gap-3 rounded-md ring-1 ring-gray-200 px-2 sm:px-3 py-1.5 sm:py-2 shadow-md bg-white min-w-0">
      <Search className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500 flex-shrink-0" />
      <input
        id="search"
        placeholder="Search..."
        className="text-xs sm:text-sm outline-none flex-1 min-w-0 placeholder:text-gray-400"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {inputValue && (
        <button
          onClick={handleClear}
          className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
          type="button"
        >
          <X className="w-3 h-3 sm:w-4 sm:h-4" />
        </button>
      )}
    </div>
  );
}

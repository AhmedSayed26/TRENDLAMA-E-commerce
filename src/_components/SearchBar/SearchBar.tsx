import React from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  return (
    <div className="flex items-center gap-3 rounded-md ring-1 ring-gray-200 px-2 py-1 shadow-md">
      <Search className="w-4 h-4 text-gray-500" />
      <input
        id="search"
        placeholder="Search..."
        className="text-sm outline-0"
      />
    </div>
  );
}

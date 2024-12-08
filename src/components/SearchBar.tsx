// path/to/SearchBar.tsx
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery } from '../store/productSlice';
import { RootState } from '../store/store';
import { IoIosSearch } from "react-icons/io";

const SearchBar: React.FC = () => {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.products.searchQuery);

  return (
    <div className="flex items-center w-2/5 mx-auto my-4 px-4 py-2 rounded-lg border-2 border-[#124E49] focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white">
      <IoIosSearch 
        size = {20}
        className="mr-2" 
      />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        className="flex-grow bg-transparent outline-none dark:text-white"
      />
    </div>
  );
};

export default SearchBar;
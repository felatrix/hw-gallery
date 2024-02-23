import React, { SetStateAction, useEffect, useState } from 'react';
import BASE_DATA from '@/statics/BASE_DATA';
import baseDataType from '@/statics/baseData';
import { fuzzySearch } from '@/libs/fuzzySearch';
import { motion, AnimatePresence } from 'framer-motion';
interface SearchComponentProps {
  handlerSearch: (data: string) => void;
}

const SearchComponent: React.FC<SearchComponentProps> = ({ handlerSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [suggestions, setSuggestions] = useState<baseDataType[]>([]);
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (value.trim() === '') {
      setSuggestions([]);
      setShowSuggestions(false);
    } else {
      const filteredSuggestions = BASE_DATA.filter((item) =>
        fuzzySearch(value, item.title)
      ).slice(0, 10); // Limit to maximum 10 suggestions
      setSuggestions(filteredSuggestions);
      setShowSuggestions(true);
    }
  };

  const handleSelectSuggestion = (selectedItem: baseDataType) => {
    setSearchTerm(selectedItem.title);
    setShowSuggestions(false);
  };

  useEffect(() => handlerSearch(searchTerm), [searchTerm]);

  return (
    <>
      <div className="fixed w-[100vw] top-0 right-0 z-10 p-5">
        <div className="w-[100vw] flex flex-col items-center ">
          <input
            className="px-4 py-2 bg-[#ffffffb0] w-[280px]"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="Search Image available"
          />
        </div>
      </div>
      <div className="fixed w-[100vw] top-[50px] right-0 z-10 p-5">
        <div className="w-[100vw] flex flex-col items-center ">
          <AnimatePresence>
            {showSuggestions && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="bg-[#ffffffb0] w-[280px]">
                  <ul>
                    {suggestions.map((item, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectSuggestion(item)}
                        className="px-4 py-2 cursor-pointer hover:bg-blue-600 hover:text-white border-b-[#00000017] border-b-2 transition-all"
                      >
                        {item.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;

import React, { SetStateAction, useEffect, useState } from 'react';
import BASE_DATA from '@/statics/BASE_DATA';
import baseDataType from '@/statics/baseData';
import { fuzzySearch } from '@/libs/fuzzySearch';

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
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="Search..."
      />
      {showSuggestions && (
        <div>
          {JSON.stringify(suggestions)}
          <ul>
            {suggestions.map((item, index) => (
              <li key={index} onClick={() => handleSelectSuggestion(item)}>
                {item.title}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchComponent;

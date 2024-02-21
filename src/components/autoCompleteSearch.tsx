import React, { useState } from 'react';

interface AutocompleteSearchProps {
  options: string[];
  onSelect: (option: string) => void;
}

const AutocompleteSearch: React.FC<AutocompleteSearchProps> = ({
  options,
  onSelect,
}) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [filteredOptions, setFilteredOptions] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState<boolean>(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    setInputValue(inputValue);

    // Filter options based on input value using fuzzy search
    const filteredOptions = options.filter(option =>
      fuzzyMatch(option.toLowerCase(), inputValue.toLowerCase())
    );

    setFilteredOptions(filteredOptions);
    setShowDropdown(true);
  };

  const handleSelectOption = (option: string) => {
    setInputValue(option);
    onSelect(option);
    setFilteredOptions([]);
    setShowDropdown(false);
  };

  const handleDropdownItemClick = (option: string) => {
    handleSelectOption(option);
  };

  // Fuzzy match algorithm based on Levenshtein distance
  const fuzzyMatch = (option: string, query: string) => {
    const distance = (a: string, b: string) => {
      if (a.length === 0) return b.length;
      if (b.length === 0) return a.length;

      let matrix: number[][] = [];

      // Increment along the first column of each row
      let i;
      for (i = 0; i <= b.length; i++) {
        matrix[i] = [i];
      }

      // Increment each column in the first row
      let j;
      for (j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
      }

      // Fill in the rest of the matrix
      for (i = 1; i <= b.length; i++) {
        for (j = 1; j <= a.length; j++) {
          if (b.charAt(i - 1) === a.charAt(j - 1)) {
            matrix[i][j] = matrix[i - 1][j - 1];
          } else {
            matrix[i][j] = Math.min(
              matrix[i - 1][j - 1] + 1, // substitution
              Math.min(
                matrix[i][j - 1] + 1, // insertion
                matrix[i - 1][j] + 1 // deletion
              )
            );
          }
        }
      }

      return matrix[b.length][a.length];
    };

    return distance(option, query) < 3; // Adjust the threshold as needed
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        placeholder="Search..."
        className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
      />
      {showDropdown && filteredOptions.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded shadow-lg">
          <ul>
            {filteredOptions.map(option => (
              <li
                key={option}
                onClick={() => handleDropdownItemClick(option)}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100"
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AutocompleteSearch;
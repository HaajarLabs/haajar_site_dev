import React, { useEffect, useState } from 'react';

const Dropdown = ({ options, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };
  useEffect(() => {
    setSelectedOption(options[0]);
  }, [])
  

  return (
    <div className="relative inline-block">
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded inline-flex items-center"
        onClick={toggleDropdown}
      >
        <span>{selectedOption}</span>
        <svg
          className="fill-current h-4 w-4 ml-2"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <path d="M5.5 7.5l4 4 4-4h-8z" />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md shadow-lg bg-white z-10">
          {options
            .filter((option) => option !== selectedOption)
            .map((option, index) => (
              <div
                key={index}
                className="block px-4 py-2 text-gray-800 cursor-pointer hover:bg-gray-200"
                onClick={() => handleOptionClick(option)}
              >
                {option}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

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
  

  const convertDateFormat = (dateString) => {
    const [year, month, day] = dateString.split('-');
    return `${day}-${month}-${year}`;
  };

  return (
    <div className="relative inline-block ">
      <button
        className="border-blue-200 border-2  bg-blue-100 text-blue-400 font-poppins font-bold  md:px-4 xs:py-2  xs:px-2  rounded inline-flex items-center"
        onClick={toggleDropdown}
      >
        <span className=' xs:text-xs  ss:text-base'>{selectedOption ? convertDateFormat(selectedOption) :selectedOption}</span>
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
                className="block px-4 py-2 xs:text-xs  ss:text-base text-gray-800 ms:text-xs cursor-pointer hover:bg-gray-200"
                onClick={() => handleOptionClick(option)}
              >
                {convertDateFormat(option)}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;

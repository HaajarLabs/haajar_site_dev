import React, { useRef } from 'react';

const OtpField = () => {
  const inputRefs = useRef([]);

  const focusNextInput = index => {
    if (inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const focusPrevInput = index => {
    if (inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.length === 1) {
      focusNextInput(index);
    } else if (value.length === 0) {
      focusPrevInput(index);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && e.target.value === '') {
      focusPrevInput(index);
    }
  };

  return (
    <div className="flex justify-center items-center ">
      {[...Array(4)].map((_, index) => (
        <input
          key={index}
          ref={el => (inputRefs.current[index] = el)}
          type="number"
          maxLength={1}
          className="w-14 h-14 text-center mx-2 rounded border border-gray-400 focus:outline-none"
          onChange={e => handleChange(e, index)}
          onKeyDown={e => handleKeyDown(e, index)}
        />
      ))}
    </div>
  );
};

export default OtpField;

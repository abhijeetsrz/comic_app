import React, { useState } from 'react';
import './TextBar.css'

const TextBar = ({ onGenerateComic, isDisabled, isLoading }) => {
  const [inputArray, setInputArray] = useState(Array(10).fill(''));

  const handleInputChange = (index, value) => {
    setInputArray((prevInputs) => {
      const newInputs = [...prevInputs];
      newInputs[index] = value;
      return newInputs;
    });
  };

  const handleGenerateComic = () => {
    onGenerateComic(inputArray);
  };

  return (
    <div className='TextBar'>
      <h2>Type Your Prompt</h2>
      {inputArray.map((input, index) => (
        <div key={index} className='TextBar-input'>
          <input
            type="text"
            placeholder={`Enter text for panel ${index + 1}`}
            value={input}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}
      <button onClick={handleGenerateComic} disabled={isDisabled}>
        {isLoading ? 'Generating...' : 'Generate Comic'}
      </button>
    </div>
  );
};

export default TextBar;
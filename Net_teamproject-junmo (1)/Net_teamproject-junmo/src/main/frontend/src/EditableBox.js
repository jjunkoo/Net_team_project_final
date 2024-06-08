import React, { useState } from 'react';

function EditableBox({ text, width }) {
  const [isEditing, setIsEditing] = useState(false);
  const [inputText, setInputText] = useState(text);

  const handleBoxClick = () => {
    setIsEditing(true);
    // Note: If you don't want to clear the text when the box is clicked, remove the next line.
    setInputText(''); // Clear the text when the box is clicked
  };

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleInputBlur = () => {
    setIsEditing(false);
    if (inputText.trim() === '') {
      setInputText(text); // Reset to original text if nothing is entered
    }
  };

  return (
    <div style={{ cursor: 'text', width: width, height: '50px', border: '1px solid black', display: 'flex', alignItems: 'center', boxSizing: 'border-box' }} onClick={handleBoxClick}>
      {isEditing ? (
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          autoFocus
          style={{ width: '100%', height: '100%', paddingLeft: '10px', border: 'none', outline: 'none', boxSizing: 'border-box' }}
        />
      ) : (
        <span style={{ paddingLeft: '10px', opacity: 0.5 }}>
          {inputText}
        </span>
      )}
    </div>
  );
}

export default EditableBox;
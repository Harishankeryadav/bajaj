import React from 'react';

const Dropdown = ({ setSelectedOptions }) => {
  const handleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(selectedOptions);
  };

  return (
    <div>
      <label>Select Response Data:</label>
      <select multiple onChange={handleChange}>
        <option value="numbers">Numbers</option>
        <option value="alphabets">Alphabets</option>
        <option value="highest_lowercase_alphabet">Highest Lowercase Alphabet</option>
        <option value="file_valid">File Valid</option>
        <option value="file_mime_type">File MIME Type</option>
        <option value="file_size_kb">File Size (KB)</option>
      </select>
    </div>
  );
};

export default Dropdown;

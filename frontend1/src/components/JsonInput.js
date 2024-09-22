import React, { useState } from 'react';

const JsonInput = ({ handleSubmit }) => {
  const [input, setInput] = useState('');
  const [fileBase64, setFileBase64] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFileBase64(reader.result.split(',')[1]); // Extract the Base64 part after the comma
      };
      reader.readAsDataURL(file);
    } else {
      setFileBase64(''); // Reset to empty string if no file selected
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const parsedJson = JSON.parse(input);

      if (!parsedJson.data || !Array.isArray(parsedJson.data)) {
        alert("'data' should be an array in the JSON.");
        return;
      }

      // Add the Base64 file string to the parsed JSON
      parsedJson.file_b64 = fileBase64 || null; // Keep it null if no file is uploaded

      handleSubmit(parsedJson); // Send JSON to backend
    } catch (err) {
      alert('Invalid JSON format. Please make sure your input is a valid JSON.');
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <textarea
          placeholder='Enter JSON here (must contain a "data" array)...'
          rows='10'
          cols='50'
          value={input}
          onChange={handleInputChange}
        />
        <br />
        <input type="file" onChange={handleFileChange} />
        <br />
        <button type='submit'>Submit</button>
      </form>
    </div>
  );
};

export default JsonInput;

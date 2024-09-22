import React, { useState } from 'react';
import JsonInput from './components/JsonInput';
import Dropdown from './components/Dropdown';
import Result from './components/Result';
import axios from 'axios';

const App = () => {
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

   const handleSubmit = async data => {
    setJsonData(data);
    try {
      const response = await fetch(
        "bajaj-production-a0ca.up.railway.app/api/bfhl",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );
      const result = await response.json();
      setResponse(result);
    } catch (error) {
      console.error("Error:", error);
      setResponse({ error: "Failed to fetch data from the API." });
    }
  };

  return (
    <div className="App">
      <h1>RA2111003030105</h1>
      <JsonInput handleSubmit={handleSubmit} />
      {response && (
        <>
          <Dropdown setSelectedOptions={setSelectedOptions} />
          <Result response={response} selectedOptions={selectedOptions} />
        </>
      )}
    </div>
  );
};

export default App;

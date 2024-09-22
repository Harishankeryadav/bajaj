import React from 'react';

const Result = ({ response, selectedOptions }) => {
  const displayData = () => {
    let result = {};
    selectedOptions.forEach(option => {
      result[option] = response[option];
    });
    return result;
  };

  const renderedData = displayData();

  return (
    <div>
      <h3>Response Data:</h3>
      <pre>{JSON.stringify(renderedData, null, 2)}</pre>

      {/* Display file validation info */}
      <h3>File Information:</h3>
      <p>File Valid: {response.file_valid ? 'Yes' : 'No'}</p>
      {response.file_valid && (
        <>
          <p>MIME Type: {response.file_mime_type}</p>
          <p>File Size: {response.file_size_kb} KB</p>
        </>
      )}
    </div>
  );
};

export default Result;

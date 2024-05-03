import React, { useState } from 'react';

const DocumentEditor = ({ document }) => {
  const [text, setText] = useState(document.content);

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div>
      <h2>Document: {document.name}</h2>
      <textarea value={text} onChange={handleTextChange} />
      {/* Additional formatting options can be added here */}
    </div>
  );
};

export default DocumentEditor;

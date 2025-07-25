// src/components/Suggestions.jsx

import React from "react";

export default function Suggestions({ suggestions = [], showGenerator, onGenerate, generatedPassword, onCopy }) {
  return (
    <div className="suggestions-box">
      {suggestions.length > 0 && (
        <>
          <strong>Suggestions:</strong>
          <ul>
            {suggestions.map((text, idx) => <li key={idx}>{text}</li>)}
          </ul>
        </>
      )}
      {showGenerator && (
        <div style={{marginTop: "1em"}}>
          <button onClick={onGenerate}>Suggest strong password</button>
          {generatedPassword && (
            <div style={{marginTop: "0.6em"}}>
              <code>{generatedPassword}</code>
              <button style={{marginLeft: "1em"}} onClick={() => onCopy(generatedPassword)}>Copy</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

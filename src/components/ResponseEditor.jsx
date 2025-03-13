import React, { useState } from "react";
import ChatGPTService from "../services/ChatGPTService";

const ResponseEditor = ({ emailContent }) => {
  const [instructions, setInstructions] = useState("");
  const [response, setResponse] = useState("");

  const handleGenerateResponse = async () => {
    if (!emailContent) {
      alert("Bitte zuerst eine E-Mail hochladen.");
      return;
    }

    const aiResponse = await ChatGPTService.getResponse(emailContent, instructions);
    setResponse(aiResponse);
  };

  return (
    <div className="response-container">
      <div className="instructions">
        <h3>Anweisungen</h3>
        <textarea
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          placeholder="Zusätzliche Hinweise für die Antwort..."
        />
      </div>
      <button onClick={handleGenerateResponse}>Antwort generieren</button>
      <div className="response">
        <h3>Antwortvorschlag</h3>
        <textarea readOnly value={response} placeholder="Hier erscheint die KI-Antwort..." />
      </div>
    </div>
  );
};

export default ResponseEditor;

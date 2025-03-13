import React, { useState } from "react";
import FileUpload from "./components/FileUpload";

const App = () => {
  const [emailContent, setEmailContent] = useState("");

  return (
    <div className="container">
      <h1>ChatGPT E-Mail Assistant</h1>
      <div className="content">
        <FileUpload setEmailContent={setEmailContent} />
        <div className="email-display">
          <h3>E-Mail Inhalt:</h3>
          <div className="email-content">
            {emailContent ? (
              <pre>{emailContent}</pre>
            ) : (
              <p>Keine E-Mail hochgeladen</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

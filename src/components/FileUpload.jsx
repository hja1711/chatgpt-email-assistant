import React, { useState } from "react";

const FileUpload = ({ setEmailContent }) => {
  const [fileName, setFileName] = useState("");

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      processFile(file);
    }
  };

  const handleFileDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file) => {
    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const fileContent = e.target.result;
      try {
        const subjectMatch = fileContent.match(/^Subject: (.*)$/m);
        const fromMatch = fileContent.match(/^From: (.*)$/m);
        const toMatch = fileContent.match(/^To: (.*)$/m);

        let bodyContent = "";
        const multipartSections = fileContent.split(/--\S+/g);

        multipartSections.forEach((section) => {
          const htmlMatch = section.match(/Content-Type: text\/html;.*?\n\n([\s\S]*)/i);
          if (htmlMatch && !bodyContent) {
            bodyContent = htmlMatch[1].replace(/<\/?[^>]+(>|$)/g, "").replace(/\n+/g, " ").trim();
          }

          const plainTextMatch = section.match(/Content-Type: text\/plain;.*?\n\n([\s\S]*)/i);
          if (plainTextMatch && !bodyContent) {
            bodyContent = plainTextMatch[1].trim();
          }

          const base64Match = section.match(/Content-Transfer-Encoding: base64\s*\n\n([\s\S]*)/i);
          if (base64Match && !bodyContent) {
            try {
              bodyContent = atob(base64Match[1].trim());
            } catch (error) {
              console.error("Fehler beim Base64-Dekodieren:", error);
            }
          }

          const qpMatch = section.match(/Content-Transfer-Encoding: quoted-printable\s*\n\n([\s\S]*)/i);
          if (qpMatch && !bodyContent) {
            bodyContent = decodeQuotedPrintable(qpMatch[1].trim());
          }
        });

        if (!bodyContent) {
          bodyContent = "Kein Inhalt gefunden oder die Nachricht ist ein Anhang.";
        }

        const emailData = `📌 **Betreff:** ${subjectMatch ? subjectMatch[1] : "Unbekannt"}\n✉️ **Von:** ${fromMatch ? fromMatch[1] : "Unbekannt"}\n📩 **Empfangen:** ${toMatch ? toMatch[1] : "Unbekannt"}\n📝 **Inhalt:** ${bodyContent}`;

        setEmailContent(emailData);
      } catch (error) {
        console.error("Fehler beim Parsen der E-Mail:", error);
        setEmailContent("Fehler beim Laden der E-Mail.");
      }
    };

    reader.readAsText(file);
  };

  return (
    <div
      className="file-upload"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleFileDrop}
    >
      <input type="file" accept=".eml" onChange={handleFileUpload} />
      {fileName && <p>Datei hochgeladen: {fileName}</p>}
    </div>
  );
};

export default FileUpload;

import React from "react";

const UploadForm = ({ onFileUpload }) => {
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result;
        const parsedEmail = parseEmail(content);
        onFileUpload(parsedEmail);
      };
      reader.readAsText(file);
    }
  };

  const handleDrop = async (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target.result;
        const parsedEmail = parseEmail(content);
        onFileUpload(parsedEmail);
      };
      reader.readAsText(file);
    }
  };

  const parseEmail = (rawEmail) => {
    try {
      // Betreff extrahieren
      const subjectMatch = rawEmail.match(/^Subject: (.+)$/m);
      const subject = subjectMatch ? subjectMatch[1] : "Kein Betreff";

      // Body extrahieren (ab erster Leerzeile nach den Headern)
      const bodyMatch = rawEmail.split("\n\n").slice(1).join("\n").trim();
      const body = bodyMatch ? bodyMatch.substring(0, 2000) + "..." : "Kein Inhalt";

      return `📌 Betreff: ${subject}\n\n✉ ${body}`;
    } catch (error) {
      console.error("Fehler beim Parsen der E-Mail:", error);
      return "Fehler beim Laden der E-Mail.";
    }
  };

  return (
    <div className="upload-container" onDragOver={(e) => e.preventDefault()} onDrop={handleDrop}>
      <input type="file" id="fileUpload" accept=".eml" onChange={handleFileUpload} hidden />
      <label htmlFor="fileUpload">Datei auswählen</label>
      <p>Oder ziehe eine E-Mail (.eml) hierhin</p>
    </div>
  );
};

export default UploadForm;

document.addEventListener("DOMContentLoaded", () => {
  const fileInput = document.getElementById("fileUpload");
  const emailSubject = document.getElementById("emailSubject");
  const emailSender = document.getElementById("emailSender");
  const emailRecipient = document.getElementById("emailRecipient");
  const emailContent = document.getElementById("emailContent");

  fileInput.addEventListener("change", (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
      try {
        const parsed = parse(e.target.result);

        emailSubject.innerText = parsed.headers.get("subject") || "Kein Betreff";
        emailSender.innerText = parsed.headers.get("from") || "Unbekannter Absender";
        emailRecipient.innerText = parsed.headers.get("to") || "Unbekannter Empfänger";
        emailContent.innerText = parsed.childNodes.length > 0 ? parsed.childNodes[0].content : "Kein Textinhalt gefunden.";
      } catch (error) {
        console.error("Fehler beim Parsen der E-Mail:", error);
        emailContent.innerText = "Fehler beim Laden der E-Mail.";
      }
    };

    reader.readAsText(file);
  });
});

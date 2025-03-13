const API_KEY = "DEIN_OPENAI_API_KEY"; // Ersetze mit deinem Schlüssel

const ChatGPTService = {
  getResponse: async (emailText, instructions) => {
    const prompt = `
      Du bist ein professioneller E-Mail-Assistent.
      Hier ist der Inhalt der E-Mail:
      ${emailText}
      ${instructions}
      Schreibe einen professionellen Antwortentwurf.
    `;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content.trim();
  },
};

export default ChatGPTService;

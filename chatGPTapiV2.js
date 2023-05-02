class ChatGPTAPI {
  getInfo() {
    return {
      "id": "chatgptapi",
      "name": "ChatGPT API",
      "blocks": [
        {
          "opcode": "getChatGPTResponse",
          "blockType": "reporter",
          "text": "get ChatGPT response for [text]",
          "arguments": {
            "text": {
              "type": "string",
              "defaultValue": "Hello"
            }
          }
        }
      ]
    };
  }

  getChatGPTResponse({text}) {
    const apiKey = "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";
    const url = `https://api.openai.com/v1/engines/davinci-codex/completions?prompt=${encodeURIComponent(text)}&max_tokens=50`;
    
    return fetch(url, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        return response.choices[0].text;
      })
      .catch((error) => {
        console.error(error);
        return "Error fetching response from ChatGPT API";
      });
  }
}

Scratch.extensions.register(new ChatGPTAPI());

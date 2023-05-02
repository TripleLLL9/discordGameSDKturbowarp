class ChatGPT {
  constructor() {
    this.apiKey = '';
  }

  getInfo() {
    return {
      id: 'chatgpt',
      name: 'ChatGPT',
      blocks: [
        {
          opcode: 'generateText',
          blockType: Scratch.BlockType.REPORTER,
          text: 'generate text [prompt]',
          arguments: {
            prompt: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'Hello, World!'
            }
          }
        }
      ]
    };
  }

  async generateText(args) {
    const prompt = args.prompt;
    const url = 'https://api.openai.com/v1/chat';
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    };
    const body = {
      'prompt': prompt,
      'temperature': 0.7,
      'max_tokens': 60,
      'stop': '\n'
    };
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(body)
    });
    const data = await response.json();
    return data.choices[0].text;
  }
}

Scratch.extensions.register(new ChatGPT());

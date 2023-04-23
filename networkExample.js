class NetworkExample {
  getInfo() {
    return {
      id: 'networkexample',
      name: 'Network Example',
      blocks: [
        {
          opcode: 'fetch',
          blockType: Scratch.BlockType.REPORTER,
          text: 'fetch [URL]',
          arguments: {
            URL: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'https://example.com',
            }
          }
        },
        {
          opcode: 'get_element_by_id',
          blockType: Scratch.BlockType.REPORTER,
          text: 'get element by ID [ID]',
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'element-id',
            }
          }
        }
      ]
    };
  }

  fetch(args) {
    return fetch(args.URL)
      .then(response => response.text())
      .then(text => text.slice(0, 100)); // Truncate to first 100 characters
  }
  
  get_element_by_id(args) {
    const id = args.ID;
    const element = document.getElementById(id);
    if (element) {
      return element.outerHTML;
    } else {
      return '';
    }
  }
}

Scratch.extensions.register(new NetworkExample());

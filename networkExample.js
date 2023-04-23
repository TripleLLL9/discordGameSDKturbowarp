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
              defaultValue: 'https://jsonplaceholder.typicode.com/todos/1'
            }
          }
        },
        {
          opcode: 'getElementById',
          blockType: Scratch.BlockType.REPORTER,
          text: 'get element by id [ID]',
          arguments: {
            ID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'example-id'
            }
          }
        },
        {
          opcode: 'fragmentGet',
          blockType: Scratch.BlockType.REPORTER,
          text: 'fragment.get [SELECTOR]',
          arguments: {
            SELECTOR: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'p'
            }
          }
        }
      ]
    };
  }

  fetch(args) {
    const url = args.URL;
    return fetch(url)
      .then(response => response.json())
      .then(json => JSON.stringify(json));
  }

  getElementById(args) {
    const id = args.ID;
    const element = document.getElementById(id);
    if (element) {
      return element.innerText;
    }
    return '';
  }

  fragmentGet(args) {
    const selector = args.SELECTOR;
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    return fragment.get(selector);
  }
}

Scratch.extensions.register(new NetworkExample());

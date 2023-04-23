class DiscordAuth {
  getInfo() {
    return {
      id: 'discordauth',
      name: 'Discord Authentication',
      blocks: [
        {
          opcode: 'authorize',
          blockType: Scratch.BlockType.REPORTER,
          text: 'Authorize with Discord',
          arguments: {}
        },
        {
          opcode: 'setClientId',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Set client ID to [CLIENTID]',
          arguments: {
            CLIENTID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: ''
            }
          }
        },
        {
          opcode: 'setRedirectUri',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Set redirect URI to [REDIRECTURI]',
          arguments: {
            REDIRECTURI: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: ''
            }
          }
        },
        {
          opcode: 'setScopes',
          blockType: Scratch.BlockType.COMMAND,
          text: 'Set scopes to [SCOPES]',
          arguments: {
            SCOPES: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: ''
            }
          }
        }
      ]
    };
  }

  authorize(args) {
    const auth_url = `https://discord.com/api/oauth2/authorize?client_id=${this.client_id}&redirect_uri=${this.redirect_uri}&response_type=code&scope=${this.scopes}`;
    window.location.replace(auth_url);
    return '';
  }

  setClientId(args) {
    this.client_id = args.CLIENTID;
  }

  setRedirectUri(args) {
    this.redirect_uri = args.REDIRECTURI;
  }

  setScopes(args) {
    this.scopes = args.SCOPES;
  }
}

Scratch.extensions.register(new DiscordAuth());

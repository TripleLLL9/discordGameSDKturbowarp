class DiscordGameSDK {  
  getInfo() {
    return {
      id: 'discordgamesdk',
      name: 'Discord Game SDK',
      blocks: [
        {
          opcode: 'createClient',
          blockType: Scratch.BlockType.COMMAND,
          text: 'create client with client id [CLIENTID] and flags [FLAGS]',
          arguments: {
            CLIENTID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'client_id_here'
            },
            FLAGS: {
              type: Scratch.ArgumentType.NUMBER,
              defaultValue: 1
            }
          }
        },
        {
          opcode: 'destroyClient',
          blockType: Scratch.BlockType.COMMAND,
          text: 'destroy client [CLIENT]',
          arguments: {
            CLIENT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'client_variable_here'
            }
          }
        },
        {
          opcode: 'runCallbacks',
          blockType: Scratch.BlockType.COMMAND,
          text: 'run callbacks for client [CLIENT]',
          arguments: {
            CLIENT: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: 'client_variable_here'
            }
          }
        }
      ]
    };
  }

  createClient(args) {
    const CLIENT_ID = args.CLIENTID;
    const FLAGS = args.FLAGS;

    var discord = new Discord.Discord(CLIENT_ID, (UInt64)Discord.CreateFlags.Default);
    return discord;
  }

  destroyClient(args) {
    const CLIENT = args.CLIENT;
    CLIENT.destroy();
  }

  runCallbacks(args) {
    const CLIENT = args.CLIENT;
    CLIENT.runCallbacks();
  }
}

Scratch.extensions.register(new DiscordGameSDKExtension());```

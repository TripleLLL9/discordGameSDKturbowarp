const fs = require('fs');
const path = require('path');
const Discord = require('discord-gamesdk');

// Read the contents of package.json
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));

// Include the discord-gamesdk module as a dependency
const DiscordGameSDK = Discord.DiscordGameSDK;
const CLIENT_ID = 'my-client-id';

// Use the Discord Game SDK as needed
const discord = new DiscordGameSDK(CLIENT_ID, Discord.CreateFlags.Default);

class DiscordGameSDK extends ScratchExtension {
  constructor() {
    super('Discord Game SDK', '1.0', 'A TurboWarp extension for the Discord Game SDK');
    
    // Include the necessary functions and constants from the binding layer
    const { initializeDiscordSDK, joinDiscordGame, setDiscordStatus } = require('./binding_layer');
    
    // Wrapper function for initializing the Discord SDK
    this.initializeDiscordSDK = function (applicationID) {
      initializeDiscordSDK(applicationID);
    };

    // Wrapper function for joining a Discord game
    this.joinDiscordGame = function (gameID) {
      joinDiscordGame(gameID);
    };

    // Wrapper function for setting the user's Discord status
    this.setDiscordStatus = function (status) {
      setDiscordStatus(status);
    };
  }

  // Cleanup function when the extension is unloaded
  onunload() {
    // Do any cleanup here
  }

  // Status reporting code
  // Use this to report missing hardware, plugin or unsupported browser
  getInfo() {
    return {
      id: 'discordGameSDK',
      name: 'Discord Game SDK',
      blocks: [
        {
          opcode: 'initializeDiscordSDK',
          blockType: Scratch.BlockType.COMMAND,
          text: 'initialize Discord SDK with application ID [applicationID]',
          arguments: {
            applicationID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: ''
            }
          }
        },
        {
          opcode: 'joinDiscordGame',
          blockType: Scratch.BlockType.COMMAND,
          text: 'join Discord game with ID [gameID]',
          arguments: {
            gameID: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: ''
            }
          }
        },
        {
          opcode: 'setDiscordStatus',
          blockType: Scratch.BlockType.COMMAND,
          text: 'set Discord status to [status]',
          arguments: {
            status: {
              type: Scratch.ArgumentType.STRING,
              defaultValue: ''
            }
          }
        }
      ]
    };
  }

  // Wrapper function for initializing the Discord SDK
  initializeDiscordSDK(args) {
    const applicationID = args.applicationID;
    this.ext.initializeDiscordSDK(applicationID);
  }

  // Wrapper function for joining a Discord game
  joinDiscordGame(args) {
    const gameID = args.gameID;
    this.ext.joinDiscordGame(gameID);
  }

  // Wrapper function for setting the user's Discord status
  setDiscordStatus(args) {
    const status = args.status;
    this.ext.setDiscordStatus(status);
  }
}

Scratch.extensions.register(new DiscordGameSDK());

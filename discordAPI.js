class DiscordAPI {
    const clientID = "1096168692259242054";
    const redirectURI = "https://triplelll9.wixsite.com/robotiis-adventure/sign-in-successful";
  }

  getInfo() {
    return {
      id: "discordapi",
      name: "Discord API",
      blocks: [
        {
          opcode: "getAccessToken",
          blockType: "reporter",
          text: "access token",
        },
        {
          opcode: "setAccessToken",
          blockType: "command",
          text: "set access token to [TOKEN]",
          arguments: {
            TOKEN: {
              type: "string",
            },
          },
        },
        {
          opcode: "getUserInfo",
          blockType: "reporter",
          text: "user info [FIELD]",
          arguments: {
            FIELD: {
              type: "string",
              menu: "USERINFOFIELDS",
              defaultValue: "username",
            },
          },
        },
        {
          opcode: "setRPC",
          blockType: "command",
          text: "set rich presence to [DETAILS] [STATE] [LARGE_IMAGE] [LARGE_TEXT] [SMALL_IMAGE] [SMALL_TEXT]",
          arguments: {
            DETAILS: {
              type: "string",
            },
            STATE: {
              type: "string",
            },
            LARGE_IMAGE: {
              type: "string",
              defaultValue: "",
            },
            LARGE_TEXT: {
              type: "string",
              defaultValue: "",
            },
            SMALL_IMAGE: {
              type: "string",
              defaultValue: "",
            },
            SMALL_TEXT: {
              type: "string",
              defaultValue: "",
            },
          },
        },
      ],
      menus: {
        USERINFOFIELDS: [
          "id",
          "username",
          "discriminator",
          "avatar",
          "bot",
          "system",
        ],
      },
    };
  }

  getAccessToken() {
    return this.accessToken || "";
  }

  setAccessToken(args) {
    this.accessToken = args.TOKEN;
  }

  async getUserInfo(args) {
    const field = args.FIELD.toLowerCase();
    const response = await fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `Bearer ${this.accessToken}`,
      },
    });
    const json = await response.json();
    return json[field] || "";
  }

  async setRPC(args) {
    const details = args.DETAILS || "";
    const state = args.STATE || "";
    const largeImageKey = args.LARGE_IMAGE || "";
    const largeImageText = args.LARGE_TEXT || "";
    const smallImageKey = args.SMALL_IMAGE || "";
    const smallImageText = args.SMALL_TEXT || "";
    const presenceData = {
      details,
      state,
      assets: {
        large_image: largeImageKey,
        large_text: largeImageText,
        small_image: smallImageKey,
        small_text: smallImageText,
      },
    };
    await fetch("https://discord.com/api/v8/rpc/update_presence", {
      method: "POST",
      headers: {
        authorization: `Bearer ${this.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(presenceData),
    });
  }
}

Scratch.extensions.register(new DiscordAPI());

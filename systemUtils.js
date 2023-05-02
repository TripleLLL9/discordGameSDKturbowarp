class SystemUtils {
  getInfo() {
    return {
      id: 'systemutils',
      name: 'System Utils',
      blocks: [
        {
          opcode: 'getDefaultLanguage',
          blockType: Scratch.BlockType.REPORTER,
          text: 'system default language',
          arguments: {},
        },
      ],
    };
  }

  getDefaultLanguage() {
    return navigator.language;
  }
}

Scratch.extensions.register(new SystemUtils());

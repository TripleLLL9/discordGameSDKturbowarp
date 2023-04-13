(function(ext) {

    // Initialize the Discord Game SDK
    DiscordGameSDK.init();

    // Create a Discord Game SDK application object
    var application = new DiscordGameSDK.Application(
        1096168692259242054,
        DiscordGameSDK.CreateFlags.Default
    );

    // Define the extension blocks
    ext._getStatus = function() {
        return {status: 2, msg: 'Ready'};
    };

    ext.authenticate = function(callback) {
        var result = application.authenticate();
        if (result === DiscordGameSDK.Result.Ok) {
            var user = application.getCurrentUser();
            callback(user.username + '#' + user.discriminator);
        } else {
            callback('Error: ' + DiscordGameSDK.resultToString(result));
        }
    };

    ext.setRichPresence = function(state, details, startTimestamp, endTimestamp, largeImageKey, largeImageText, smallImageKey, smallImageText, callback) {
        var richPresence = new DiscordGameSDK.RichPresence();
        richPresence.state = state;
        richPresence.details = details;
        richPresence.startTimestamp = startTimestamp;
        richPresence.endTimestamp = endTimestamp;
        richPresence.largeImageKey = largeImageKey;
        richPresence.largeImageText = largeImageText;
        richPresence.smallImageKey = smallImageKey;
        richPresence.smallImageText = smallImageText;
        var result = application.updatePresence(richPresence);
        if (result === DiscordGameSDK.Result.Ok) {
            callback(true);
        } else {
            callback('Error: ' + DiscordGameSDK.resultToString(result));
        }
    };

    // Register the extension
    ScratchExtensions.register('Robotii\'s Adventure Discord Rich Presence', {
        blocks: [
            ['R', 'Authenticate with Discord', 'authenticate'],
            ['w', 'Set Discord Rich Presence to state %s details %s start timestamp %n end timestamp %n large image key %s large image text %s small image key %s small image text %s', 'setRichPresence', 'Playing', 'Robotii\'s Adventure', 0, 0, 'robotii_large', 'Robotii', 'robotii_small', 'Robotii']
        ]
    });

})(window.ScratchExtensions || (window.ScratchExtensions = {}));

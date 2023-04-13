class discordGameSDK {

    var rpc = null;
    var clientId = '1096168692259242054';
    var accessToken = null;
    var authenticated = false;

    ext._shutdown = function() {
        if (rpc && authenticated) {
            rpc.clearActivity();
            rpc.close();
        }
    };

    ext._getStatus = function() {
        if (rpc && authenticated) {
            return {status: 2, msg: 'Connected'};
        }
        return {status: 1, msg: 'Not connected'};
    };

    ext.initialize = function() {
        if (!rpc) {
            DiscordRPC.register(clientId);
            rpc = new DiscordRPC.Client({ transport: 'ipc' });
            rpc.on('ready', () => {
                console.log('Discord RPC ready!');
                authenticated = true;
            });
            rpc.login({ clientId }).catch(console.error);
        }
    };

    ext.setActivity = function(details, state, largeImageKey, smallImageKey) {
        if (rpc && authenticated) {
            rpc.setActivity({
                details: details,
                state: state,
                largeImageKey: largeImageKey,
                smallImageKey: smallImageKey,
                instance: false
            });
        }
    };

    ext.clearActivity = function() {
        if (rpc && authenticated) {
            rpc.clearActivity();
        }
    };

    var descriptor = {
        blocks: [
            [' ', 'Initialize Discord Game SDK', 'initialize'],
            [' ', 'Set Discord Game SDK activity details: %s state: %s large image key: %s small image key: %s', 'setActivity', '', '', '', ''],
            [' ', 'Clear Discord Game SDK activity', 'clearActivity'],
        ]
    };

    ScratchExtensions.register('Discord Game SDK', descriptor, ext);
})({});

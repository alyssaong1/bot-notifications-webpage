var builder = require('botbuilder');

//=========================================================
// Bot Setup
//=========================================================

var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});

// User db access
var userDao;

var bot = new builder.UniversalBot(connector, function (session) {
    // Modify with your own dialogs
    session.send("Hello, how can I help?")
});

// Enable Conversation Data persistence
bot.set('persistConversationData', true);

// Send welcome and save user address when conversation with bot is updated
bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                // Save the address to cosmos db here
                userDao.addItem(message.address, function (err) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("Successfully saved user address");
                    }
                });
                bot.beginDialog(message.address, '/');
            }
        });
    }
});

function listen() {
    return connector.listen();
}

// Other wrapper functions
function beginDialog(address, dialogId, dialogArgs) {
    bot.beginDialog(address, dialogId, dialogArgs);
}

function sendMessage(message) {
    bot.send(message);
}

function initdb(userdao) {
    userDao = userdao;
}

module.exports = {
    initdb: initdb,
    listen: listen,
    beginDialog: beginDialog,
    sendMessage: sendMessage
};
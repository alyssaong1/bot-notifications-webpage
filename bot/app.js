// This loads the environment variables from the .env file
require('dotenv-extended').load();

// Register Bot
var bot = require('./bot');
var restify = require('restify');
var server = restify.createServer();

//=========================================================
// DocumentDb Setup
//=========================================================
var DocumentDBClient = require('documentdb').DocumentClient;
var UserDao = require('./models/userDao');

var docDbClient = new DocumentDBClient(process.env.HOST, {
    masterKey: process.env.AUTHKEY
});
var userDao = new UserDao(docDbClient, process.env.DATABASEID, process.env.COLLECTIONID);

userDao.init(function (err) {
    if (err) { 
        console.log("Could not connect to db: " + err)
    } else {
        console.log("User db initialised")
    }
    
    // Pass data access object to bot module
    bot.initdb(userDao);

    server.post('/api/messages', bot.listen());

    // Start listening
    var port = process.env.port || process.env.PORT || 3979;
    server.listen(port, function () {
    console.log('Server listening on port %s', port);
    });
});


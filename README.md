# Microsoft Bot Framework Notifications via Web App #

Push custom notifications to all your bot users with Microsoft Bot Framework from a webpage. Enter a message and push the message to all users. This scenario is ideal for event bots, where the organiser or comms team may want to send announcements to all the participants. I have not included any authentication - but in production you will want to add some form of auth so that the web app is protected from the public. 

**Note: The bot and the web app are hosted separately, which is ideal in production.**

## Demo ##

![demo-gif](http://i.imgur.com/SxqWSav.gif)

## Install and run locally ##

Run `npm install` in both bot and dashboard folders to build dependencies.

Populate the .env files for the bot and dashboard: 
- If you're running locally, you can leave the MICROSOFT_APP_ID and MICROSOFT_APP_PASSWORD fields blank for now.
- Get an Azure Subscription. You can sign up for a free trial [here](https://azure.microsoft.com/en-us/free/).
- Spin up an Azure Cosmos db instance [here](https://azure.microsoft.com/en-us/services/cosmos-db/), for Document db. You will need to populate the .env file with the host url, primary key, database id and collection id. 

Run `npm start` in the bot and dashboard. Start typing custom messages in your web app, and see these get sent to your bot through the [emulator](https://emulator.botframework.com).

## Install and run on the cloud ##

- Generate a bot at http://dev.botframework.com to get the MICROSOFT_APP_ID and MICROSOFT_APP_PASSWORD. Populate the .env variables with these values. 
- Generate 2 separate Azure App Services to host the bot and the web app separately.
- Use continuous deployment with a source control of your choice (Github/VSTS) to push your code to the 2 App Services. 

## Additional Resources ##

- [Sending proactive messages via Bot Framework](https://github.com/Microsoft/BotBuilder-Samples/tree/master/Node/core-proactiveMessages)
- [Working with the Document db Nodejs API](https://docs.microsoft.com/en-us/azure/cosmos-db/documentdb-nodejs-samples)
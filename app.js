const Discord = require("discord.js");
const client = new Discord.Client();

client.progbot = require("./config.js");

// Instance completed initializing
client.on("ready", function() {
	client.user.setActivity(client.progbot.defaultActivity);

	console.log("Progbot initialized");
});

// Modules
require("./modules/commands.js")(client);
require("./modules/currency.js")(client);

// Start login process
client.login(client.progbot.token);
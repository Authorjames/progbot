const Discord = require("discord.js");

module.exports = {
    name: "Game",
    cmd: "game",
    category: "Utility",
    description: "Change the game of the bot",
    call: function (message, text, client) {
        client.user.setActivity(text);
    }
}
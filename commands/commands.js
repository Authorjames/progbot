const Discord = require("discord.js");

module.exports = {
    name: "Commands",
    description: "Get a list of all commands",
    category: "Utility",
    cmd: ["cmd", "commands", "help"],
    call: function(message, text, client) {
        var commands = client.progbot.commands;
        var categories = {};
        var fields = [];

        Object.values(commands).forEach(function(key) {
            if (categories[key.category]) {
                if (Array.isArray(key.cmd)) {
                    categories[key.category].push(client.progbot.commandPrefix + key.cmd.join(" | " + client.progbot.commandPrefix) + " - " + key.description)
                } else {
                    categories[key.category].push(client.progbot.commandPrefix + key.cmd + " - " + key.description)
                }
            } else {
                categories[key.category] = [];
                if (Array.isArray(key.cmd)) {
                    categories[key.category].push(client.progbot.commandPrefix + key.cmd.join(" | " + client.progbot.commandPrefix) + " - " + key.description)
                } else {
                    categories[key.category].push(client.progbot.commandPrefix + key.cmd + " - " + key.description)
                }
            }
        })

        Object.keys(categories).forEach(function(val) {
            fields.push({
                name: val,
                value: categories[val],
                inline: false,
            })
        })
        
        const embed = new Discord.MessageEmbed({
            color: client.progbot.defaultColor,
            title: "list of commands",
            description: "A list of all the commands in this marvelous creation of a Bot.",
            fields: fields,
        })
        message.channel.send(embed);
    }
}
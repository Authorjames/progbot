const Discord = require("discord.js");

module.exports = {
    name: "Ping",
    cmd: "ping",
    category: "Utility",
    description: "A ping command thingy thongy",
    call: function(message, text, client) {
        var embed = new Discord.MessageEmbed({
            color: client.progbot.defaultColor,
            description: ":wave: Pong!\n:satellite_orbital: " + (Date.now()-message.createdTimestamp).toString() +  " milliseconds!",
        })

        message.channel.send(embed);
    }
}
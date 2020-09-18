const request = require("request");
const Discord = require("discord.js");

module.exports = {
    name: "Cat",
    cmd: ["cat", "meow"],
    category: "Fun",
    description: "Get a random cat at your door today!",
    call: function(message, text, client) {
        request("http://aws.random.cat/meow", function(err, res, body) {
            if (err) {
                message.channel.send("Meowy not worky:(");
                return;
            }

            var embed = new Discord.MessageEmbed({
                title: "Meow",
                image: {
                    url: JSON.parse(body)["file"],
                },
                color: client.progbot.defaultColor,
            });

            message.channel.send(embed);
        })
    }
}
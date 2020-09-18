const request = require("request");
const Discord = require("discord.js");

module.exports = {
    name: "Fortune",
    cmd: ["fortune"],
    category: "Fun",
    description: "Up for a life changing fortune?",
    call: function(message, text, client) {
        request("http://yerkee.com/api/fortune", function(err, res, body) {
            if (err) {
                message.channel.send("GET request failed!");
                return;
            }

            var embed = new Discord.MessageEmbed({
                title: "Fortune",
                description: JSON.parse(body)["fortune"],
                color: client.progbot.defaultColor,
            });

            message.channel.send(embed);
        })
    }
}
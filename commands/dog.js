const request = require("request");
const Discord = require("discord.js");

module.exports = {
    name: "Dog",
    cmd: ["dog", "woff"],
    category: "Fun",
    description: "Get a random cat at your door today!",
    call: function(message, text, client) {
        request("http://random.dog", function(err, res, body) {
            if (err) {
                message.channel.send("Meowy not worky:(");
                return;
            }

            var embed = new Discord.MessageEmbed({
                title: "Woff",
                image: {
                    url: "https://random.dog/" + /<img.+src="(.*)".+\/>/g.exec(body)[1],
                },
                color: client.progbot.defaultColor,
            });

            message.channel.send(embed);
        })
    }
}
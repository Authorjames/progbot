const Discord = require("discord.js");

module.exports = {
    cmd: ["8", "8ball", "8b"],
    description: "Ask the magical 8-ball!",
    category: "Fun",
    call: function(message, text, client) {
        var results = [
            "It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes, definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful",
        ]

        var result = results[Math.floor(Math.random()*results.length)]
        message.channel.send(client.progbot.easyEmbed(false, ":8ball: " + result));
    }
}
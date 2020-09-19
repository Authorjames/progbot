const Discord = require("discord.js");

notify = function(message, text, color) {
    if (message && text) {
        var embed = new Discord.MessageEmbed({
            color: color || 0x00a6ff,
        })

        if (Array.isArray(text)) {
            embed.setTitle(text[0]);
            embed.setDescription(text[1]);
        } else {
            embed.setDescription(text);
        }

        message.channel.send(embed);
    }
}

success = function(message, text) {
    if (message && text) {
        var embed = new Discord.MessageEmbed({
            color: 0x3ce655,
        })

        if (Array.isArray(text)) {
            embed.setTitle(text[0]);
            embed.setDescription(text[1]);
        } else {
            embed.setDescription(text);
        }

        return message.channel.send(embed);
    }
}

error = function(message, text) {
    if (message && text) {
        var embed = new Discord.MessageEmbed({
            color: 0xed5151,
        })

        if (Array.isArray(text)) {
            embed.setTitle(text[0]);
            embed.setDescription(text[1]);
        } else {
            embed.setDescription(text);
        }

        return message.channel.send(embed);
    }
}

embed = function(message, embed) {
    if (embed == undefined || Object.values(embed).length == 0) {
        var err = new Error();
        error(message, "Invalid embed: " + err.stack);

        return;
    }

    if (embed.color == undefined) {
        embed.color = 0x00a6ff
    }

    var finishedEmbed = new Discord.MessageEmbed(embed);
    return message.channel.send(finishedEmbed)
}

module.exports.notify = notify;
module.exports.error = error;
module.exports.success = success;
module.exports.embed = embed;
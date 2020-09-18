const Discord = require("discord.js");
const mlib = require("./../modules/mlib.js");

module.exports = {
    name: "Invite",
    cmd: ["invite", "inv"],
    category: "Utility",
    description: "Generate invite link for this bot",
    call: function(message, text, client) {
        var link = "https://discord.com/oauth2/authorize?client_id=745990298722631722&scope=bot&permissions=8";

        mlib.embed(message, {
            title: "Progbot",
            description: "**Invite link!**\n\n" + link,
            footer: {
                text: "Created by Author.",
                icon_url: "https://cdn.discordapp.com/avatars/87570671516794880/6b4cf7f03f2d598a70e2055d4e8b5161.jpg",
            }
        })
    }
}
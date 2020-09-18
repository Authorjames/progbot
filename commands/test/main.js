const Discord = require("discord.js");

const mlib = require("./../../modules/mlib.js");

function generateEmbed(title, dealerCards, dealerValue, playerCards, playerValue, bet) {
    var embed = new Discord.MessageEmbed({
        author: {
            name: "Blackjack",
        },
        title: title,
        color: 0x00a6ff,
        fields: [
            {
                name: "Dealer's cards:",
                value: dealerCards,
                inline: false,
            },
            {
                name: "Dealer's value:",
                value: dealerValue,
                inline: false,
            },
            {
                name: "Cards:",
                value: playerCards,
                inline: false,
            },
            {
                name: "Value:",
                value: playerValue,
                inline: false,
            }, 
            {
                name: "Bet:",
                value: bet,
                inline: false,
            }, 
            {
                name: "Instructions:",
                value: "?bj draw - draw a card\n\?bj stand - stand your hand\n?bj double - double your card",
                inline: false,
            }
        ],
    });

    return embed;
};

module.exports = {
    name: "Test",
    cmd: ["test", "t"],
    description: "Testing folder commands for advanced commands",
    call: function(message, text, client) {
        var embed = generateEmbed("Your move!", "6 Hearts", "6", "10 of Hearts | 5 of Clubs", "15", 200)
        var editedEmbed = generateEmbed("You busted!", "6 Hearts", "6", "10 of Hearts | 5 of Clubs | 9 of Clubs", "24", 200)

        message.channel.send(embed).then(function(message) {
            setTimeout(function() {
                message.edit(editedEmbed);
            }, 5000)
        })
    }
}
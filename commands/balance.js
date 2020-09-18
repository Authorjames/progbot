const Discord = require("discord.js");
const mlib = require("./../modules/mlib.js");

module.exports = {
    name: "Balance",
    cmd: ["balance", "money", "bal"],
    category: "Fun",
    description: "Check your balance!",
    call: function(message, text, client) {
        currency = client.progbot.currency;
        user = message.author;

        if (!currency.exists(user)) {
            currency.create(user, currency.defaultBalance);    
        }

        mlib.notify(message, String(currency.getBalance(user)));
    }
}
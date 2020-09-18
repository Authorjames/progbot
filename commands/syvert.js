const Discord = require("discord.js");
const request = require("request");

const mlib = require("./../modules/mlib.js");

module.exports = {
   name: "Syvert",
   cmd: ["syvert", "kul", "s" ],
   category: "Fun",
   description: "Get a random cat at your door today!",
   call: function(message, text, client) {
      mlib.notify(message, "Syvert sier at " + message.guild.member(message.author).nickname) + " er veldig kul!";
   }
}
const Discord = require("discord.js");
const mlib = require("./../modules/mlib.js");
const {spawn} = require("child_process");

module.exports = {
    name: "Restart",
    cmd: ["restart", "reload"],
    category: "Utilities",
    description: "Restart the bot",
    call: function(message, text, client) {
        mlib.notify(message, "Restarting!");

        process.exitCode = 0;
        
        setTimeout(function() {
            process.exit();
        }, 500);
    }
}
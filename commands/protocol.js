const Discord = require("discord.js");
const mlib = require("./../modules/mlib.js");

module.exports = {
    name: "Protocol",
    cmd: ["protocol"],
    category: "Utility",
    description: "For running code in Discord",
    call: function(message, text, client) {
        if (!client.progbot.defcon == 1) {
            mlib.error(message, "DEFCON LEVEL NOT SUFFICIENT");
        }

        if (text == "initialize") {
            mlib.error(message, "INITIALIZING __HIDDEN ERADICATE PROTOCOL__");
        } else if (text == "status") {
            mlib.error(message, "__HIDDEN ERADICATE PROTOCOL__ IS READY FOR ACTIVATION");
        } else if (text == "activate") {
            mlib.error(message, "ACTIVATING __HIDDEN ERADICATE PROTOCOL__, PLEASE ENTER FIRST CODE . . .");
        } else if (text.startsWith("code")) {
            text = text.split(" ");
            mlib.error(message, "CODE ENTERED (" + text[1] + ") VALIDATED. ENTER FINAL KEY . . .");
        } else if (text.startsWith("key")) {
            text = text.split(" ");
            mlib.error(message, "KEY ENTERED (" + text[1] + ") VALIDATED. **READY FOR LAUNCH . . .**");
        } else if (text == "launch") {
            mlib.error(message, "***__HIDDEN ERADICATE PROTOCOL__ HAS BEEN SET IN MOTION. IMPACT IN T MINUS 30 SECONDS***");

            setTimeout(function() {
                var count = 5;

                for (var i = 5; i > 0; i--) {
                    setTimeout(function() {
                        mlib.error(message, count);
                        count--;

                        if (count == 0) {
                            setTimeout(function() {
                                message.channel.delete("HIDDEN ERADICATE PROTOCOL");
                            }, 2000);
                        }
                    }, 2000*i)
                }
            }, 30*1000)
        }
    }
}
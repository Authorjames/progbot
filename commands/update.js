const Discord = require("discord.js");
const mlib = require("./../modules/mlib.js");
const {exec} = require("child_process");

module.exports = {
    name: "Update",
    cmd: ["update"],
    category: "Utilities",
    description: "Update bot",
    call: function(message, text, client) {
        exec("git pull https://3f894775d0bff931a20bc91114452b3b1246b48c:x-oauth-basic@github.com/Authorjames/progbot", function(error, data) {
            if (error) {
                mlib.error(message, String(error));

                return;
            }

            mlib.notify(message, data);
        });
    }
}
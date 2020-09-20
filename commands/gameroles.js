const Discord = require("discord.js");
const mlib = require("./../modules/mlib.js");

module.exports = {
    name: "Game Roles",
    cmd: "gamerole",
    category: "Utility",
    description: "Register yourself as a game role for game events",
    call: function (message, text, client) {
        let gameRoles = {
            "Among Us": "756574062762786979",
            "Crusader Kings": "756574304975454350",
            "League of Legends": "756574197982953492",
        }

        if (text.length <= 0) {
            mlib.embed(message, {
                title: "All the game roles",
                description: "Among Us",
                footer: {
                    text: "?gamerole <game>"
                }
            })
        } else {
            for (var [k, v] of Object.entries(gameRoles)) {
                if (k.toLowerCase().match(text.toLowerCase())) {
                    if (message.member.roles.cache.has(v)) {
                       message.member.roles.remove(v);
                       mlib.notify(message, "Removed " + k + " from your roles!");

                       return;
                    }

                    message.member.roles.add(v);

                    mlib.notify(message, "Added " + k + " as your role!");

                    return;
                }
            }
        }
    }
}

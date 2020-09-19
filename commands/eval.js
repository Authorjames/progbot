const Discord = require("discord.js");
const mlib = require("./../modules/mlib.js");
const vm = require("vm");

module.exports = {
    name: "JavaScript",
    cmd: ["js", "e", "eval"],
    category: "Utility",
    description: "For running code in Discord",
    call: function(message, text, client) {
        if (!message.author.selfStorage) {
            message.author.selfStorage = {};
        }

        try {
            var context = {
                bot: client.user,
                author: message.author,
                channel: message.channel,
                message: message,
                text: text,
                client: client,
                mlib: mlib,
                discord: Discord,
                me: message.author.selfStorage,
            };

            vm.createContext(context);
            
            var multiline = /```(js)?(?<js>[\s\S]*)```/g
            if (text.match(multiline)) {
                text = multiline.exec(text)

                if (text.groups.js) {
                    text = text.groups.js;
                }
            }

            var script = new vm.Script(text);

            var res = script.runInContext(context, {
                timeout: 2000,
            })

            if ((res != undefined) && (res != "[object Promise]")) {
                if (typeof res == "object") {
                    var jsonRes = JSON.stringify(res, null, 4);
                    if (jsonRes.length > 5900) {
                        mlib.notify(message, "Object stringified exceeds max message length!");

                        return;
                    }

                    mlib.success(message, jsonRes);

                    return;
                }

                mlib.success(message, res.toString());
            }
        } catch(err) {
            var embed = new Discord.MessageEmbed({
                color: 0xff264a,
                title: "Error",
                description: err.toString(),
            })

            message.channel.send(embed);
        }
    }
}
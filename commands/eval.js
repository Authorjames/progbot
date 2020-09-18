const Discord = require("discord.js");
const mlib = require("./../modules/mlib.js");

module.exports = {
    name: "JavaScript",
    cmd: ["js", "e", "eval"],
    category: "Utility",
    description: "For running code in Discord",
    call: function(message, text, client) {
        try {
            bot = client.user;
            author = message.author;
            channel = message.channel;

            function reply(text) {
                message.channel.send(text);
            }
            
            var multiline = /```js([\s\S]*)```/g
            if (text.match(multiline)) {
                text = multiline.exec(text)

                if (text[1]) {
                    text = text[1];
                }
            }

            var res = eval(text);
            if ((res != undefined) && (res != "[object Promise]")) {
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
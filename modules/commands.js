// Command handling

const fs = require("fs");
const path = require("path");

module.exports = function(client) {
    var commandFiles = fs.readdirSync(__dirname + "/" + client.progbot.commandDirectory)

    commandFiles.forEach(function(value) {
        var fileStat = fs.statSync(__dirname + "/" + client.progbot.commandDirectory + "/" + value)
        if (fileStat.isDirectory()) {
            client.progbot.commands[path.parse(value).name] = require("./" + client.progbot.commandDirectory + "/" + value + "/main.js");

            return;
        }

        client.progbot.commands[path.parse(value).name] = require("./" + client.progbot.commandDirectory + "/" + value);
    })

    client.on("message", function(message) {
        var text = message.content.trim();
        var channel = message.channel;
        var prefix = client.progbot.commandPrefix;
        var sprefix = client.progbot.secretPrefix;
        
        if (text.startsWith(sprefix)) {
            var cmd = text.split(" ", 1)[0].substring(2)
            var cmds = client.progbot.commands;

            Object.keys(cmds).forEach(function(key) {
                if (Array.isArray(cmds[key].cmd)) {
                    cmds[key].cmd.forEach(function(val) {
                        if (cmd == val) {
                            var textWithoutCommand = text.split(" ").slice(1).join(" ");
                            client.progbot.commands[key].call(message, textWithoutCommand, client);
                            message.delete();
                        }
                    })
                } else {
                    if (cmd == cmds[key].cmd) {
                        var textWithoutCommand = text.split(" ").slice(1).join(" ");
                        client.progbot.commands[key].call(message, textWithoutCommand, client);
                        message.delete();
                    }
                }
            })		
        } else if (text.startsWith(prefix)) {
            var cmd = text.split(" ", 1)[0].substring(1)
            var cmds = client.progbot.commands;

            Object.keys(cmds).forEach(function(key) {
                if (Array.isArray(cmds[key].cmd)) {
                    cmds[key].cmd.forEach(function(val) {
                        if (cmd == val) {
                            var textWithoutCommand = text.split(" ").slice(1).join(" ");
                            client.progbot.commands[key].call(message, textWithoutCommand, client);
                        }
                    })
                } else {
                    if (cmd == cmds[key].cmd) {
                        var textWithoutCommand = text.split(" ").slice(1).join(" ");
                        client.progbot.commands[key].call(message, textWithoutCommand, client);
                    }
                }
            })
        }
    });
};
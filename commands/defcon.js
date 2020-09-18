const Discord = require("discord.js");
const mlib = require("./../modules/mlib.js");

var defcons = [
    {
        text: "**COCKED PISTOL**\nMaximum readiness\nBot war is imminent",
        color: 0xffffff,
    },
    {
        text: "**FAST PACE**\nBot Forces ready to deploy and engage in less than 6 milliseconds.\nNext step to nuclear war",
        color: 0xeb1e1e,
    },
    {
        text: "**ROUND HOUSE**\nBot Forces ready to mobilize in 15 seconds\nIncrease in force readiness above that required for normal readiness",
        color: 0xf4eb42,
    },
    {
        text: "**DOUBLE TAKE**\nAbove normal readiness\nIncreased intelligence watch and strengthened security measures",
        color: 0x64ff64,
    },
    {
        text: "**FADE OUT**\nNormal readiness\nLowest state of readiness", 
        color: 0x0096ff,
    },
];

module.exports = {
    name: "DEFCON",
    cmd: "defcon",
    description: "DEFCON",
    call: function(message, text, client) {
        text = Number(text)

        if (text < 1 || text > 5) {
            return;
        }

        client.progbot.defcon = text;

        var defcon = client.progbot.defcon

        mlib.embed(message, {
            title: "DEFCON " + text,
            description: defcons[text-1].text,
            color: defcons[text-1].color,
        })

        var status = "online";
        if (defcon < 3 && defcon > 1) {
            console.log("3 or 2");

            status = "idle";
        } else if (defcon == 1) {
            console.log("set dnd");
            status = "dnd";
        }

        client.user.setPresence({
            activity: {
                name: (defcon < 5) ? ("DECON " + text) : client.progbot.defaultActivity,
            },
            status: status,
        })
    },
}
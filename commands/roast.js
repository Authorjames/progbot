const Discord = require("discord.js");
const mlib = require("./../modules/mlib.js");

var roasts = [    
    "%s is like the best olive oil in the world. Extra virgin.",
    "%s If laughter is a medicine, your face should be curing Africa by now.",
    "%s's family tree must be a cactus, everyone's a prick.",
    "Stupidity’s not a crime, so %s is free to go.",
    "What’s the difference between %s and a walrus? One has a moustache and smells of fish and the other is a walrus",
    "%s is proof that evolution can go in reverse.",
    "%s Is the type of guy to drink lavendar scented bleach",
    "Without the aid of a sub-atomical microscope %s wouldn't be able to know where to put the condom on.",
    "Let's start by adressing the elephant in the room... It's %s",
    "%s is such a loner even denizens don't hug them",
    "If %s was any more inbred he'd be a sandwich",
    "Now I know why everyone talks behind %s's back",
    "Whoever thinks suicide is pointless clearly hasn't met %s ",
    "%s's gene pool probably requires a little chlorine",
    "%s looks like the before part of a before & after fitness ad",
    "They should reintroduce the holocaust, but exclusively for %s ",
    "%s's face looks like it got set on fire and someone tried to put it out with a hammer",
    "%s's so ugly hello kitty said goodbye",
    "If %s was twice as smart as they are now, they'd still be dumb",
    "Remember when I asked for %s's opinion? Nor do I...",
    "%s's parents are living proof two wrongs don't make a right.",
    "Is %s always such an idiot, or does he just show off while on Discord..?",
    "I was pro life, until I met %s",
    "I was going to say retardation runs in %s's family, until I realised no one runs in their family",
    "%s looks like when someone presses random on the create a character screen",
    "Hey %s! You're like a good box map, we all joke about them being good, but you're actually hated in the community",
    "Did you get a new game %s? .. just kidding, as if anyone cares about you",
    "Hey %s what's that on your head... oh, it's just your ugly face nevermind",
    "As told by Jesus to %s, \"kys\"",
    "If I was an alien and I came to Earth to abduct %s, I would pick someone else because you already look like shit."
];

module.exports = {
    name: "Roast",
    cmd: "roast",
    description: "Roast someone of your choice, or not",
    call: function(message, text, client) { // <@!%d->
        var insult = roasts[Math.floor(Math.random()*roasts.length)];
        
        if (text.length > 0) {
            var output = insult.replace(/%s/g, text);

            mlib.notify(message, output);
        } else {
            var users = message.channel.members;
            var victims = [];

            users.each(function(user) {
                victims.push(user.user.id);
            })

            var victim = victims[Math.floor(Math.random()*victims.length)];
            var output = insult.replace(/%s/g, "<@!" + victim + ">");

            mlib.notify(message, output)
        }
    },
}
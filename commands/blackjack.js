/*

Card object: 
{
    value: The value of the card
    suit: The Suit of the card, ex: Spaces
    face: The Face of the card, ex: Jack
    card: The full text of the card, ex: Ace of Spades
}

*/

const Discord = require("discord.js");
const mlib = require("./../modules/mlib.js");

var suits = ["Spades", "Hearts", "Clubs", "Diamonds"]
var faces = ["Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "Queen", "King"]

//Generates new deack and returns it
function generateDeck() {
    var deck = [];

    for (var x = 0; x < suits.length; x++) {
        for (var y = 0; y < faces.length; y++) {
            deck.push({
                value: y+1,
                suit: suits[x],
                face: faces[y],
                card: faces[y] + " of " + suits[x],
            })
        }
    }
    
    return deck;
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}
// end of stackoverflow funktion

function shuffleDeck(deck) {
    return shuffle(deck);
}

function drawCard(deck) {
    return deck.pop();
}

// Calculates hand value based on a hand of values. Only input values. 
function handValue(hand) {
    var value1 = 0;
    var value2 = 0;

    console.log(hand + " hand!");
    
    hand.forEach(function(el) {
        if (el == 1) {
            if (value1+11 > 21) {
                value1 += 1; 
            } else {
                value1 += 11;
            }

            if (value2+11 > 21) {
                value2 += 1;
            } else {
                value2 += 1;
            }
        } else if (el > 9) {
            value1 += 10;
            value2 += 10;
        } else {
            value1 += el;
            value2 += el;
        }
    })
    
    return [value1, value2];
}

//Shows the hand as a string
function showHand(hand) {
    var handText = "";
    
    hand.forEach(function(val) {
        handText += val.card + " | ";
    })

    return handText;
}

function isBlackjack(handValues) {
    var value1 = handValues[0];
    var value2 = handValues[1];
    
    if (value1 == 1 || value2 == 1 ) {
        if (value1 + value2 >= 11) {
            return true;
        }
    }

    return false;
}

function getBestHand(arr) {
    var var1 = arr[0];
    var var2 = arr[1];

    if (var1 > var2) {
        if (var1 > 21) {
            return var2;
        }

        return var1;
    } else {
        if (var2 > 21) {
            return var1;
        }

        return var2;
    }
}

function gameResult(dealerValues, playerValues){
    var dealerValues = getBestHand(handValue(dealerValues));
    var playerValues = getBestHand(handValue(playerValues));

    if (dealerValues > 21) {
        return "player";
    } else if (playerValues > dealerValues){
        return "player";
    } else if (playerValues == dealerValues) {
        return "push";
    }

    return "dealer";
}

function generateEmbed(title, dealerCards, dealerValue, playerCards, playerValue, bet) {
    var embed = new Discord.MessageEmbed({
        author: {
            name: "Blackjack",
        },
        title: title,
        color: 0x00a6ff,
        fields: [
            {
                name: "Dealer's cards:",
                value: dealerCards,
                inline: false,
            },
            {
                name: "Dealer's value:",
                value: dealerValue,
                inline: false,
            },
            {
                name: "Cards:",
                value: playerCards,
                inline: false,
            },
            {
                name: "Value:",
                value: playerValue,
                inline: false,
            }, 
            {
                name: "Bet:",
                value: bet,
                inline: false,
            }, 
            {
                name: "Instructions:",
                value: "?bj draw - draw a card\n\?bj stand - stand your hand\n?bj double - double your card",
                inline: false,
            }
        ],
    });

    return embed;
};

function finishGame(client, message) {
    var currentGame = client.progbot.blackjackGames[message.author];

    var drawing = setInterval(function() {
        //console.log(currentGame);

        var card = drawCard(currentGame.deck)
        currentGame.dealerCards.push(card);
        currentGame.dealerCardValues.push(card.value);

        var dealerValue = currentGame.dealerCardValues;
        var playerValue = currentGame.playerCardValues;

        var dealerBestValue = getBestHand(handValue(dealerValue));
        var playerBestValue = getBestHand(handValue(playerValue));

        console.log(dealerBestValue)
        if (dealerBestValue >= 17) {
            clearInterval(drawing);

            if (dealerBestValue > 21) {
                var embed = generateEmbed(
                    "Dealer busted!",
                    showHand(currentGame.dealerCards),
                    dealerBestValue, 
                    showHand(currentGame.playerCards),
                    playerBestValue,
                    currentGame.playerBet
                )

                currentGame.gameEmbed.edit(embed);
            } else {
                var embed = generateEmbed(
                    "Dealer stands",
                    showHand(currentGame.dealerCards),
                    dealerBestValue, 
                    showHand(currentGame.playerCards),
                    playerBestValue,
                    currentGame.playerBet
                )

                currentGame.gameEmbed.edit(embed);
            }

            var result = gameResult(dealerValue, playerValue);

            if (result == "push") {
                currency.give(message.author, currentGame.playerBet);

                mlib.notify(message, "**Push!**\nThanks for playing!\nWin: " + currentGame.playerBet + "\nCurrent Balance: " + currency.getBalance(message.author));
            } else if (result == "player") {
                currency.give(message.author, currentGame.playerBet * 2);

                mlib.notify(message, "**You've won!**\nThanks for playing!\nWin: " + currentGame.playerBet * 2 + "\nCurrent Balance: " + currency.getBalance(message.author));
            } else {
                mlib.notify(message, "**You've lost!**\nThanks for playing!\nCurrent Balance: " + currency.getBalance(message.author));
            }

            client.progbot.blackjackGames[message.author] = undefined;
            
            return;
        }

        var embed = generateEmbed(
            "Dealer's turn..",
            showHand(currentGame.dealerCards),
            dealerBestValue, 
            showHand(currentGame.playerCards),
            playerBestValue,
            currentGame.playerBet
        )

        currentGame.gameEmbed.edit(embed);
    }, 1000);
}

module.exports = {
    name: "Blackjack",
    cmd: ["bj", "blackjack"],
    category: "Fun",
    description: "Blackjack!",
    call: function (message, text, client) {
        currency = client.progbot.currency;

        if (client.progbot.blackjackGames == undefined) {
            client.progbot.blackjackGames = [];
        }

        if (client.progbot.blackjackGames[message.author]) {
            var currentGame = client.progbot.blackjackGames[message.author];
            if (text == "draw") {
                message.delete();

                var card = drawCard(currentGame.deck)
            
                currentGame.playerCards.push(card);
                currentGame.playerCardValues.push(card.value);

                var bestHand = getBestHand(handValue(currentGame.playerCardValues));

                if (bestHand > 21) {
                    var embed = generateEmbed(
                        "You busted!",
                        showHand(currentGame.dealerCards),
                        getBestHand(handValue(currentGame.dealerCardValues)), 
                        showHand(currentGame.playerCards),
                        bestHand,
                        currentGame.playerBet
                    )

                    currentGame.gameEmbed.edit(embed);

                    mlib.notify(message, "Thanks for playing!");

                    client.progbot.blackjackGames[message.author] = undefined;

                    return
                }

                var embed = generateEmbed(
                    "Your move!",
                    showHand(currentGame.dealerCards),
                    getBestHand(handValue(currentGame.dealerCardValues)), 
                    showHand(currentGame.playerCards),
                    bestHand,
                    currentGame.playerBet
                )

                currentGame.gameEmbed.edit(embed);

                console.log(currentGame);
            } else if (text == "stand") {
                message.delete();
                finishGame(client, message);
            } else if (text == "double") {
                message.delete();
                if (!currency.canAfford(message.author, currentGame.playerBet)) {
                    mlib.error(message, "Insufficient balance to double!");

                    return;
                }

                currency.take(message.author, currentGame.playerBet);

                currentGame.playerBet *= 2;

                var card = drawCard(currentGame.deck)
                currentGame.playerCards.push(card);
                currentGame.playerCardValues.push(card.value);

                var bestHand = getBestHand(handValue(currentGame.playerCardValues));

                if (bestHand > 21) {
                    var embed = generateEmbed(
                        "You busted!",
                        showHand(currentGame.dealerCards),
                        getBestHand(handValue(currentGame.dealerCardValues)), 
                        showHand(currentGame.playerCards),
                        bestHand,
                        currentGame.playerBet
                    )
    
                    currentGame.gameEmbed.edit(embed);

                    mlib.notify(message, "Thanks for playing!\nCurrent Balance: " + currency.getBalance(message.author));

                    client.progbot.blackjackGames[message.author] = undefined;

                    return;
                } else {
                    var embed = generateEmbed(
                        "Doubled down!",
                        showHand(currentGame.dealerCards),
                        getBestHand(handValue(currentGame.dealerCardValues)), 
                        showHand(currentGame.playerCards),
                        bestHand,
                        currentGame.playerBet
                    )
    
                    currentGame.gameEmbed.edit(embed);
                };

                finishGame(client, message);
            } else if (text == "end") {
                message.delete();
                mlib.notify(message, "Game ended!");

                client.progbot.blackjackGames[message.author] = undefined;
            }

            return;
        }

        if (!currency.exists(message.author)) {
            currency.create(message.author, currency.defaultBalance);
        }

        if (!currency.canAfford(message.author, Number(text))) {
            mlib.error(message, "Insufficient balance");

            return;
        }

        if (text.length < 1) {
            mlib.error(message, "Please specify a bet!");

            return;
        }

        client.progbot.blackjackGames[message.author] = {
            deck: shuffle(generateDeck()),
            playerCards: [],
            dealerCards: [],
            playerCardValues: [],
            dealerCardValues: [],
        };

        var currentGame = client.progbot.blackjackGames[message.author];

        var card = drawCard(currentGame.deck)
        currentGame.dealerCards.push(card);
        currentGame.dealerCardValues.push(card.value);
        
        currentGame.playerBet = Number(text);

        currency.take(message.author, currentGame.playerBet);

        for (var x = 0; x < 2; x++) {
            var card = drawCard(currentGame.deck)
            currentGame.playerCards.push(card);
            currentGame.playerCardValues.push(card.value);

            console.log(currentGame);

            if (isBlackjack(currentGame.playerCardValues)) {
                mlib.embed(message, {
                    author: {
                        name: "Blackjack",
                    },
                    title: "Dealer's Card:",
                    description: showHand(currentGame.dealerCards),
                    fields: [
                        {
                            name: "Your cards:",
                            value: showHand(currentGame.playerCards),
                            inline: false,
                        },
                        {
                            name: "Your value:",
                            value: getBestHand(handValue(currentGame.playerCardValues)),
                            inline: false,
                        }, 
                        {
                            name: "Your bet:",
                            value: currentGame.playerBet,
                            inline: false,
                        }, 
                    ],
                })

                mlib.notify(message, "Blackjack!\nYou win " + currentGame.playerBet * 2.5 + "\nCurrent Balance: " + currency.getBalance(message.author));
                currency.give(message.author, currentGame.playerBet * 2.5);

                client.progbot.blackjackGames[message.author] = undefined;

                return;
            }
        }
        
        var embed = generateEmbed(
            "Your move!",
            showHand(currentGame.dealerCards),
            getBestHand(handValue(currentGame.dealerCardValues)), 
            showHand(currentGame.playerCards),
            getBestHand(handValue(currentGame.playerCardValues)),
            currentGame.playerBet
        )

        message.channel.send(embed).then(function(gameEmbed) {
            currentGame.gameEmbed = gameEmbed;
        });

        console.log(currentGame);
    }
}
const Discord = require("discord.js");

module.exports = function(client) {
    client.progbot.currency = {
        users: {},
        defaultBalance: 1000,

        create: function(user, startBalance) {
            this.users[user.id] = {
                user: user,
                balance: startBalance,
            }
        },

        exists: function(user) {
            var user = this.users[user.id]

            if (user == undefined) {
                return false;
            } else {
                return user;
            }
        },

        setBalance: function(user, amount) {
            var user = this.users[user.id]
            if (user == undefined || amount == undefined || amount < 0) {
                return;
            }

            user.balance = amount;
        },

        canAfford: function(user, amount) {
            var user = this.users[user.id]
            if (user == undefined || amount == undefined || amount < 0) {
                return;
            }

            return user.balance >= amount;
        },

        take: function(user, amount) {
            var user = this.users[user.id]
            if (user == undefined || amount == undefined || amount < 0) {
                return;
            }

            user.balance -= amount;
        },

        give: function(user, amount) {
            var user = this.users[user.id]
            if (user == undefined || amount == undefined || amount < 0) {
                return;
            }

            user.balance += amount;
        },

        getBalance: function(user) {
            var user = this.users[user.id]
            if (user == undefined) {
                return;
            }

            return user.balance;
        }
    };
}
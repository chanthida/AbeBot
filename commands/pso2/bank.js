const Commando = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class PSO2Commands extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "bank",
            group: "pso2",
            memberName: "bank",
            description: "bank test eiei"
        })
    }

    async run(msg){
        return msg.reply("", {embed: {
            color: 3447003,
            title: "Bank TEst",            
            description: "TEst",
            fields: [{
                name: "1",
                value: "test1",
                inline: true
            },
            {
                name: "2",
                value: "test2",
                inline: true
            },
            {
                name: "3",
                value: "test3",
                inline: true
            }]
        }});
    }
}
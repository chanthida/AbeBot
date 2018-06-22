const Commando = require('discord.js-commando');

module.exports = class PSO2Commands extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "dalerts",
            group: "pso2",
            memberName: "disablealerts",
            description: "ปิดการแจ้งเตือน EQ",
            examples: ["dalerts"],
            guildOnly: true
        })
    }

    hasPermission(msg) {
        return msg.member.hasPermission('MANAGE_GUILD');
    }

    async run(msg, args, client){
        this.client.provider.set(msg.guild, "alerts");
        return msg.reply(`${msg.author} ปิดการใช้งานการประกาศ EQ ล่วงหน้าเรียบร้อยแล้ว !!`);
    }
}
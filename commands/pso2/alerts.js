const Commando = require('discord.js-commando');

module.exports = class PSO2Commands extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "alerts",
            group: "pso2",
            memberName: "alerts",
            description: "เปิดการแจ้งเตือน EQ ตัวอย่างการใช้   alerts #ชื่อChannel เลขยาน",
            examples: ["alerts #general 5, 7, 9"],
            guildOnly: true,

            args: [
                {
                    key: 'channel',
                    label: 'channel',
                    prompt: 'channelไหนที่ต้องการให้ประกาศ? ?  ',
                    type: 'channel'
                },
                {
                    key: 'ships',
                    label: 'ship',
                    prompt: 'ต้องการเซ็ตให้ประกาศยานอะไร?  ? ',
                    validate: (args) => {
                        if (args >= 1 && args <= 10){
                            return true;
                        }
                    },
                    type: 'integer',
                    infinite: true
                },
            ]
        })
    }

    hasPermission(msg) {
        return msg.member.hasPermission('MANAGE_GUILD');
    }

    async run(msg, args, client){
        let channel = args.channel;
        let dict = {}
        dict["ships"] = args.ships;
        dict["channel"] = channel.id;

        this.client.provider.set(msg.guild, "alerts", dict);
        return msg.reply(`${msg.author} ตั้งค่าเรียบร้อย ! เปิดการใช้งานการประกาศ EQ ยาน ${args.ships.join(', ')} ล่วงหน้าที่ channel #${args.channel.name} ขอให้สนุกนะ !!   `);
    }
}
const Commando = require('discord.js-commando');
const Discord = require('discord.js')

module.exports = class PSO2Commands extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "pso2",
            group: "pso2",
            memberName: "pso2",
            description: "ข้อมูลทั่วไปของ pso2"
        })
    }

    async run(msg){
        return msg.reply("", {embed: {
            color: 3447003,
            title: "Phantasy Star Online 2",
            url: "http://pso2.jp",
            description: "ข้อมูลทั่วไปของ  PSO2.",
            fields: [{
                name: "Information",
                value: "[News](http://bumped.org/psublog)\n[Reddit](http://reddit.com/r/pso2)\n[Guides](http://fulldive.nu/)\n[PSO-World](http://pso-world.com)\n[Wiki](http://pso2.swiki.jp)\n[EQตามตาราง(เวลาไทย)](https://calendar.google.com/calendar/embed?src=pso2emgquest%40gmail.com&mode=agenda&ctz=Asia%2FBangkok)",
                inline: true
            },
            {
                name: "Downloads",
                value: "[English Launcher](http://arks-layer.com/)\n[Mods](https://goo.gl/M8PpWh)",
                inline: true
            },
            {
                name: "Bankkrutin Blog",
                value: "[อยากถ่ายภาพในเกมสวย ทำอย่างไร](http://bankkrutin.blogspot.com/2015/11/blog-post.html/)\n[วิธีล่าโมดูล](http://bankkrutin.blogspot.com/2016/12/pso2-modulator.html)\n[Nvidia Inspector ปรับกราฟฟิค](http://bankkrutin.blogspot.com/2015/09/nvidia-inspector-pso2.html)",
                inline: true
            }]
        }});
    }
}
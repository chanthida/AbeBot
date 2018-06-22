const Commando = require('discord.js-commando');
const request = require('request');

module.exports = class PSO2Commands extends Commando.Command {
    constructor(client) {
        super(client, {
            name: "item",
            group: "pso2",
            memberName: "item",
            description: "หาชื่อภาษาญี่ปุ่นของไอเทม",
            examples: ["item monomate"],

            args: [
                {
                    key: 'item',
                    label: 'item',
                    prompt: 'หาไอเทมอะไรอยู่หรอ ? :kissing_heart: ',
                    type: 'string'
                }
            ]
        })
    }

    async run(msg, args, client){
        let item = args.item;

        request(`http://db.kakia.org/item/search?name=${encodeURIComponent(item)}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let js = JSON.parse(body);

                try{
                    if (js.length > 0){
                        let embed = { embed: {
                            color: 3447003,
                            title: "ผลการค้นหาราคายาน4",
                            url: "http://kaze.rip",
                            fields: []
                        }}

                        js.slice(0, 4).forEach(function (item) {
                            if (item['PriceInfo'].length > 0 && item['PriceInfo'].find(x => x['Ship'] === 4)){
                                embed['embed']['fields'].push({name: item['EnName'], value: `**ราคา:** ${item['PriceInfo'].find(x => x['Ship'] === 4)['Price'].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}            **อัพเดทล่าสุด:** ${item['PriceInfo'].find(x => x['Ship'] === 4)['LastUpdated'].toString()}\n**JP:** ${item['JpName']}`})
                            }
                            else{
                                embed['embed']['fields'].push({name: item['EnName'], value: `**ราคา:**  - \n**JP:** ${item['JpName']}`})
                            }
                        })

                        msg.reply("", embed)
                    }
                    else{
                        msg.reply("หาไม่เจออ๊ะ ... ลองหาใหม่อีกรอบนะ   :joy: ")
                    }
                }
                catch(err){
                    console.log(err);
                }
            }
        });
    }
}
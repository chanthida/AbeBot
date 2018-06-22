const Commando = require('discord.js-commando');
const path = require('path');
const sqlite = require('sqlite')
const request = require('request');
const fs = require('fs');

if (!fs.existsSync('./config.json')) {
    fs.writeFileSync('./config.json', '{"token" : "", "prefix" : "!"}')
    console.log('WARNING: Config file is missing. Please edit "config.json" and re-run the script.')
    process.exit()
}

if (!fs.existsSync('./cache.json')){
    fs.writeFileSync('./cache.json', '{ "time" : "02-19-2017 19:05:04 +0000" }')
}

const config = require('./config.json')

const client = new Commando.Client({
    owner: '91387943679172608',
    commandPrefix: config.prefix
});

client
    // Events
    .on('error', console.error)
    .on('warn', console.warn)
    //.on('debug', console.log)
    .on('ready', () => {
        console.log(`-> อาเบะพร้อมใช้งาน! \n-> ล็อคอินเป็น ${client.user.username}#${client.user.discriminator} (${client.user.id})`)
        console.log(`-> Servers: ${client.guilds.array().length}`)
    })
    .on('commandError', (cmd, err) => {
        if(err instanceof Commando.FriendlyError) return;
        console.error('คำสั่งผิดพลาด ${cmd.groupID}:${cmd.memberName}', err)
    })

client.registry
    // Custom groups
    .registerGroups([
        ['pso2', 'คำสั่ง Phantasy Star Online 2'],
        ['general', 'คำสั่งทั่วไป General']
    ])

    // Register default groups, commands and argument types
    .registerDefaults()

    // Register every command in the ./commands/ directory
    .registerCommandsIn(path.join(__dirname, 'commands'))

client.setProvider(
    sqlite.open(path.join(__dirname, 'settings.sqlite3')).then(db => new Commando.SQLiteProvider(db))
).catch(console.error);


client.on('message', message => { 
  if (message.content.indexOf("อาเบะ") >= 0 && message.content.indexOf("มาไง") >= 0) {
    message.channel.sendMessage('ใจสั่งมา  <:abe1:404268377478004746>');  
  }else if(message.content == 'อาเบะ'){
	message.react('404268370414927872');	
  }else if (message.content.indexOf("อาเบะ") >= 0 && message.content.indexOf("ตูด") >= 0) {
    message.channel.sendMessage('<:abe2:404268343537696780> :point_right: :ok_hand: ');  
  }else if(message.content == 'ยาราไนก๊ะ'){
    message.channel.sendMessage('<:abe2:404268343537696780> :point_right: :ok_hand: ');  
  }else if(message.content == 'Yaranaika'){
    message.channel.sendMessage('<:abe2:404268343537696780> :point_right: :ok_hand: ');  
  }else if (message.content.indexOf("อาเบะ") >= 0 && message.content.indexOf("บาย") >= 0) {
    message.channel.sendMessage('บาย ข้าไปละ  <:abe1:404268377478004746>');  
  }else if (message.isMentioned(client.user)) {
		message.react('404268343537696780');
		message.reply('เรียกหาข้ามีเรื่องอันใด หากเรียกเล่นๆข้าจะอัดตูดเจ้า <:abe2:404268343537696780>');
  }
	

});

client.on('guildMemberAdd', member => {
	
 // Get a Channel by Name
 //message.guild.channels.find("name", "webhook");
	
 // 441912762730545153 = channel ID
 // client.channels.get('441912762730545153').sendMessage(`ยินดีต้อนรับ, ${member} เข้าสู่เซิฟเวอร์ อย่าลืมไปแนะนำตัวใน  #introduce นะจ๊ะตะเองงง <:abe4:404268370414927872>`);
    client.channels.find("name", "bot-mention").sendMessage(`ยินดีต้อนรับ, ${member} เข้าสู่เซิฟเวอร์ อย่าลืมไปแนะนำตัวใน  #introduce นะจ๊ะตะเองงง <:abe4:404268370414927872>`); 
  
});



// EQ alerts system
client.setInterval(function() {
    request('http://localhost:5000/eq', function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let response = JSON.parse(body);
            let cached = JSON.parse(fs.readFileSync("cache.json"));

            if (response[0]['time'] != cached["time"]){
                client.guilds.forEach(function(guild) {
                    if (client.provider.get(guild, "alerts")){
                        let eqs = []
                        let format = []
                        let settings = client.provider.get(guild, "alerts");

                        if (client.channels.get(settings['channel'])){
                            response[0]['eqs'].forEach(function(item) {
                                if (settings['ships'].includes(item['ship'])){
                                    eqs.push(item);
                                }
                            })

                            if (eqs.length > 0){
                                eqs.forEach(function(eq) {
                                    format.push(`\`\`ยาน  ${eq['ship']}:\`\` ${eq['name']}`);
                                });

                                let string = `**ประกาศแจ้งเตือน Emergency Quest **\n\n <:abe4:404268370414927872>  **อีก 40 นาที:**  <:abe4:404268370414927872>  \n${format.join('\n')}`
                                if (client.channels.get(settings['channel']).type == "text" && client.channels.get(settings['channel']).permissionsFor(client.user).hasPermission("SEND_MESSAGES")){
                                    client.channels.get(settings['channel']).sendMessage(string).catch(function(err) { console.log(err) });
                                }
                            }
                        }
                    }
                })

                fs.writeFileSync('cache.json', `{ "time" : "${response[0]['time']}" }`, function(err) {
                    if (err) return console.log(err);
                })
            }
        }
    })
}, 50000, client)

client.login(config.token);
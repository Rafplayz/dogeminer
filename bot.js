const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json')
var lootvar = 0
var luck = 0
var fs = require('fs');

// user status
client.on('ready', () => {
    const CommonPick = new Discord.Attachment('C:\\DiscordBot\\imgs\\Common Pickaxe.png')
    console.log(`Logged in (yay!) as ${client.user.tag}.`)
    client.user.setActivity(`Early testing! !dm help`);
    console.log("Servers:")
    client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type})`)
        })
    })
});
// message responses
client.on('message', msg => {
    const path = 'userinfo/' + msg.author.id + '.txt'
    if (msg.content == '!dm findloot') {
                         
        }
        
    else if (msg.content == '!dm luckup' && luck < 0.5 ) {
        
    }
    else if (msg.content == '<:mino:698929338908672040>' && msg.author.id == '207188318130012160') {
        if (msg.guild.id == '594189803424055525') {
            msg.channel.send('<:mino:698929338908672040>')
        }
    }
    else if (msg.content == 'up' && msg.author.id == '243151297950253067') {
        msg.channel.send('**Bot is UP! Commands are able to be run**')
    }
    else if (msg.content == '!dm mine') {
        try {
        if (fs.existsSync(`userinfo/${msg.author.id}.json`) == false) {
            msg.reply('You have not started. Do so with **!dm start**.')
        }
        else {
            let timeStamp = Math.round((new Date()).getTime() / 1000)
            let fileText = fs.readFileSync(`userinfo/${msg.author.id}.json`, 'utf8')
            let fileJSON = JSON.parse(fileText)
            if (timeStamp <= fileJSON.cooldown +  300) {
                let realCooldown = fileJSON.cooldown - timeStamp
                let usableCooldown = realCooldown - realCooldown
                let actualCooldown = usableCooldown - realCooldown
                msg.reply(`Your cooldown has not expired. Remaining time: ${actualCooldown}/300s.`)
            }
            else {
                let miner2bonus = fileJSON.miners2 * 5
                let finalCoins = fileJSON.balance + fileJSON.miners + miner2bonus
                fs.writeFileSync(`userinfo/${msg.author.id}.json`,`{"balance":${finalCoins},"miners":${fileJSON.miners},"miners2":${fileJSON.miners2},"cooldown":${timeStamp}}`)
                msg.channel.send({embed:{
                    title:"⛏️ Mining successful ⛏️",
                    color:233440,
                    fields:[{
                        name:"Coins Accumulated",
                        value:`+$${fileJSON.miners + miner2bonus}`,
                        inline:true,
                    },
                    {
                        name:"Pickaxe Shiny-ers",
                        value:fileJSON.miners,
                        inline:true,
                    },
                    {
                        inline:true,
                        name:"Handle Upgrades",
                        value:fileJSON.miners2,
                    }]
                }})
            }
            }
        }
    catch(err) {
        console.log("error with person with id " + msg.author.id)
        msg.reply("There was an error processing your request.")
    }
    }
    else if (msg.content == '!dm store') {
        msg.reply("purchase items with !dm buy. Items:\n**Pickaxe shiny-er**: *Make your pickaxe a little more gold.*\n**Handle Upgrade**: *Wood is very uncomfortable.*")
    }
    else if (msg.content == '!dm buy') {
        msg.reply("What item do you want to buy?\n1: **Pickaxe shiny-er (!dm buy 1)**, +1 to mining total, 2: **Handle Upgrade (!dm buy 2)**, +5 to mining total")
        let msgAuthor = msg.author.id;
    }
    else if (msg.content == '!dm buy') {
        if (fs.existsSync(`userinfo/${msg.author.id}`)) {
            let FileText = fs.readFileSync(`userinfo/${msgAuthor}`)
            let fileJSON = JSON.parse(FileText)
            if (fileJSON.balance >= 2) {
                msg.reply("Purchased one Pickaxe Shiny-er!")
                fs.writeFileSync(`userinfo/${msg.author.id}.json`,`{"balance":${fileJSON.balance - 2},"miners":${fileJSON.miners + 1},"miners2":${fileJSON.miners2},"cooldown":${fileJSON.cooldown}}`)
            }
            else {
            msg.reply("You do not have enough coins. Required coins: $2.")
            }
        }
    }
    else if (msg.content == '!dm help') {
        msg.channel.send(`<@${msg.author.id}>, the commands are:\n**!dm mine\n!dm start** (do this first).`)
    }
    else if (msg.content == '!dm stats') {
    }
    else if (msg.content == '!dm start') {
        msg.reply('Working..')
        try {
            let startFile = fs.writeFile('userinfo/' + msg.author.id + '.json', '{"balance":0,"miners":1    ,"miners2":0}', (err) => {
                if (err) throw err;
                console.log(`userinfo/${msg.author.id} file created by user ` + msg.author.username +' \n')
                msg.reply("Finished! You've started with 0!")
            })
        }
        catch(err) {
        msg.reply("There was an error processing your request.")
        console.log("error from " + msg.author.id)
    }
    }
});
client.login(auth.token);
/*
here is how i envisioned the Dogeminer Bot:

Every 6 hours you have the chance to “!dm mine” that triggers an algorithm that rewards you with 1 to 100 dogeminercoins (avoid calling them dogecoins so they don’t get mixed up with the actual stuff being tipped in another channel). It gives1-10 coins most frequently, 11-50 less frequently and 50-100 somewhat rarely. On an extremely rare occasion you might get a dogeminer diamond.
Every 12 hours you have the chance to “!dm findloot” that give a chance at finding a pick axe or fortune, which in turn affects the mining algorithm to increase the likelihood of getting more dogeminercoins. If the algorithm returns a “duplicate” (an item that the player has already found) then the player “found nothing” that time.

Every 24 hours you have the chance to “!dm luckup” which not only increases your chance of mining more dogeminercoins, but will also adjust the findloot algorithm so that if it would have rewarded a duplicate, there is first a 10% chance of returning a non duplicate, then as more and more luck is amassed, the chance of getting a non-duplicate increases.

At ANY TIME you can “!dm store” which allows you to purchase helpers. Helpers might increase your chance of getting more dogeminercoins, might temporally lower the command rate limit, some might permanently lower the command rate limit, some might increase your chance of finding loot, some might increase your chance of lucking up. The helpers cost is based on their value and increase as you amass more helpers (just like in the regular game). BUT if you are lucky enough to get a dogeminer diamond, you can purchase ANY helper, regardless of cost (because 1D=1D, lol).

Bot can also be made interactive, so you can gif fellow players dogeminercoins and diamonds, found loot, and luck.

You can also ask for “!dm stats” anytime which will give the following info:
Dogeminercoins (number of current coins you have)
Loot (X of XX pickaxes / X of XX fortunes)
Luck (% increase of your luck)
Karma (number of gifts you’ve given)
Helpers (type and number of helpers)
i can help with graphics and pictures, both custom emojis and images
*/

const Discord = require('discord.js');
const client = new Discord.Client();
const auth = require('./auth.json')
var lootvar = 0
var luck = 0
var fs = require('fs');
var readline = require('readline');

// user status
client.on('ready', () => {
    const CommonPick = new Discord.Attachment('C:\DiscordBot\imgs\Common Pickaxe.png')
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
    const rl = readline.createInterface({
            input: fs.createReadStream(path)
    });
    if (msg.content == '!dm findloot') {
                         
        }
        
    else if (msg.content == '!dm luckup' && luck < 0.5 ) {
        
    }
    else if (msg.content == '!dm mine') {
        msg.reply("Working....")
        let fileText = fs.readFileSync(`userinfo/${msg.author.id}`)
        fileText.split("\n")
        let fileNumber = parseInt(fileText, 10)
        let playerCoins = fileNumber[0]
        let shibeBonus = fileNumber[1]
        let shibe2Amount = fileNumber[2]
        let shibe2Bonus = fileNumber[2] * 4
        let newPlayerCoins = playerCoins + shibeBonus + shibe2Bonus
        msg.reply('Your new coin amount is: ' + newPlayerCoins)
        fs.writeFileSync('userinfo/' + msg.author.id, `${fileText[0]}\n${fileText[1]}\n${fileText[2]}`)
    }
    else if (msg.content == '!dm help') {
        
    }
    else if (msg.content == '!dm stats') {
        
    }
    else if (msg.content == '!dm start') {
        msg.reply('Working..')
        let startFile = fs.writeFile('userinfo/' + msg.author.id + '.txt', '0\n0\n0', (err) => {
            if (err) throw err;
            console.log(`userinfo/${msg.author.id} file created by user ` + msg.author.username)
            msg.reply("Finished! You've started with 0 Emmetcoin!")
        })
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

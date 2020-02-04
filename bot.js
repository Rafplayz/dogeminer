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
    var path = 'userinfo/' + msg.author.id + '.txt'
    var rl = readline.createInterface({
            input: fs.createReadStream(path)
    });
    const picksMax = '5'
    const lootMax = '5'
    var cntr = 0
    function newLineSplitter(str) { 
      
    // Function to split string 
        var string = str.split("\n"); 
      
        return string; 
    } 
    if (msg.content == '!dm findloot') {
        if(lootvar == 0) {
            const CommonPick = new Discord.Attachment('C:\DiscordBot\Common_Pickaxe.png')
            msg.reply('You have found Common Pickaxe!\n*Standard pickaxe, issued to all Shibe Miners circa 2018.*\n:pick:: 1/' + picksMax + ' :gem:: 0/' +  lootMax)
            msg.reply(CommonPick)
            lootvar = lootvar + 1
                         
        }
        else if(lootvar == 1 && Math.random() + luck < 0.8) {
            msg.reply('You have found Rare Pickaxe!\n*It is hard to explain, but it feels... better?*\nYou have found 2 out of 5 pieces of loot!')
            lootvar = lootvar + 1
        }
        else if(lootvar == 1 && Math.random() + luck > 0.8) {
            msg.reply('Sorry, you did not find anything this time! :(')
        }
        else if(lootvar == 2 && Math.random() + luck < 0.7) {
            msg.reply('You have found Glow Stick!\n*Somehow, it is easier to mine with this?*\nYou have found 3 out of 5 pieces of loot!')
            lootvar = lootvar + 1
        }
        else if(lootvar == 2 && Math.random() + luck > 0.7) {
            msg.reply('Sorry, you did not find anything this time! :(')
        }
        else {
            msg.reply('Sorry, the dev has not created any other loot pieces :(')
            
        }
        
    }
    else if (msg.content == '!dm luckup' && luck < 0.5 ) {
        msg.reply('You have increased luck by 1 for the whole server!') 
        luck = luck + 0.01
    }
    else if (msg.content == '!dm mine') {
        var lines = fs.readFileSync(`userinfo/${msg.author.id}` + '.txt')
        var newLines = newLineSplitter(lines)
        newLines.forEach(newNewLines =>{
            Number(newNewLines)
        })
        newNewLines[0]++;
        fs.writeFileSync(`userinfo/${msg.author.id}` + '.txt', newNewLines[0] + "\n" + newNewLines[1])
        console.log('File rewritten @ userinfo/' + msg.author.id)
        msg.reply(`Mined successfully!\nCoins: ${newCoins}\nShibe Miners: ${Helper1}`)
    }
    else if (msg.content == '!dm help') {
        msg.reply('the *currently working* commands are:\n**FIRSTLY, START WITH !dm start**, other commands are:\n!dm mine,\n!dm help\n!dm findloot\nThe developer is actively adding new commands everyday, so check back!')
    }
    else if (msg.content == '!dm stats') {
        msg.reply("Fetching stats...")
        rl.on('line', function(line) {
            if (cntr++ == 0) {
                console.log(`Stats read in userinfo/${msg.author.id} by ${msg.author.username}`)
                msg.reply(`Found stats!\n(coin name here) count: ${line}`)
            }
        });
    }
    else if (msg.content == '!dm start') {
        msg.reply('Working..')
        let startFile = fs.writeFile('userinfo/' + msg.author.id + '.txt', '0\n0\n0', (err) => {
            if (err) throw err;
            console.log(`userinfo/${msg.author.id} file created by user ` + msg.author.username)
            msg.reply("Finished! You've started with 0 (coin name here)!")
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
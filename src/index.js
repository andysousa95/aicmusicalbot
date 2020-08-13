const Discord = require('discord.js');
const bot = new Discord.Client();
const dotenv = require('dotenv');
const fs = require("fs");
const path = require("path");

dotenv.config();
bot.commands = new Discord.Collection();
bot.queues = new Map();

const commandFiles = fs
.readdirSync(path.join(__dirname, "/commands"))
.filter((filename) => filename.endsWith(".js"));

for(var filename of commandFiles) {
    const command = require(`./commands/${filename}`);

    bot.commands.set(command.name,command);
}

bot.on("ready", (message) => {
    console.log(`${bot.user.username} entrou na quadra.`);
});

bot.on("message", (message) => {
    if(!message.content.startsWith(process.env.prefix || message.author.bot)) return;
    const args = message.content.slice(process.env.prefix.length).split(" ");
    const command = args.shift();

    try{
        bot.commands.get(command).execute(bot, message, args);
    }catch(e) {
        return message.reply('ainda não aprendi esse comando.');
    }   
});


bot.login(process.env.TOKEN);

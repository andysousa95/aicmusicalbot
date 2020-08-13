const tocaMusica = require("./play").tocaMusica;

const execute = (bot, message, args) => {
    const queue = bot.queues.get(message.guild.id);
    if(!queue) {
        return message.reply("não existe nenhuma música tocando.");
    }
    queue.songs.shift();
    bot.queues.set(message.guild.id, queue);
    tocaMusica(bot, message, queue.songs[0]);
}

module.exports ={
    name: "skip",
    help: "Pula para a próxima música.",
    execute,
};
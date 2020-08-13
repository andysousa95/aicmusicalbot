const execute = (bot, message, args) => {
    const queue = bot.queues.get(message.guild.id);
    if(!queue) {
        return message.reply("não existe nenhuma música tocando.");
    }
    queue.dispatcher.pause();
}

module.exports ={
    name: "pause",
    help: "Pausa a música atual.",
    execute,
};
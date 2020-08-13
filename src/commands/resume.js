const execute = (bot, message, args) => {
    const queue = bot.queues.get(message.guild.id);
    if(!queue) {
        return message.reply("não existe nenhuma música tocando.");
    }
    queue.dispatcher.resume();
}

module.exports ={
    name: "resume",
    help: "Continua tocando a música de onde ela parou.",
    execute,
};
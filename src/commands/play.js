const search = require("yt-search");
const ytdl = require("ytdl-core-discord");

const execute = async(bot, message, args) => {
    const s = args.join(" ");
    try{
        search(s, (err, result) => {
            if(err) {
                throw err;
            } else if (result && result.videos.length > 0) {
                   const song = result.videos[0];
                   const queue = bot.queues.get(message.guild.id);
                   if(queue) {
                       queue.songs.push(song);
                       bot.queues.set(message.guild.id, queue);
                   } else tocaMusica(bot, message, song);
            } else {
                return message.reply("desculpe não encontrei o que você queria.")
            }
        })

    } catch(e) {
        console.error(e);
    }
};

const tocaMusica = async (bot, message, song) => {
    let queue = bot.queues.get(message.member.guild.id);
    if (!song) {
      if (queue) {
        queue.connection.disconnect();
        return bot.queues.delete(message.member.guild.id);
      }
    }
    if (!message.member.voice.channel) {
      return msg.reply(
        "você precisa estar em um canal de voz para ouvir a música."
      );
    }
    if (!queue) {
      const conexao = await message.member.voice.channel.join();
      queue = {
        volume: 10,
        connection: conexao,
        dispatcher: null,
        songs: [song],
      };
    }
    queue.dispatcher = await queue.connection.play(
      await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly" }),
      {
        type: "opus",
      }
    );
    queue.dispatcher.on("finish", () => {
      queue.songs.shift();
      tocaMusica(bot, message, queue.songs[0]);
    });
    bot.queues.set(message.member.guild.id, queue);
  };

module.exports = {
    name: "play",
    help: "Reproduz uma música desejada no canal em que o usuário se encontra.",
    execute,
    tocaMusica,
}
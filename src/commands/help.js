const execute = (bot, message, args) => {
    let string = "== AJUDA ==/n";
    bot.commands.array.forEach(command => {
      if(command.help) {
          string += `${command.name}: ${command.help}\n`;
      }  
    });

    return message.channel.send(string);
};


module.exports = {
    name: "help",
    execute
}
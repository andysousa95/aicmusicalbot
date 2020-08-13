const execute = (bot, message, args) => {
    return message.reply("Hello");
}

module.exports ={
    name: "hello",
    help: "Hello World",
    execute,
}
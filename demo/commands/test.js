const { CommandBuilder } = require("../../src");

CommandBuilder.$N`test`.$M((message) => {
    message.reply(`pong 🏓`);
});
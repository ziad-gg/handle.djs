const { Message } = require('discord.js');
const Application = require('../structure/Application.js');

/**
 * 
 * @param {Message} message 
 * @param {typeof Application} app
 */
module.exports = async function (message, app) {

    if (!message.content.startsWith(app.prefix)) return;
    if (!app.messages.bots && message.author.bot) return;

    const args = message.content.slice(app.prefix.length).split(' ');
    const commandName = args.shift().toLowerCase();

    const command = app.commands.get(commandName);
    if (!command || (command.owners && !app.owners?.includes?.(message.author.id))) return;

    command.MessageExecution(message);
};
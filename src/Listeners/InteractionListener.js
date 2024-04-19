const { CommandInteraction } = require('discord.js');
const Application = require('../structure/Application');
/**
 * 
 * @param {CommandInteraction} interaction 
 * @param {typeof Application} app 
 */
module.exports = async function (interaction, app) {
    if (interaction.isChatInputCommand())  {
        if (!app.messages.bots && interaction.user.bot) return;

        const commandName = interaction.commandName.toLowerCase();

        const command = app.commands.get(commandName);
        if (!command || (command.owners && !app.owners?.includes?.(interaction.user.id))) return;

        if (!command.InteractionExecution) return;
        command.InteractionExecution(interaction);
    } else if (interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
        const commandName = interaction.commandName.toLowerCase();

        const command = app.commands.get(commandName);
        if (!command || (command.owners && !app.owners?.includes?.(interaction.user.id))) return;

        if (!command.ContextMenuExecution) return;
        command.ContextMenuExecution(interaction);
    }
};
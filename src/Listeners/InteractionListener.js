const { ChatInputCommandInteraction, MessageComponentInteraction } = require('discord.js');
const Application = require('../structure/Application');

/**
 * 
 * @param {ChatInputCommandInteraction} interaction 
 * @param {typeof Application} app 
 */
module.exports = async function (interaction, app) {
    if (interaction.isChatInputCommand()) {
        if (!app.messages.bots && interaction.user.bot) return;

        const commandName = interaction.commandName.toLowerCase();

        const command = app.commands.get(commandName);
        if (!command || (command.owners && !app.owners?.includes?.(interaction.user.id))) return;

        if (!command.InteractionExecution) return;

        //#region Validation
        const ValidationData = app.validations;

        if (Array.from(ValidationData.keys()).length > 0) {
            const validations = Array.from(ValidationData.values()).sort((a, b) => a.order - b.order).filter(e => e.type.includes('message'))
            let x = true;

            for (const validation_step of validations) {
                if (!x) break;

                await new Promise(async (res) => {
                    const validation_call = validation_step.validation;

                    const next = res;
                    const end = () => { x = false; res(); };

                    validation_call({ interaction }, next, end);
                });
            };

            x && command.InteractionExecution(interaction);
        } else {
            command.InteractionExecution(interaction);
        };
        //#endregion

    } else if (interaction.isUserContextMenuCommand() || interaction.isMessageContextMenuCommand()) {
        const commandName = interaction.commandName.toLowerCase();
        const command = app.commands.get(commandName);
        if (!command || (command.owners && !app.owners?.includes?.(interaction.user.id))) return;
        if (!command.ContextMenuExecution) return;
        command.ContextMenuExecution(interaction); 

    } else if (interaction.isButton()) {
        const commandName = interaction.customId.toLowerCase();
        const command = app.commands.get(commandName.split('-')[0]);
        if (!command || (command.owners && !app.owners?.includes?.(interaction.user.id))) return;
        if (!command.ButtonInteractionExecution) return;
        command.ButtonInteractionExecution(interaction); 
    }
};
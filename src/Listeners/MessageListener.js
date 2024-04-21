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

    if (!command.MessageExecution) return;

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

                validation_call({ message }, next, end);
            });
        };

        x && command.MessageExecution(message);
    } else {
        command.MessageExecution(message);
    };
    //#endregion
};
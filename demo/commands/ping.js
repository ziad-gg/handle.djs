const { Message, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { CommandBuilder } = require('../../src');

CommandBuilder.$N`ping`
    .$D('Pong Reply')
    .$S(new SlashCommandBuilder())
    .$CM(new ContextMenuCommandBuilder().setType(ApplicationCommandType.Message))
    .$M(Execution)
    .$I(Execution)
    .$CME(Execution)

/**
 * 
 * @param {Message} message 
 */
async function Execution(message) {
    console.log(message);
};
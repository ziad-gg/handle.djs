const { Message, SlashCommandBuilder, ContextMenuCommandBuilder, ApplicationCommandType } = require('discord.js');
const { CommandBuilder } = require('../../src');

CommandBuilder.$N`ping`
    .$D('Pong Reply')
    .$S(new SlashCommandBuilder())
    .$CM(new ContextMenuCommandBuilder().setType(ApplicationCommandType.Message))
    .$M(Execution)
    .$I(Execution)
    .$CME(Execution)
    .$B(Execution)
    .$L('label me')
    .$C(5000)

/**
 * 
 * @param {Message} message 
 */
async function Execution(message) {
    message.replyNoMention(`pong 🏓`, 1000);
};
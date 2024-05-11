const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");
const { CommandBuilder } = require("../../src");

CommandBuilder.$N`test`.$M((message) => {
    const btn = new ButtonBuilder().setCustomId('test-man').setLabel('test').setStyle(ButtonStyle.Danger)
    message.reply({ components: [new ActionRowBuilder().addComponents(btn)] });
}).$B((interaction) => {
    interaction.reply(interaction.customId)
})
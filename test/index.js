const { Client, Events, SlashCommandBuilder, ContextMenuCommandBuilder } = require('discord.js');
const { Application, utils, EventBuilder, CommandBuilder } = require('handler.djs');

const client = new Client({
    intents: utils.Intents
});

new Application(client);

EventBuilder.$N`${Events.ClientReady}`.$E((client) => console.log(client.user.tag)).$O().$L();

CommandBuilder.$N`ping`.$D('reply with pong').$M((message) => {
    message.replyNoMention('pong (message) 🏓');
}).$S(new SlashCommandBuilder()).$I((interaction) => {
    interaction.replyNoMention('pong (interaction) 🏓');
}).$CM(new ContextMenuCommandBuilder()).$CME((interaction) => {
    interaction.replyNoMention('pong (context menu) 🏓');
}).$B((interaction) => {
    interaction.reply('pong (Button) 🏓');
});

CommandBuilder.$N`clear`.$D('Clear Chat').$M(async (message) => {
    const amount = message.args(0);
    if (!amount) return message.replyNoMention('Please provide an amount of messages to delete.');

    await message.channel.bulkDelete(amount);
    await message.sendTimedMessage('done 🗑️', 1500);
}).$S(new SlashCommandBuilder()).$I(async (interaction) => {
    await interaction.channel.bulkDelete(10);
    await interaction.sendTimedMessage('done 🗑️', 1500);
}).$CM(new ContextMenuCommandBuilder()).$CME(async (interaction) => {
    await interaction.channel.bulkDelete(10);
    await interaction.sendTimedMessage('done 🗑️', 1500);
});

CommandBuilder.$N`hello`.$M(async (message) => {
    const id = message.args(0) && utils.toDiscordId(message.args(0));

    if (!id) return message.replyNoMention(`Invalid User Id`);
    if (id == client.user.id) return message.replyNoMention(`I Cannot Send Message My Self`);

    const user = await message.getUser(id, 'guild-fetch');
    if (!user) return message.replyNoMention(`User Not Found`);

    await user.send(`Hello From ${message.author.username}`);
    await message.sendTimedMessage(`Sent Hello To ${user.username}`, 1500);
});

client.Application.build();

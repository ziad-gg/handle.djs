const { Client } = require('discord.js');
const { Application } = require('../src');

const client = new Client({
    intents: 3276799
});

new Application(client, {
    commands: __dirname.concat('/commands'),
    events: __dirname.concat('/events'),
    definedValidations: true
})

// client.Application.setCooldown({
//     message: "**{UserMention}**, Cool down (**{counter}** left)",
//     reply: false,
//     Mdelete: 1500
// });

client.Application.build();

require('dotenv');
client.login(process.env.TOKEN);
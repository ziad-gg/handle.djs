const { Client } = require('discord.js');
const { Application } = require('../src');

const client = new Client({
    intents: 3276799
});

new Application(client, {
    commands: __dirname.concat('/commands'),
    events: __dirname.concat('/events'),
    // validations: __dirname.concat('/validations'),
    owners: ['1222336578651689101'],
});

client.Application.build();

require('dotenv');
client.login(process.env.TOKEN)
const { Client, Events } = require('discord.js');
const { EventBuilder } = require('../../src');

EventBuilder.$N`reload`.$E(Execution).$O();

/**
 * 
 * @param {Client} client 
 */
function Execution(data) {
    console.log(`Successfully reloaded ${data.length} application (/) commands.`);
};
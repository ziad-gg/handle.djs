const { Client, Events } = require('discord.js');
const { EventBuilder } = require('../../src');

EventBuilder.$N`${Events.ClientReady}`.$E(Execution).$O().$L();

/**
 * 
 * @param {Client} client 
 */
function Execution(client) {
    console.log(client.user.tag);
};
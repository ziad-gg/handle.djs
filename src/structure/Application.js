const { Client, Message, CommandInteraction, Events } = require('discord.js');
const Utils = require('../utils/readPath.js');
const MessageListener = require('../Listeners/MessageListener.js');

class Application {

    /** @type {Map<string, {MessageExecution?: (message: Message) => Promise, description?: string, owners: boolean, cooldown: number, InteractionExecution: (interaction: CommandInteraction) => Promise }>} @private */
    static commands = new Map();
    /** @type {Array<number>} @private */
    static owners = [];
    /** @type {string} @private */
    static prefix = '!';
    /** @type {{ bots: boolean }} @private */
    static messages = null;
    /** @type {Map<string, { call: Function, once: boolean }> @private} */
    static events = new Map();

    /**
     * 
     * @param {Client} client 
     * @param {{ 
     * commands?: string, 
     * events?: string, 
     * validations?: string, 
     * prefix?: string, 
     * owners?: Array<number>, 
     * messages?: { bots: boolean }
     *  }} data 
     */
    constructor(client, data) {
        this.client = client;
        this.data = data;

        this.client.Application = this;

        Application.prefix = '!';
        Application.owners = [];
        Application.messages = { bots: false };
    };

    build() {
        const data = this.data;

        if (data.commands) Application.load(data.commands);
        if (data.events) Application.load(data.events);
        if (data.validations) Application.load(data.validations);

        if (data.prefix) Application.prefix = data.prefix;
        if (data.owners) Application.owners = data.owners;

        if (data.messages?.bots && typeof data.messages.bots == 'boolean') Application.messages.bots = data.messages.bots;

        this.client.on('messageCreate', (message) => MessageListener(message, Application));

        Application.events.forEach((value, key) => {
            if ((!Events[key] && !Object.values(Events).includes(key)) || typeof value.call !== 'function') return;

            const event = Events[key] || Object.values(Events).find(where => where == key);
            if (!value.call || !event) Application.events.delete(key);

            value.once ? this.client.once(event, value.call) : this.client.on(event, value.call);
            Application.events.delete(key);
        });

        this.client.Application = Application;
    };

    /** @private */
    static load(path) {
        const data = Utils(path).filter(e => e.endsWith('s'));
        data.map(e => require(e));
        return this;
    };
};

module.exports = Application;
const {
    Routes,
    GatewayDispatchEvents,
    /* Types */
    Client,
    Message,
    SlashCommandBuilder,
    ContextMenuCommandBuilder,
    ChatInputCommandInteraction,
    UserContextMenuCommandInteraction,
    MessageContextMenuCommandInteraction,
    ButtonInteraction
} = require('discord.js');

const Utils = require('../utils/readPath.js');

const MessageListener = require('../Listeners/MessageListener.js');
const InteractionListener = require('../Listeners/InteractionListener.js');

class Application {
    /**
     * @type {Map<string, {
     *  MessageExecution?: (message: Message) => Promise,
     *  InteractionExecution?: (interaction: ChatInputCommandInteraction) => Promise,
     *  ContextMenuExecution?: (interaction: ChatInputCommandInteraction | UserContextMenuCommandInteraction | MessageContextMenuCommandInteraction) => Promise,
     *  MessageContextMenuCommandBuilder?: ContextMenuCommandBuilder
     *  UserContextMenuCommandBuilder?: ContextMenuCommandBuilder
     *  ButtonInteractionExecution?: (interaction: ButtonInteraction) => any
     *  builder?: SlashCommandBuilder,
     *  owners?: boolean,
     *  cooldown?: number,
     *  description?: string,
     *  label?: string,
     * }>}
     */
    static commands = new Map();
    /** @type {Array<number>} @private */
    static owners = [];
    /** @type {string} @private */
    static prefix = '!';
    /** @type {{ bots: boolean }} @private */
    static messages = null;
    /** @type {Set<{ name: string, call: Function, once: boolean }>}   */
    static events = new Set();
    /** @type {Set<{ order: number, validation: () => {}, type: "message" | "interaction" }>} @private */
    static validations = new Set();

    /**
     * 
     * @param {Client} client 
     * @param {{ 
     * commands?: string, 
     * events?: string, 
     * validations?: string, 
     * prefix?: string, 
     * owners?: Array<number>, 
     * applicationCommands: boolean,
     * messages?: { bots: boolean }
     *  }} data 
     */
    constructor(client, data) {
        this.client = client;
        this.data = data ?? {};
        this.store = new Map();

        this.client.Application = this;

        Application.prefix = '!';
        Application.owners = [];
        Application.messages = { bots: false };
    };

    build() {
        const data = this.data;

        data.applicationCommands != false && this.client.ws.once(GatewayDispatchEvents.Ready, async (client) => {
            const commands = [];

            Application.commands.forEach((value, key) => {
                if (value.builder) commands.push(value.builder);
                if (value.MessageContextMenuCommandBuilder) commands.push(value.MessageContextMenuCommandBuilder);
                if (value.UserContextMenuCommandBuilder) commands.push(value.UserContextMenuCommandBuilder);
            });

            if (commands.length > 0) {
                const request = await this.client.rest.put(
                    Routes.applicationCommands(client.user.id),
                    { body: commands }
                );

                this.client.emit('reload', request);
            };
        });

        if (data.commands) Application.load(data.commands);
        if (data.events) Application.load(data.events);
        if (data.validations) Application.load(data.validations);

        if (data.prefix) Application.prefix = data.prefix;
        if (data.owners) Application.owners = data.owners;

        if (data.messages?.bots && typeof data.messages.bots == 'boolean') Application.messages.bots = data.messages.bots;

        this.client.on('messageCreate', (message) => MessageListener(message, Application));
        this.client.on('interactionCreate', (interaction) => InteractionListener(interaction, Application));

        Application.events.forEach((value) => {
            if (value.call && typeof value.call == 'function' && value.name) {
                value.once ? this.client.once(value.name, value.call) : this.client.on(value.name, value.call);
            };
        });

        this.client.Application = Application;
    };

    /** @private */
    static load(path) {
        const data = Utils(path).filter(e => e.endsWith('s'));
        data.map(e => require(e));
        return this;
    };

    setData(data = {}) {
        if (typeof data !== "object") throw new Error('data must be an object');

        Object.keys(data).forEach(key => {
            this.store.set(key, data[key]);
        });
    };

    getData(key) {
        return this.store.get(key);
    };
};

module.exports = Application;
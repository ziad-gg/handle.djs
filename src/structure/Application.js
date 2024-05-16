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
    /** @type {Set<{ name: string, call: Function, once: boolean }>} @private  */
    static events = new Set();
    /** @type {Set<{ order: number, validation: () => {}, type: "message" | "interaction" }>} @private */
    static validations = new Set();
    /** @type {Map<string, { replied: boolean, time: number }>} */
    static cooldowns = new Map();

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
     * messages?: { bots: boolean },
     * definedValidations?: boolean
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
        Application.cooldownConfig = {};
    };

    build() {
        const data = this.data;

        if (data.definedValidations) require('../scripts/cooldown.js');

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

    setPrefix(prefix = "!") {
        if (typeof prefix !== "string") this.prefix = "!"
        else this.prefix = prefix;
        return this;
    };

    //#region cooldown
    setCooldown({
        message = "**{Username}**, Cool down (**{counter}** left)",
        reply = true,
        long = true,
        Mdelete = null,
        EphemeralReply = true,
        once = false
    }) {

        if (typeof message !== "string") throw new Error("Content must be an String only");
        if (typeof reply !== "boolean") throw new Error("reply must be an Boolean only");
        if (typeof long !== "boolean") throw new Error("long must be an Boolean only");
        if (typeof once !== "boolean") throw new Error("once option must be an Boolean only");
        if (typeof EphemeralReply !== "boolean") throw new Error("EphemeralReply must be an Boolean only");
        if (Mdelete && typeof Mdelete !== "number") throw new Error("Mdelete must be a number");

        Application.cooldownConfig.message = message;
        Application.cooldownConfig.long = long;
        Application.cooldownConfig.reply = reply;
        Application.cooldownConfig.Mdelete = Mdelete;
        Application.cooldownConfig.EphemeralReply = EphemeralReply;
        Application.cooldownConfig.once = once;

        return Application;
    };
    //#endregion cooldown
};

module.exports = Application;
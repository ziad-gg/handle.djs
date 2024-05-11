const { SlashCommandBuilder, ContextMenuCommandBuilder, ChatInputCommandInteraction, ApplicationCommandType } = require('discord.js');
const Application = require('./Application.js');

class CommandBuilder {
    /** @private */
    static $ = '';

    /**
     * 
     * @param {TemplateStringsArray} _$ 
     * @description setName(name: string)
     * @returns {typeof CommandBuilder}
     */
    static $N(_$) {
        Application.commands.set(arguments[0][0], {});
        this.$ = arguments[0][0].toLowerCase();

        return this;
    };

    /**
     * 
     * @param {(message: Message) => (Promise<any> | any)} call
     * @description setMessageExecution() 
     * @returns {typeof CommandBuilder}
     */
    static $M(call) {
        const command = Application.commands.get(this.$);

        if (!this.$ || !command) throw new Error('Empty Command');

        command.MessageExecution = call;
        Application.commands.set(this.$, command);

        return this;
    };

    /**
     * 
     * @param {(message: import('discord.js').Interaction) => (Promise<any> | any)} call 
     * @description setInteractionExecution() 
     * @returns {typeof CommandBuilder}
     */
    static $I(call) {
        const command = Application.commands.get(this.$);

        if (!this.$ || !command) throw new Error('Empty Command');

        command.InteractionExecution = call;
        Application.commands.set(this.$, command);

        return this;
    };

    /**
     * 
     * @param {number} cooldown 
     * @description setCooldown(1000)
     * @returns {typeof CommandBuilder}
     */
    static $C(cooldown) {
        const command = Application.commands.get(this.$);

        if (!this.$ || !command) throw new Error('Empty Command');

        command.cooldown = cooldown;
        Application.commands.set(this.$, command);

        return this;
    };

    /**
     * @description OwnersOnly()
     * @returns {typeof CommandBuilder}
     */
    static $O(somename = true) {
        const command = Application.commands.get(this.$);

        if (!this.$ || !command) throw new Error('Empty Command');

        command.owners = true;
        Application.commands.set(this.$, command);

        return this;
    };

    /**
     * @description setDescription(text: string)
     * @param {string} description 
     */
    static $D(description) {
        const command = Application.commands.get(this.$);

        if (!this.$ || !command) throw new Error('Empty Command');

        command.description = description;
        Application.commands.set(this.$, command);

        return this;
    };

    /**
     * 
     * @param {string} label 
     * @returns {typeof CommandBuilder}
     */
    static $L(label) {
        const command = Application.commands.get(this.$);

        if (!this.$ || !command) throw new Error('Empty Command');

        command.label = label;
        Application.commands.set(this.$, command);

        return this;
    };

    /**
     * 
     * @param {SlashCommandBuilder} builder 
     */
    static $S(builder) {
        const command = Application.commands.get(this.$);

        if (!this.$ || !command) throw new Error('Empty Command');

        builder.setName(this.$);
        !builder.description && builder.setDescription(command.description);

        command.builder = builder;
        Application.commands.set(this.$, command);

        return this;
    };

    /**
     * 
     * @param {ContextMenuCommandBuilder} builder 
     */
    static $CM(builder) {
        const command = Application.commands.get(this.$);

        if (!this.$ || !command) throw new Error('Empty Command');

        builder.setName(this.$);

        if (!builder.type) {
            command.MessageContextMenuCommandBuilder = new ContextMenuCommandBuilder().setName(this.$).setType(ApplicationCommandType.Message);
            command.UserContextMenuCommandBuilder = new ContextMenuCommandBuilder().setName(this.$).setType(ApplicationCommandType.User);

        } else if (builder.type == ApplicationCommandType.Message) {
            command.MessageContextMenuCommandBuilder = builder;

        } else if (builder.type == ApplicationCommandType.User) {
            command.UserContextMenuCommandBuilder = builder;
            
        };

        Application.commands.set(this.$, command);

        return this;
    };

    /**
     * 
     * @param {(interaction: ChatInputCommandInteraction)} call 
     * @returns 
     */
    static $CME(call) {
        const command = Application.commands.get(this.$);

        if (!this.$ || !command) throw new Error('Empty Command');

        command.ContextMenuExecution = call;
        Application.commands.set(this.$, command);

        return this;
    };

    static $B(call) {
        const command = Application.commands.get(this.$);

        if (!this.$ || !command) throw new Error('Empty Command');

        command.ButtonInteractionExecution = call;
        Application.commands.set(this.$, command);

        return this;
    };
};

module.exports = CommandBuilder;
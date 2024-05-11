const { Message, MessagePayload, ContextMenuCommandInteraction } = require('discord.js');
const { setTimeout: wait } = require('node:timers/promises');

/**
 * @param {string | MessagePayload | import('discord.js').MessageReplyOptions} options 
 * @returns {Promise<Message<true>>}
 */
ContextMenuCommandInteraction.prototype.replyNoMention = function (options) {
    return new Promise((resolve, reject) => {

        options = (typeof options === 'string') ? { content: options } : options;

        options.allowedMentions = {
            repliedUser: false
        }

        this.reply(options).then(resolve).catch(reject);
    });
};

ContextMenuCommandInteraction.prototype.sendTimedMessage = async function (options, timeout, reply) {
    options = (typeof options === 'string') ? { content: options } : options;

    options.allowedMentions = {
        repliedUser: false
    };

    const message = await this.reply(options);
    await wait(timeout);

    await message.delete().catch(console.error);
    return message;
};

ContextMenuCommandInteraction.prototype.args = function (index) {
    return this.options.data[index];
};
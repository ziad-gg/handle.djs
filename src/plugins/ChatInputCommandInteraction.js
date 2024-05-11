const { Message, MessagePayload, ChatInputCommandInteraction } = require('discord.js');
const { setTimeout: wait } = require('node:timers/promises');

/**
 * @param {string | MessagePayload | import('discord.js').MessageReplyOptions} options 
 * @returns {Promise<Message<true>>}
 */
ChatInputCommandInteraction.prototype.replyNoMention = function (options) {
    return new Promise((resolve, reject) => {

        options = (typeof options === 'string') ? { content: options } : options;

        options.allowedMentions = {
            repliedUser: false
        }

        this.reply(options).then(resolve).catch(reject);
    });
};

ChatInputCommandInteraction.prototype.sendTimedMessage = async function (options, timeout, repliedUser = false) {
    options = (typeof options === 'string') ? { content: options } : options;

    options.allowedMentions = {
        repliedUser: repliedUser
    };

    const message = await this.reply(options);
    await wait(timeout);
    
    await message.delete().catch(console.error);
    return message;
};

ChatInputCommandInteraction.prototype.args = function (index) {
    return this.options.data[index];
};
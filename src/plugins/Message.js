const { Message, MessagePayload, User } = require('discord.js');
const { setTimeout: wait } = require('node:timers/promises');

/**
 * 
 * @param {string | MessagePayload | import('discord.js').MessageReplyOptions} options 
 * @returns {Promise<Message<true>>}
 */
Message.prototype.replyNoMention = function (options) {
    return new Promise((resolve, reject) => {

        options = (typeof options === 'string') ? { content: options } : options;

        options.allowedMentions = {
            repliedUser: false
        }

        this.reply(options).then(resolve).catch(reject);
    });
};

/**
 * 
 * @param {string | MessagePayload | import('discord.js').MessageReplyOptions} options 
 * @param {number} timeout
 * @returns {Promise<Message<true>>}
 */
Message.prototype.sendTimedMessage = async function (options, timeout) {
    options = (typeof options === 'string') ? { content: options } : options;

    options.allowedMentions = {
        repliedUser: false
    };

    const message = await this.reply(options);
    await wait(timeout);
    message.deletable && await message.delete().catch(e => null);
    return message;
};

/**
 * 
 * @param {number} index 
 * @returns {string | undefined}
 */
Message.prototype.args = function (index) {
    const args = this.content.slice(this.client.Application.prefix.length).trim(' ').split(/ +/g);
    args.shift();

    return args[index];
};

/**
 * 
 * @param {string | number} id 
 * @param {'cache' | 'fetch' | 'guild' | 'guild-fetch'} source 
 * @returns {Promise<User>}
 */
Message.prototype.getUser = async function (id, source = 'fetch') {
    if (source == 'cache') return this.client.users.cache.get(id);
    if (source == 'guild') return this.guild.members.cache.get(id);
    if (source == 'guild-fetch') return this.guild.members.fetch(id).catch(e => null);
    if (source == 'fetch') return this.client.users.fetch(id).catch(e => null);
}
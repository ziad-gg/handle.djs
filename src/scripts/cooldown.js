const ValidationBuilder = require('../structure/ValidationBuilder.js');
const Application = require('../structure/Application.js');
const ms = require('ms');

ValidationBuilder.$E((controller, next, end) => {
    if (controller.message) {
        const message = controller.message;
        const command = message.command;
        const application = message.Application;

        if (isNaN(command.cooldown)) return next();
        if (!application.cooldown.message) return next();

        const cooldowns = Application.cooldowns;
        const key = `${message.author.id}-${command.name}`;

        const cooldownConfig = message.Application.cooldown;
        const data = cooldowns.get(key);

        if (data && Date.now() > data.time) {
            cooldowns.delete(key);
            cooldowns.set(key, { replied: false, time: Date.now() + command.cooldown });
            return next();
        } else if (data && Date.now() < data.time && !data.replied) {
            const time = ms(data.time - Date.now(), { long: cooldownConfig.long ?? false });

            const replacements = {
                UserId: message.author.id,
                UserMention: `<@${message.author.id}>`,
                UserTag: message.author.tag,
                Username: message.author.username,
                counter: time.includes('ms') ? '0m' : time,
            };

            const content = cooldownConfig.message.replace(/\{(.*?)\}/g, (match, group) => {
                return replacements[group];
            });

            if (cooldownConfig.Mdelete) message.sendTimedMessage(content, cooldownConfig.Mdelete);
            else if (cooldownConfig.reply) message.replyNoMention(content);
            else message.channel.send(content);

            if (cooldownConfig.once) cooldowns.set(key, { replied: true, time: data.time });

            end();
        } else {
            cooldowns.set(key, { replied: false, time: Date.now() + command.cooldown });
            next();
        };
    };

}).$O(Number.MIN_SAFE_INTEGER).$end();
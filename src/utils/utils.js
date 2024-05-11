
module.exports = {
    toDiscordId(text = '') {
        return text.replace(/[<@#&!>]/g, '');
    },
    isPositiveInteger(text = '') {
        if (isNaN(text) || parseInt(text) != text || parseInt(text) <= 0) return false;
        return true;
    },
    Intents: 3276799
}



module.exports = {
    toDiscordId(text = '') {
        return text.replace(/[<@#&!>]/g, '');
    },
    isPositiveInteger(text = '') {
        if (isNaN(text) || parseInt(text) != text || parseInt(text) <= 0) return false;
        return true;
    },
    formatTime(ms = 1000) {
        const seconds = ms / 1000;
        const minutes = ms / (1000 * 60);
        const hours = ms / (1000 * 60 * 60);

        return {
            milliseconds: ms,
            seconds: seconds,
            minutes: minutes,
            hours: hours
        };
    },

    Intents: 3276799
}


const Application = require('./Application.js');

class EventBuilder {
    /** @private */
    static $ = '';

    static $N() {
        this.$ = arguments['1'] ? arguments[1] : arguments[0][0];

        Application.events.set(this.$, () => { });

        return this;
    };

    /**
     * 
     * @param {() => any} call 
     */
    static $E(call) {
        let event = Application.events.get(this.$);

        if (!this.$ || !event) throw new Error('Empty Event');

        event = event ?? {};
        event.call = call;

        Application.events.set(this.$, event);

        return this;
    };

    static $O(somename = true) {
        let event = Application.events.get(this.$);

        if (!this.$ || !event) throw new Error('Empty Event');

        event = event ?? {};
        event.once = true;

        Application.events.set(this.$, event);

        return this;
    };
};

module.exports = EventBuilder;
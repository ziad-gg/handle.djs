const Application = require('./Application.js');

class EventBuilder {
    /** @private */
    static $ = '';
    /** @private */
    static data = {};

    static $N() {
        this.$ = arguments['1'] ? arguments[1] : arguments[0][0];

        EventBuilder.data.name = this.$;

        return this;
    };

    /**
     * 
     * @param {() => any} call 
     */
    static $E(call) {
        if (!this.$) throw new Error('Empty Event');

        EventBuilder.data.call = call;

        return this;
    };

    static $O(somename = true) {
        if (!this.$) throw new Error('Empty Event');
        
        EventBuilder.data.once = true;

        return this;
    };

    static $L() {
        Application.events.add(EventBuilder.data);
        EventBuilder.data = {};
        return this;
    };
};

module.exports = EventBuilder;
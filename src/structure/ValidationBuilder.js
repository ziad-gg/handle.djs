const Application = require('./Application.js');

class ValidationBuilder {
    /** @private @type {{ order: number, type: ["message", "interaction"], validation: () => any }} */
    static $ = { type: [] };

    static get $M() {
        !ValidationBuilder.$.type.includes('message') && ValidationBuilder.$.type.push('message')
        return this;
    };

    static get $I() {
        !ValidationBuilder.$.type.includes('interaction') && ValidationBuilder.$.type.push('interaction')
        return this;
    };

    static get interaction() {
        return ValidationBuilder.$I
    };

    static get message() {
        return ValidationBuilder.$M
    };

    static get end() {

        if (!ValidationBuilder.$.order) throw new Error('Invalid Order');
        if (Array.from(Application.validations.values()).find(e => e.order == ValidationBuilder.$.order)) throw new Error('Duplicated Order');

        if (!ValidationBuilder.$.validation) throw new Error('Cannot End Validation Builder Without CallBack');
        if (ValidationBuilder.$.type.length == 0) ValidationBuilder.$.type = ['message', 'interaction'];
       
        ValidationBuilder.$.order = ValidationBuilder.$.order;
        Application.validations.add(ValidationBuilder.$);

        delete ValidationBuilder.$;
        ValidationBuilder.$ = { type: [] };
    };

    static $end() {
        ValidationBuilder.end;
    };

    /**
     * @param {(controller, end) => any} call 
     */
    static $E(call) {
        ValidationBuilder.$.validation = call;
        return this;
    };

    /**
     * 
     * @param {number} order 
     */
    static $O(order) {
        if (isNaN(order)) throw new Error('Invalid Order');
        ValidationBuilder.$.order = order;
        return this;
    };
};

module.exports = ValidationBuilder;
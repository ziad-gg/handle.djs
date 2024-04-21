const { Message, ChatInputCommandInteraction } = require('discord.js');
const { ValidationBuilder } = require('../../src');

ValidationBuilder.$E(Validation).$O(1).$end();
/**
 * 
 * @param {{ message: Message, interaction: ChatInputCommandInteraction}} controller 
 * @param {() => {}} next 
 * @param {() => {}} end 
 */
function Validation(controller, next, end) {
    console.log(`${controller.interaction ? 'interaction' : 'message'} 1`);
    console.log('First Validation: Passed');
    next();
}
const { Message, ChatInputCommandInteraction } = require('discord.js');
const { ValidationBuilder } = require('../../src');

ValidationBuilder.$E(Validation).$O(2).$end();

/**
 * 
 * @param {{ message: Message, interaction: ChatInputCommandInteraction}} controller 
 * @param {() => {}} next 
 * @param {() => {}} end 
 */
function Validation(controller, next, end) {
    console.log(`${controller.interaction ? 'interaction' : 'message'} 2`);
    console.log('Secound Validation: Failed');
    end();
}
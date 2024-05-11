<center>
<img src="https://nodei.co/npm/handler.dts.png?downloads=true&stars=true" alt="v">

# Introduction

handler.dts is a powerful tool designed to simplify the management of Discord.js bot files. It aims to enhance productivity by reducing the amount of time and code required to handle various aspects of a Discord bot, while also improving performance.

# Installing
 ```bash
  $ npm init
  $ npm i discord.js
  $ npm i handler.dts
 ```

<h6>You can Handle Files with this package</h6>

# SetUp
```js
const { Client } = require('discord.js');
const { Application } = require('handler.dts');

const client = new Client({
    intents: 3276799
});

new Application(client, {
    commands: __dirname.concat('/commands'),
    events: __dirname.concat('/events'),
});

client.Application.build();

client.login('Token');
```


### commands Setup

```js
const { CommandBuilder } = require('handler.dts');

CommandBuilder.$N`ping`.$M((message) => {
    message.reply(`pong 🏓`);
});

CommandBuilder.$N`uptime`.$M((message) => {
    message.reply(`uptime: 1d 🌄`); 
});
```

### events Setup

```js
const { Client, Events } = require('discord.js');
const { EventBuilder } = require('handler.dts');

EventBuilder.$N`${Events.ClientReady}`.$E(Execution).$O().$L();

/**
 * @param {Client} client 
 */
function Execution(client) {
    console.log(client.user.tag);
};
```

### validation Setup

```js
const { Message, ChatInputCommandInteraction } = require('discord.js');
const { ValidationBuilder } = require('handler.dts');

ValidationBuilder.$E(Validation).$O(1).$end();

/**
 * @param {{ message: Message, interaction: ChatInputCommandInteraction}} controller 
 * @param {() => {}} next 
 * @param {() => {}} end 
 */
function Validation(controller, next, end) {
    console.log(`First Validation Type: ${controller.interaction ? 'interaction' : 'message'}`);

    next(); // pass to next validation
    console.log('First Validation: Passed');

    // end(); //  stop command 
}
```
</center>
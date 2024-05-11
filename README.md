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

<h6>You can Handel Files with this package</h6>

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
```
</center>
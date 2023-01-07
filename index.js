const { Client, Intents, Collection } = require('discord.js'); // import
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_PRESENCES] }); // tạo client discord
require('./server');
const config = require('./config.json');
client.config = config;
require('dotenv').config();

client.prefix = config.PREFIX;

client.commands = new Collection();
client.slashCommands = new Collection();

module.exports = client;

require('./handlers/baseHandler');

client.login(process.env.TOKEN);
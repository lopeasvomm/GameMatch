const { Client, Intents } = require("discord.js");
const config = require("./config.json");
const commands = require("./commands");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

const guildID = "";

client.on("ready", async () => {
  console.log(`Logged in as ${client.user.tag}!`);

  const manager =
    client.guilds.cache.get(guildID)?.commands || client.application.commands;

  const result = await manager.set(
    commands.map((r) => (r.toJSON ? r.toJSON() : r))
  );
  console.log(`Registered ${result.size} commands!`);
  client.destroy();
});
client.login(config.token);

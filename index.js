const { Client, Intents, Collection } = require("discord.js");
const fs = require("fs");
const path = require("path");
const config = require("./config.json");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS],
});

client.commands = new Collection();
client.components = new Collection();

loadCommands(path.join(__dirname, "commands"));
loadEvents(path.join(__dirname, "events"));
loadComponents(path.join(__dirname, "components"));

client.login(config.token);

function loadCommands(directory) {
  const files = fs.readdirSync(directory);
  for (const name of files) {
    if (!name.endsWith(".js")) continue;
    const command = require(`${directory}/${name}`);
    console.log(`Loaded command: ${command.name}`);
    client.commands.set(command.name, command);
  }
}

function loadComponents(directory) {
  const files = fs.readdirSync(directory);
  for (const name of files) {
    if (!name.endsWith(".js")) continue;
    const component = require(`${directory}/${name}`);
    console.log(`Loaded component: ${component.name}`);
    client.components.set(component.name, component);
  }
}

function loadEvents(directory) {
  const files = fs.readdirSync(directory);
  for (const name of files) {
    const file = fs.statSync(`${directory}/${name}`);
    if (file.isDirectory()) {
      loadEvents(`${directory}/${name}`);
    } else {
      if (!name.endsWith(".js")) continue;
      const event = require(`${directory}/${name}`);
      console.log(`Loaded event: ${event.name}`);
      client.on(event.name, (...args) => event.run(client, ...args));
    }
  }
}

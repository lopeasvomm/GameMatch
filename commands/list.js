const { Collection } = require("discord.js");
const { statements } = require("../db");
const formatGames = require("../util/formatGames");

const commands = new Collection()
  .set("platforms", require("./list/platforms"))
  .set("os", require("./list/os"))
  .set("games", require("./list/games"))
  .set("subgames", require("./list/subgames"));
module.exports = {
  name: "list",
  /**
   * @param {import("discord.js").Client} client
   * @param {import("discord.js").CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const command = interaction.options.getSubcommand(true);
    if (commands.has(command)) {
      commands.get(command).run(client, interaction);
    } else interaction.followUp({ content: "Unknown subcommand!" });
  },
};

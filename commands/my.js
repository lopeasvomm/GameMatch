const { Collection } = require("discord.js");

const groups = new Collection()
  .set("platforms", require("./my/platforms/"))
  .set("os", require("./my/os/"))
  .set("games", require("./my/games/"))
  .set("subgames", require("./my/subgames/"))
  .set("steam", require("./my/steam/"));

module.exports = {
  name: "my",
  /**
   * @param {import('discord.js').Client} client
   * @param {import('discord.js').CommandInteraction} interaction
   **/
  run: (client, interaction) => {
    const group = interaction.options.getSubcommandGroup(true);
    if (groups.has(group)) {
      groups.get(group).run(client, interaction);
    } else interaction.followUp({ content: "Unknown command group!" });
  },
};
